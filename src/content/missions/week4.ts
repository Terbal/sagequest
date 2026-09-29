import type { BossMission, Mission } from '../../core/types'

function dayMission(day: number, title: string, grammarFocus: string[], vocabularyFocus: string[], weakSpotSlots: number): Mission {
  const d = `d${day}`
  return {
    id: `day-${String(day).padStart(2, '0')}`, day, week: 4, cefr: 'A2.2', title,
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

export const week4Missions: Mission[] = [
  dayMission(22, 'What Was Happening?', ['past_continuous'], ['v-rain', 'v-storm', 'v-noise', 'v-happen'], 3),
  dayMission(23, 'Asking About the Past in Progress', ['past_continuous_questions'], ['v-at-that-moment', 'v-during', 'v-alarm', 'v-power-cut'], 3),
  dayMission(24, 'When Something Interrupts', ['when_interrupted_action'], ['v-scared', 'v-surprised', 'v-accident', 'v-noise'], 3),
  dayMission(25, 'Two Things at Once', ['while_parallel_actions'], ['v-while', 'v-during', 'v-worried', 'v-rain'], 3),
  dayMission(26, 'Telling It in Order', ['narrative_connectors'], ['v-suddenly', 'v-finally', 'v-at-that-moment', 'v-happen'], 3),
  dayMission(27, 'Setting the Scene', ['storytelling_mixed'], ['v-accident', 'v-storm', 'v-surprised', 'v-scared'], 4),
]

export const day28BossMission: BossMission = {
  id: 'day-28', day: 28, week: 4, cefr: 'A2.2', title: 'BOSS — Tell a Story',
  isBoss: true,
  bossPrompt: 'Tell a story about something that happened: set the scene with what was going on, then say what happened, in order.',
  evaluatedSkills: ['grammar', 'vocabulary', 'speaking', 'fluency'],
  grammarFocus: ['past_continuous', 'past_continuous_questions', 'when_interrupted_action', 'while_parallel_actions', 'narrative_connectors', 'storytelling_mixed'],
  vocabularyFocus: ['v-suddenly', 'v-finally', 'v-happen', 'v-while'],
  weakSpotSlots: 0,
  sections: [
    { kind: 'warmup', label: 'Warm-up', durationMinutes: 2, exerciseIds: [] },
    { kind: 'speaking', label: 'Boss Speaking', durationMinutes: 10, exerciseIds: ['d28-boss1'] },
    { kind: 'correction', label: 'Correction', durationMinutes: 4, exerciseIds: [] },
    { kind: 'review', label: 'Results', durationMinutes: 2, exerciseIds: [] },
  ],
}
