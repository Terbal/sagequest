import { week1Grammar } from './grammar/week1'
import { coreVerbs } from './verbs/core'
import { week1Vocab } from './vocabulary/week1'
import { week1Exercises, day7Boss } from './missions/exercisesWeek1'
import { week1Missions, day7BossMission } from './missions/week1'
import { week1UsageNotes } from './usageNotes'
import { week1Idioms } from './idioms/week1'
import type { Exercise, GrammarConcept, Mission, VerbEntry, VocabItem, UsageNote, IdiomScenario } from '../core/types'

export const allGrammar: GrammarConcept[] = [...week1Grammar]
export const allVerbs: VerbEntry[] = [...coreVerbs]
export const allVocab: VocabItem[] = [...week1Vocab]
export const allExercises: Exercise[] = [...week1Exercises, ...day7Boss]
export const allMissions: Mission[] = [...week1Missions, day7BossMission]
export const allUsageNotes: UsageNote[] = [...week1UsageNotes]
export const allIdioms: IdiomScenario[] = [...week1Idioms]

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

export const TOTAL_CONTENT_DAYS = 7 // MVP — grows as content expands, engine already supports 1-90.
