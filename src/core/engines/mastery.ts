import type { ConceptProgress, MasteryStatus, SkillStats } from '../types'

// Weighted mastery score. Automaticity requires accuracy AND speed AND retention
// AND having seen the concept across varied contexts — not just one correct answer.
const WEIGHTS = {
  accuracy: 0.4,
  speed: 0.2,
  retention: 0.25,
  contextVariation: 0.15,
}

export function computeMasteryScore(stats: SkillStats): number {
  const score =
    stats.accuracy * WEIGHTS.accuracy +
    stats.speed * WEIGHTS.speed +
    stats.retention * WEIGHTS.retention +
    stats.contextVariation * WEIGHTS.contextVariation
  return Math.round(Math.min(100, Math.max(0, score)))
}

export function computeStatus(stats: SkillStats, masteryScore: number): MasteryStatus {
  if (stats.attempts === 0) return 'unseen'
  if (stats.attempts < 3) return 'learning'
  if (masteryScore < 45) return 'learning'
  if (masteryScore < 65) return 'developing'
  if (masteryScore < 85) return 'known'
  return 'mastered'
}

/**
 * Update stats after one attempt.
 * responseMs: time taken to answer, used to derive a speed score against an expected baseline.
 * contextKey: a string identifying the sentence/scenario context, used to grow contextVariation
 * without needing to store every context — caller passes distinctContextCount instead when known.
 */
export function recordAttempt(
  prev: SkillStats,
  correct: boolean,
  responseMs: number | null,
  expectedMs: number,
  distinctContextCount: number
): SkillStats {
  const attempts = prev.attempts + 1
  const correctCount = prev.correct + (correct ? 1 : 0)

  // Accuracy: exponential moving average so recent performance matters more,
  // but early history isn't discarded.
  const alpha = 0.25
  const accuracySample = correct ? 100 : 0
  const accuracy = prev.attempts === 0
    ? accuracySample
    : prev.accuracy * (1 - alpha) + accuracySample * alpha

  // Speed: only updated on correct answers (an incorrect fast answer isn't "fast", it's wrong).
  let speed = prev.speed
  if (correct && responseMs != null && expectedMs > 0) {
    const ratio = expectedMs / responseMs // >1 means faster than expected
    const speedSample = Math.max(0, Math.min(100, 50 * ratio))
    speed = prev.attempts === 0 ? speedSample : prev.speed * (1 - alpha) + speedSample * alpha
  }

  // Retention: rewards being correct again after time has passed (handled by caller
  // deciding "correct" on a review item); here we nudge it toward accuracy over time.
  const retention = prev.attempts === 0
    ? accuracySample
    : prev.retention * 0.7 + accuracySample * 0.3

  const contextVariation = Math.max(prev.contextVariation, Math.min(100, distinctContextCount * 12))

  return {
    accuracy: Math.round(accuracy),
    speed: Math.round(speed),
    retention: Math.round(retention),
    contextVariation: Math.round(contextVariation),
    masteryScore: 0, // filled by caller after computing
    attempts,
    correct: correctCount,
  }
}

export function emptyStats(): SkillStats {
  return { accuracy: 0, speed: 0, retention: 0, contextVariation: 0, masteryScore: 0, attempts: 0, correct: 0 }
}

export function emptyProgress(conceptId: string, kind: ConceptProgress['kind']): ConceptProgress {
  return {
    conceptId,
    kind,
    stats: emptyStats(),
    status: 'unseen',
    lastSeen: 0,
    nextReviewDue: 0,
    intervalStep: 0,
    history: [],
  }
}
