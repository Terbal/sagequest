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
    id: `day-${String(day).padStart(2, '0')}`, day, week: 3, cefr: 'A2.1', title,
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

export const week3Missions: Mission[] = [
  dayMission(15, 'Was and Were', ['past_simple_be', 'past_time_expressions'], ['v-ago', 'v-last-night', 'v-last-week', 'v-last-year'], 3),
  dayMission(16, 'Regular Verbs: -ed', ['past_simple_regular'], ['v-visit', 'v-trip', 'v-holiday', 'v-party'], 3),
  dayMission(17, 'Irregular Verbs I', ['past_simple_irregular'], ['v-restaurant', 'v-train', 'v-ticket', 'v-friend'], 3),
  dayMission(18, 'Irregular Verbs II', ['past_simple_irregular'], ['v-phone', 'v-message', 'v-email', 'v-story'], 3),
  dayMission(19, "Saying What Didn't Happen", ['past_simple_negatives'], ['v-then', 'v-after', 'v-before', 'v-later'], 3),
  dayMission(20, 'Asking About the Past', ['past_simple_questions'], ['v-friend', 'v-trip', 'v-party', 'v-story'], 3),
]

export const day21BossMission: BossMission = {
  id: 'day-21', day: 21, week: 3, cefr: 'A2.1', title: 'BOSS — What Did You Do Yesterday?',
  isBoss: true,
  bossPrompt: 'Tell me what you did yesterday: where you went, what you did, and what you did not do.',
  evaluatedSkills: ['grammar', 'vocabulary', 'speaking', 'fluency'],
  grammarFocus: ['past_simple_be', 'past_time_expressions', 'past_simple_regular', 'past_simple_irregular', 'past_simple_negatives', 'past_simple_questions'],
  vocabularyFocus: ['v-then', 'v-after', 'v-last-night', 'v-story'],
  weakSpotSlots: 0,
  sections: [
    { kind: 'warmup', label: 'Warm-up', durationMinutes: 2, exerciseIds: [] },
    { kind: 'speaking', label: 'Boss Speaking', durationMinutes: 10, exerciseIds: ['d21-boss1'] },
    { kind: 'correction', label: 'Correction', durationMinutes: 4, exerciseIds: [] },
    { kind: 'review', label: 'Results', durationMinutes: 2, exerciseIds: [] },
  ],
}
