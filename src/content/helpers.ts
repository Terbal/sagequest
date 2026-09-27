import { CEFR_ORDER, type CEFR } from '../core/types'
import { allMissions, allVerbs } from './index'

/**
 * What's unlocked given the learner is on `currentDay`. A mission's content
 * counts as unlocked once the learner has reached that day (so Day 3's
 * content is visible from Day 3 onward, not only after completing it) —
 * this keeps Train's Library in sync with the Journey map's own unlock logic.
 */
export function getUnlockedGrammarIds(currentDay: number): Set<string> {
  const ids = new Set<string>()
  for (const m of allMissions) {
    if (m.day <= currentDay) m.grammarFocus.forEach((g) => ids.add(g))
  }
  return ids
}

export function getUnlockedVocabIds(currentDay: number): Set<string> {
  const ids = new Set<string>()
  for (const m of allMissions) {
    if (m.day <= currentDay) m.vocabularyFocus.forEach((v) => ids.add(v))
  }
  return ids
}

/** Highest CEFR sub-level reached so far, used to gate verbs/idioms that
 * aren't tied to a specific day (they're tagged by CEFR instead). */
export function getUnlockedCefrCeiling(currentDay: number): CEFR {
  let ceiling: CEFR = 'A1.1'
  for (const m of allMissions) {
    if (m.day <= currentDay && CEFR_ORDER.indexOf(m.cefr) > CEFR_ORDER.indexOf(ceiling)) {
      ceiling = m.cefr
    }
  }
  return ceiling
}

export function isCefrUnlocked(cefr: CEFR, currentDay: number): boolean {
  return CEFR_ORDER.indexOf(cefr) <= CEFR_ORDER.indexOf(getUnlockedCefrCeiling(currentDay))
}

export function getUnlockedVerbs(currentDay: number) {
  const ceiling = getUnlockedCefrCeiling(currentDay)
  const ceilingIdx = CEFR_ORDER.indexOf(ceiling)
  return allVerbs.filter((v) => CEFR_ORDER.indexOf(v.cefr) <= ceilingIdx)
}
