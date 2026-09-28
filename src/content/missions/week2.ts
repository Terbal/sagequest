import type { BossMission, Mission } from '../../core/types'

function dayMission(
  day: number,
  title: string,
  grammarFocus: string[],
  vocabularyFocus: string[],
  weakSpotSlots: number
): Mission {
  const d = `d${day}`
  return {
    id: `day-${String(day).padStart(2, '0')}`, day, week: 2, cefr: 'A1.2', title,
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

export const week2Missions: Mission[] = [
  dayMission(8, 'He, She, It — the -s rule', ['present_simple_third_person'], ['v-wake-up', 'v-breakfast', 'v-start', 'v-finish'], 2),
  dayMission(9, 'How Often?', ['frequency_adverbs'], ['v-always', 'v-often', 'v-sometimes', 'v-never'], 2),
  dayMission(10, 'Asking About Routines', ['present_simple_questions'], ['v-lunch', 'v-dinner', 'v-meeting', 'v-office'], 2),
  dayMission(11, 'At, On, In — Time', ['prepositions_time'], ['v-early', 'v-late', 'v-afternoon', 'v-evening'], 2),
  dayMission(12, 'At, On, In — Place', ['prepositions_place'], ['v-weekend', 'v-study', 'v-watch', 'v-sleep'], 2),
  dayMission(13, 'Doing Things Well', ['adverbs_manner'], ['v-early', 'v-late', 'v-study', 'v-watch'], 3),
]

export const day14BossMission: BossMission = {
  id: 'day-14', day: 14, week: 2, cefr: 'A1.2', title: 'BOSS — Your Typical Day',
  isBoss: true,
  bossPrompt: 'Describe your typical day: when you wake up, what you do, when you eat, and what you always or never do.',
  evaluatedSkills: ['grammar', 'vocabulary', 'speaking', 'fluency'],
  grammarFocus: ['present_simple_basic', 'present_simple_third_person', 'frequency_adverbs', 'present_simple_questions', 'prepositions_time', 'prepositions_place', 'adverbs_manner'],
  vocabularyFocus: ['v-wake-up', 'v-breakfast', 'v-always', 'v-usually'],
  weakSpotSlots: 0,
  sections: [
    { kind: 'warmup', label: 'Warm-up', durationMinutes: 2, exerciseIds: [] },
    { kind: 'speaking', label: 'Boss Speaking', durationMinutes: 10, exerciseIds: ['d14-boss1'] },
    { kind: 'correction', label: 'Correction', durationMinutes: 4, exerciseIds: [] },
    { kind: 'review', label: 'Results', durationMinutes: 2, exerciseIds: [] },
  ],
}
