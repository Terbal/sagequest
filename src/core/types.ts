// SAGEQUEST — core data models.
// Content is data (see /src/content). This file defines the shapes that content and engines share.

export type CEFR =
  | 'A1.1' | 'A1.2' | 'A1.3'
  | 'A2.1' | 'A2.2' | 'A2.3'
  | 'B1.1' | 'B1.2' | 'B1.3'
  | 'B2.1' | 'B2.2' | 'B2.3'
  | 'C1.1' | 'C1.2' | 'C1.3'
  | 'C2.1' | 'C2.2' | 'C2.3'

export const CEFR_ORDER: CEFR[] = [
  'A1.1', 'A1.2', 'A1.3',
  'A2.1', 'A2.2', 'A2.3',
  'B1.1', 'B1.2', 'B1.3',
  'B2.1', 'B2.2', 'B2.3',
  'C1.1', 'C1.2', 'C1.3',
  'C2.1', 'C2.2', 'C2.3',
]

export type Rank =
  | 'ROOKIE' | 'EXPLORER' | 'SPEAKER' | 'OPERATOR'
  | 'PROFESSIONAL' | 'EXPERT' | 'MASTER'

export const RANK_ORDER: Rank[] = [
  'ROOKIE', 'EXPLORER', 'SPEAKER', 'OPERATOR', 'PROFESSIONAL', 'EXPERT', 'MASTER',
]

// XP thresholds to reach each rank (cumulative).
export const RANK_XP_THRESHOLDS: Record<Rank, number> = {
  ROOKIE: 0,
  EXPLORER: 800,
  SPEAKER: 2200,
  OPERATOR: 4500,
  PROFESSIONAL: 8000,
  EXPERT: 13000,
  MASTER: 20000,
}

export type SkillId =
  | 'grammar' | 'vocabulary' | 'speaking' | 'fluency'
  | 'pronunciation' | 'reflex' | 'professional'

export const SKILL_LABELS: Record<SkillId, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  speaking: 'Speaking',
  fluency: 'Fluency',
  pronunciation: 'Pronunciation',
  reflex: 'Reflex',
  professional: 'Professional English',
}

// ---------- Grammar Engine ----------

export interface GrammarConcept {
  id: string // e.g. "past_simple"
  label: string
  cefr: CEFR
  explanation: string
  examples: string[]
  commonMistakes: { wrong: string; right: string; why: string }[]
  triggerWords: string[]
  prerequisites: string[] // ids of GrammarConcept
  masteryThreshold: number // 0-100
}

// ---------- Verb Engine ----------

export interface VerbEntry {
  id: string // base form, e.g. "take"
  base: string
  past: string
  pastParticiple: string
  ing: string
  meaningFr: string
  cefr: CEFR
  irregular: boolean
  frequencyRank: number // 1 = most frequent
  collocations: string[]
  phrasalVerbs: { form: string; meaningFr: string }[]
  exampleSentences: string[]
  commonMistakes?: string[]
}

// ---------- Vocabulary ----------

export interface VocabItem {
  id: string
  word: string
  meaningFr: string
  cefr: CEFR
  category: string // e.g. "family", "work", "cloud-it"
  exampleSentence: string
  audioSlow?: string
  audioNormal?: string
}

// ---------- Idioms / phrasal verbs in context ----------

export interface IdiomScenario {
  id: string
  situation: string
  expression: string
  meaningFr: string
  cefr: CEFR
  prompt: string // "Use X in your own sentence."
}

// ---------- Usage notes ("subtleties") ----------
// "When you have X, you use Y, not Z" — small notes on the kind of nuance a
// learner won't infer from a grammar rule alone.

export interface UsageNote {
  id: string
  title: string
  cefr: CEFR
  relatedGrammar: string[] // GrammarConcept ids
  explanation: string
  examplesGood: string[]
  examplesBad: string[]
}

// ---------- Exercises ----------

export type ExerciseType =
  | 'transformation'   // I go -> yesterday -> I went
  | 'reflex'           // French prompt -> English structure, timed
  | 'speaking'         // open prompt, recorded
  | 'fill_blank'
  | 'reorder'

export interface Exercise {
  id: string
  type: ExerciseType
  grammar: string[] // GrammarConcept ids
  vocabulary?: string[] // VocabItem ids
  cefr: CEFR
  prompt: string
  promptFr?: string
  expectedPatterns: string[] // regex-ish / keyword patterns the engine checks for
  acceptableAnswers?: string[]
  timeLimitSeconds?: number
  hint?: string
}

// ---------- Missions ----------

export interface Mission {
  id: string // e.g. "day-03"
  day: number // 1-90
  week: number // 1-12, or 13 for finalization block
  cefr: CEFR
  title: string
  isBoss: boolean
  grammarFocus: string[]
  vocabularyFocus: string[]
  weakSpotSlots: number // how many exercise slots are reserved for adaptive weak-spot review
  sections: MissionSection[]
}

export interface MissionSection {
  kind: 'warmup' | 'grammar_reflex' | 'vocabulary' | 'speaking' | 'correction' | 'review'
  label: string
  durationMinutes: number
  exerciseIds: string[]
}

export interface BossMission extends Mission {
  isBoss: true
  bossPrompt: string
  evaluatedSkills: SkillId[]
}

// ---------- User progress ----------

export interface SkillStats {
  accuracy: number       // 0-100
  speed: number          // 0-100 (normalized response speed)
  retention: number      // 0-100
  contextVariation: number // 0-100, distinct contexts seen
  masteryScore: number   // derived
  attempts: number
  correct: number
}

export type MasteryStatus = 'unseen' | 'learning' | 'developing' | 'known' | 'mastered'

export interface ConceptProgress {
  conceptId: string
  kind: 'grammar' | 'verb' | 'vocab'
  stats: SkillStats
  status: MasteryStatus
  lastSeen: number // epoch ms
  nextReviewDue: number // epoch ms, spaced repetition
  intervalStep: number // index into SR schedule
  history: { timestamp: number; correct: boolean; exerciseId: string }[]
}

export interface ErrorRecord {
  id: string
  grammarId?: string
  verbId?: string
  pattern: string
  wrongText: string
  rightText: string
  timestamp: number
  resolved: boolean
}

export interface UserProfile {
  id: string
  name: string
  createdAt: number
  currentDay: number // 1-90
  estimatedCefr: CEFR
  placementCompleted: boolean
  xp: number
  rank: Rank
  streak: number
  lastActiveDate: string // YYYY-MM-DD
  skills: Record<SkillId, number> // 0-100 summary per skill, derived
  unlockedTracks: string[] // 'career' | 'cloud-it' | 'client' | 'conference' | 'travel'
  theme: 'dark' | 'light' | 'system'
  speechRate: number // 0.5 | 0.75 | 1 — playback rate for pronunciation audio (Web Speech synthesis)
}

export interface DailyMissionState {
  day: number
  missionId: string
  completedSections: string[]
  xpEarned: number
  startedAt: number
  completedAt: number | null
}

export interface XPLogEntry {
  id: string
  timestamp: number
  amount: number
  reason: string
}

// ---------- Placement test ----------

export interface PlacementResult {
  estimatedCefr: CEFR
  skillBreakdown: Record<SkillId, number>
  completedAt: number
}
