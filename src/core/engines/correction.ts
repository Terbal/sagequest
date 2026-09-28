// Deterministic, rule-based answer checking. No external AI/LLM calls.
//
// Two scoring strategies, chosen automatically per exercise:
//
// 1. STRUCTURED (exercise has acceptableAnswers): the user's answer is compared
//    word-by-word against each acceptable answer using a Levenshtein distance
//    over tokens, converted to a 0-100% similarity score. This catches word
//    order mistakes ("what is name your" scores low against "what is your name")
//    while still tolerating small imperfections (a missing article, a typo).
//
// 2. PATTERN-BASED (exercise has no acceptableAnswers — open reflex/speaking
//    prompts where many phrasings are valid): score = % of expectedPatterns
//    matched. expectedPatterns are small keyword/regex tokens defined in
//    content, e.g.:
//      "word:went"          -> text must contain the word "went"
//      "regex:\\bI (went|did go)\\b"
//      "not:go"             -> text must NOT contain "go" (catches a known mistake)
//      "contains:if i had"  -> substring match, case-insensitive
//
// Either way the result is a single 0-100 score. An answer is "correct" once
// it clears MATCH_THRESHOLD — not on an exact string match.

export const MATCH_THRESHOLD = 80

export interface CheckResult {
  score: number // 0-100
  correct: boolean
  matchedPatterns: string[]
  failedPatterns: string[]
  detectedMistake: { wrong: string; right: string; why: string } | null
  method: 'structured' | 'pattern'
}

function normalize(text: string): string {
  return text
    .replace(/[\u2018\u2019]/g, "'") // typographic apostrophes (mobile keyboards) -> straight
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
}

function tokenize(text: string): string[] {
  const n = normalize(text)
  return n.length ? n.split(' ') : []
}

// Standard Levenshtein distance, operating on arrays of tokens (words) rather
// than characters, so "your name" vs "name your" is penalized as a real
// structural difference, not two 1-character edits.
function tokenLevenshtein(a: string[], b: string[]): number {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }
  return dp[m][n]
}

function tokenSimilarityPercent(userText: string, targetText: string): number {
  const a = tokenize(userText)
  const b = tokenize(targetText)
  const maxLen = Math.max(a.length, b.length, 1)
  const distance = tokenLevenshtein(a, b)
  return Math.round(Math.max(0, 1 - distance / maxLen) * 100)
}

function evalPattern(pattern: string, normalizedText: string): boolean {
  const [kind, ...rest] = pattern.split(':')
  const value = rest.join(':')
  switch (kind) {
    case 'contains':
      return normalizedText.includes(value.toLowerCase())
    case 'not':
      return !new RegExp(`\\b${escapeRegex(value)}\\b`, 'i').test(normalizedText)
    case 'regex':
      try {
        return new RegExp(value, 'i').test(normalizedText)
      } catch {
        return false
      }
    case 'word':
      return new RegExp(`\\b${escapeRegex(value)}\\b`, 'i').test(normalizedText)
    default:
      return normalizedText.includes(pattern.toLowerCase())
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function checkAnswer(
  userText: string,
  expectedPatterns: string[],
  commonMistakes: { wrong: string; right: string; why: string }[] = [],
  acceptableAnswers: string[] = []
): CheckResult {
  const normalized = normalize(userText)

  // Detect a known common mistake regardless of scoring method, so the
  // correction UI can explain *why*, not just flag a low score.
  let detectedMistake: CheckResult['detectedMistake'] = null
  for (const mistake of commonMistakes) {
    if (normalized.includes(normalize(mistake.wrong))) {
      detectedMistake = mistake
      break
    }
  }

  if (acceptableAnswers.length > 0) {
    // Structured: best similarity against any acceptable answer.
    let best = 0
    for (const answer of acceptableAnswers) {
      best = Math.max(best, tokenSimilarityPercent(userText, answer))
    }
    // Word-level similarity alone is too forgiving on short sentences: one
    // wrong verb form in a 5-word sentence is still 80% similar. So the
    // exercise's expectedPatterns act as REQUIRED grammar keywords: if any is
    // missing, the score is capped just below the pass mark.
    const matchedKeys: string[] = []
    const failedKeys: string[] = []
    for (const p of expectedPatterns) {
      if (evalPattern(p, normalized)) matchedKeys.push(p)
      else failedKeys.push(p)
    }
    const score = failedKeys.length > 0 ? Math.min(best, MATCH_THRESHOLD - 1) : best
    return {
      score,
      correct: score >= MATCH_THRESHOLD,
      matchedPatterns: matchedKeys,
      failedPatterns: failedKeys,
      detectedMistake,
      method: 'structured',
    }
  }

  // Pattern-based: score = % of required patterns present.
  const matched: string[] = []
  const failed: string[] = []
  for (const p of expectedPatterns) {
    if (evalPattern(p, normalized)) matched.push(p)
    else failed.push(p)
  }
  const total = expectedPatterns.length
  const score = total > 0 ? Math.round((matched.length / total) * 100) : (normalized.length > 0 ? 50 : 0)

  return {
    score,
    correct: score >= MATCH_THRESHOLD,
    matchedPatterns: matched,
    failedPatterns: failed,
    detectedMistake,
    method: 'pattern',
  }
}

// Builds a human-readable "before/after" correction pair when we can infer one
// from a detected mistake; otherwise falls back to showing the expected answer.
export function buildCorrectionDisplay(
  userText: string,
  check: CheckResult,
  fallbackCorrect: string | undefined
): { wrong: string; right: string; why: string } {
  if (check.detectedMistake) return check.detectedMistake
  return {
    wrong: userText,
    right: fallbackCorrect ?? userText,
    why: check.method === 'structured'
      ? (check.failedPatterns.length > 0
          ? 'A key word of the target structure is missing or in the wrong form.'
          : 'Word order or word choice differs from the expected structure.')
      : 'Check the target grammar structure for this exercise and try to match it.',
  }
}
