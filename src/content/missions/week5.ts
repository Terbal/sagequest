import type { BossMission, Mission } from '../../core/types'

function dayMission(day: number, title: string, grammarFocus: string[], vocabularyFocus: string[], weakSpotSlots: number): Mission {
  const d = `d${day}`
  return {
    id: `day-${String(day).padStart(2, '0')}`, day, week: 5, cefr: 'A2.3', title,
    isBoss: false, grammarFocus, vocabularyFocus, weakSpotSlots,
    sections: [
      { kind: 'warmup', label: 'Warm-up', durationMinutes: 2, exerciseIds: [`${d}-ex1`, `${d}-ex2`] },
      { kind: 'grammar_reflex', label: 'Grammar Reflex', durationMinutes: 4, exerciseIds: [`${d}-ex3`, `${d}-reflex1`, `${d}-reflex2`] },
      { kind: 'vocabulary', label: 'Vocabulary', durationMinutes: 3, exerciseIds: [] },
      { kind: 'speaking', label: 'Speaking', durationMinutes: 6, exerciseIds: [`${d}-speak1`] },
      { kind: 'correction', label: 'Correction', durationMinutes: 3, exerciseIds: [] },
      { kind: 'review', label: 'Review', durationMinutes: 2, exerciseIds: [] },
    ],
  }
}

export const week5Missions: Mission[] = [
  dayMission(29, 'Predictions, Decisions & Promises', ['future_will'], ['v-probably', 'v-maybe', 'v-promise', 'v-soon'], 3),
  dayMission(30, 'Plans You Already Made', ['future_going_to'], ['v-plan-n', 'v-goal', 'v-next-month', 'v-next-year'], 3),
  dayMission(31, '"will" vs "going to"', ['will_vs_going_to'], ['v-decision', 'v-definitely', 'v-probably', 'v-plan-n'], 4),
  dayMission(32, "What's Already Arranged", ['present_continuous_future'], ['v-appointment', 'v-next-month', 'v-opportunity', 'v-career'], 3),
  dayMission(33, 'Maybe, Maybe Not', ['modals_possibility'], ['v-maybe', 'v-eventually', 'v-opportunity', 'v-career'], 3),
  dayMission(34, 'Giving Advice', ['modals_advice'], ['v-advice', 'v-decision', 'v-goal', 'v-opportunity'], 3),
]

export const day35BossMission: BossMission = {
  id: 'day-35', day: 35, week: 5, cefr: 'A2.3', title: 'BOSS — Your Plans for Next Year',
  isBoss: true,
  bossPrompt: 'Talk about your plans for next year: what you are going to do, something you might do, and a prediction.',
  evaluatedSkills: ['grammar', 'vocabulary', 'speaking', 'fluency'],
  grammarFocus: ['future_will', 'future_going_to', 'will_vs_going_to', 'present_continuous_future', 'modals_possibility', 'modals_advice'],
  vocabularyFocus: ['v-plan-n', 'v-goal', 'v-next-year', 'v-career'],
  weakSpotSlots: 0,
  sections: [
    { kind: 'warmup', label: 'Warm-up', durationMinutes: 2, exerciseIds: [] },
    { kind: 'speaking', label: 'Boss Speaking', durationMinutes: 10, exerciseIds: ['d35-boss1'] },
    { kind: 'correction', label: 'Correction', durationMinutes: 4, exerciseIds: [] },
    { kind: 'review', label: 'Results', durationMinutes: 2, exerciseIds: [] },
  ],
}
