import type { CEFR, SkillId } from '../core/types'

export interface PlacementQuestion {
  id: string
  skill: SkillId
  level: CEFR
  prompt: string
  type: 'choice' | 'fill' | 'speaking'
  options?: string[]
  correctIndex?: number
  expectedPatterns?: string[]
}

// Deliberately short — this is an estimate, not a certification exam.
export const placementQuestions: PlacementQuestion[] = [
  {
    id: 'p1', skill: 'grammar', level: 'A1.1', type: 'choice',
    prompt: 'I ___ a teacher.', options: ['am', 'is', 'are'], correctIndex: 0,
  },
  {
    id: 'p2', skill: 'grammar', level: 'A1.2', type: 'choice',
    prompt: 'She ___ to work every day.', options: ['go', 'goes', 'going'], correctIndex: 1,
  },
  {
    id: 'p3', skill: 'grammar', level: 'A2.1', type: 'choice',
    prompt: 'Yesterday, I ___ to the office.', options: ['go', 'went', 'goes'], correctIndex: 1,
  },
  {
    id: 'p4', skill: 'grammar', level: 'A2.2', type: 'choice',
    prompt: 'I ___ when he called.', options: ['work', 'was working', 'worked'], correctIndex: 1,
  },
  {
    id: 'p5', skill: 'grammar', level: 'B1.1', type: 'choice',
    prompt: '___ you ever been to London?', options: ['Did', 'Have', 'Do'], correctIndex: 1,
  },
  {
    id: 'p6', skill: 'grammar', level: 'B1.3', type: 'choice',
    prompt: 'If I ___ more time, I would travel.', options: ['have', 'had', 'will have'], correctIndex: 1,
  },
  {
    id: 'p7', skill: 'grammar', level: 'B2.1', type: 'choice',
    prompt: 'If I had known, I ___ come.', options: ['would', 'would have', 'will'], correctIndex: 1,
  },
  {
    id: 'p8', skill: 'vocabulary', level: 'A1.1', type: 'choice',
    prompt: 'Choose the correct word: I have two ___.', options: ['brother', 'brothers', 'brothering'], correctIndex: 1,
  },
  {
    id: 'p9', skill: 'vocabulary', level: 'B2.2', type: 'choice',
    prompt: 'Which word fits: "We need to ___ the server before deploying."',
    options: ['configure', 'confuse', 'confirm'], correctIndex: 0,
  },
  {
    id: 'p10', skill: 'speaking', level: 'A1.1', type: 'speaking',
    prompt: 'Say one sentence to introduce yourself.', expectedPatterns: ['word:am'],
  },
]

export function scorePlacement(answers: Record<string, number | string>): {
  estimatedCefr: CEFR
  skillBreakdown: Record<SkillId, number>
} {
  const cefrLadder: CEFR[] = [
    'A1.1', 'A1.2', 'A1.3', 'A2.1', 'A2.2', 'A2.3', 'B1.1', 'B1.2', 'B1.3',
    'B2.1', 'B2.2', 'B2.3', 'C1.1', 'C1.2', 'C1.3', 'C2.1', 'C2.2', 'C2.3',
  ]

  let highestCorrectIdx = 0
  let grammarCorrect = 0
  let grammarTotal = 0
  let vocabCorrect = 0
  let vocabTotal = 0
  let spokeAtLeastOnce = false

  for (const q of placementQuestions) {
    const answer = answers[q.id]
    const levelIdx = cefrLadder.indexOf(q.level)

    if (q.type === 'choice') {
      const isCorrect = answer === q.correctIndex
      if (q.skill === 'grammar') { grammarTotal++; if (isCorrect) grammarCorrect++ }
      if (q.skill === 'vocabulary') { vocabTotal++; if (isCorrect) vocabCorrect++ }
      if (isCorrect && levelIdx > highestCorrectIdx) highestCorrectIdx = levelIdx
    } else if (q.type === 'speaking') {
      if (typeof answer === 'string' && answer.trim().length > 0) spokeAtLeastOnce = true
    }
  }

  const estimatedCefr = cefrLadder[Math.min(highestCorrectIdx, cefrLadder.length - 1)]

  const grammarPct = grammarTotal > 0 ? Math.round((grammarCorrect / grammarTotal) * 100) : 40
  const vocabPct = vocabTotal > 0 ? Math.round((vocabCorrect / vocabTotal) * 100) : 40

  const skillBreakdown: Record<SkillId, number> = {
    grammar: grammarPct,
    vocabulary: vocabPct,
    speaking: spokeAtLeastOnce ? 45 : 20,
    fluency: Math.max(10, Math.round((grammarPct + vocabPct) / 2) - 15),
    pronunciation: spokeAtLeastOnce ? 40 : 15,
    reflex: Math.max(10, grammarPct - 10),
    professional: 10,
  }

  return { estimatedCefr, skillBreakdown }
}
