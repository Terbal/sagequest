import { week1Grammar } from './grammar/week1'
import { week2Grammar } from './grammar/week2'
import { week3Grammar } from './grammar/week3'
import { coreVerbs } from './verbs/core'
import { week1Vocab } from './vocabulary/week1'
import { week2Vocab } from './vocabulary/week2'
import { week3Vocab } from './vocabulary/week3'
import { week3Verbs } from './verbs/week3'
import { week2Verbs } from './verbs/week2'
import { week1Exercises, day7Boss } from './missions/exercisesWeek1'
import { week2Exercises, day14Boss } from './missions/exercisesWeek2'
import { week3Exercises, day21Boss } from './missions/exercisesWeek3'
import { week1Missions, day7BossMission } from './missions/week1'
import { week2Missions, day14BossMission } from './missions/week2'
import { week3Missions, day21BossMission } from './missions/week3'
import { week1UsageNotes, week2UsageNotes, week3UsageNotes } from './usageNotes'
import { week1Idioms, week2Idioms, week3Idioms } from './idioms/week1'
import type { Exercise, GrammarConcept, Mission, VerbEntry, VocabItem, UsageNote, IdiomScenario } from '../core/types'

export const allGrammar: GrammarConcept[] = [...week1Grammar, ...week2Grammar, ...week3Grammar]
export const allVerbs: VerbEntry[] = [...coreVerbs, ...week2Verbs, ...week3Verbs]
export const allVocab: VocabItem[] = [...week1Vocab, ...week2Vocab, ...week3Vocab]
export const allExercises: Exercise[] = [...week1Exercises, ...day7Boss, ...week2Exercises, ...day14Boss, ...week3Exercises, ...day21Boss]
export const allMissions: Mission[] = [...week1Missions, day7BossMission, ...week2Missions, day14BossMission, ...week3Missions, day21BossMission]
export const allUsageNotes: UsageNote[] = [...week1UsageNotes, ...week2UsageNotes, ...week3UsageNotes]
export const allIdioms: IdiomScenario[] = [...week1Idioms, ...week2Idioms, ...week3Idioms]

export function getMissionByDay(day: number): Mission | undefined {
  return allMissions.find((m) => m.day === day)
}

export function getExerciseById(id: string): Exercise | undefined {
  return allExercises.find((e) => e.id === id)
}

export function getGrammarById(id: string): GrammarConcept | undefined {
  return allGrammar.find((g) => g.id === id)
}

export function getVerbById(id: string): VerbEntry | undefined {
  return allVerbs.find((v) => v.id === id)
}

export function getVocabById(id: string): VocabItem | undefined {
  return allVocab.find((v) => v.id === id)
}

export const TOTAL_CONTENT_DAYS = 21 // grows as content expands, engine already supports 1-90.
