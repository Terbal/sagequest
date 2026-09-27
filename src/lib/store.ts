import { create } from 'zustand'
import type { UserProfile, ConceptProgress, SkillId, CEFR } from '../core/types'
import * as db from './db'
import { rankForXP } from '../core/engines/xp'
import { computeMasteryScore, computeStatus, emptyProgress, recordAttempt } from '../core/engines/mastery'
import { nextReviewDate } from '../core/engines/spacedRepetition'

interface AppState {
  profile: UserProfile | null
  progressMap: Record<string, ConceptProgress>
  loading: boolean
  init: () => Promise<void>
  createProfile: (name: string) => Promise<void>
  addXP: (amount: number, reason: string) => Promise<void>
  touchDailyStreak: () => Promise<void>
  advanceDay: () => Promise<void>
  setEstimatedCefr: (cefr: CEFR) => Promise<void>
  setSkillSummary: (skills: Partial<Record<SkillId, number>>) => Promise<void>
  recordConceptAttempt: (
    conceptId: string,
    kind: 'grammar' | 'verb' | 'vocab',
    correct: boolean,
    responseMs: number | null,
    exerciseId: string
  ) => Promise<void>
  setTheme: (theme: UserProfile['theme']) => Promise<void>
  setSpeechRate: (rate: number) => Promise<void>
  resetAll: () => Promise<void>
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

export const useAppStore = create<AppState>((set, get) => ({
  profile: null,
  progressMap: {},
  loading: true,

  init: async () => {
    const profile = await db.loadProfile()
    const progress = await db.loadAllProgress()
    const progressMap: Record<string, ConceptProgress> = {}
    for (const p of progress) progressMap[p.conceptId] = p
    set({ profile: profile ?? null, progressMap, loading: false })
  },

  createProfile: async (name: string) => {
    const profile: UserProfile = {
      id: db.PROFILE_KEY,
      name,
      createdAt: Date.now(),
      currentDay: 1,
      estimatedCefr: 'A1.1',
      placementCompleted: false,
      xp: 0,
      rank: 'ROOKIE',
      streak: 0,
      lastActiveDate: todayStr(),
      skills: { grammar: 0, vocabulary: 0, speaking: 0, fluency: 0, pronunciation: 0, reflex: 0, professional: 0 },
      unlockedTracks: [],
      theme: 'system',
      speechRate: 1,
    }
    await db.saveProfile(profile)
    set({ profile })
  },

  addXP: async (amount, _reason) => {
    const p = get().profile
    if (!p) return
    const xp = p.xp + amount
    const updated: UserProfile = { ...p, xp, rank: rankForXP(xp) }
    await db.saveProfile(updated)
    await db.logXP({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, timestamp: Date.now(), amount, reason: _reason })
    set({ profile: updated })
  },

  touchDailyStreak: async () => {
    const p = get().profile
    if (!p) return
    const today = todayStr()
    if (p.lastActiveDate === today) return
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const streak = p.lastActiveDate === yesterday ? p.streak + 1 : 1
    const updated: UserProfile = { ...p, streak, lastActiveDate: today }
    await db.saveProfile(updated)
    set({ profile: updated })
  },

  advanceDay: async () => {
    const p = get().profile
    if (!p) return
    const updated: UserProfile = { ...p, currentDay: Math.min(90, p.currentDay + 1) }
    await db.saveProfile(updated)
    set({ profile: updated })
  },

  setEstimatedCefr: async (cefr) => {
    const p = get().profile
    if (!p) return
    const updated: UserProfile = { ...p, estimatedCefr: cefr, placementCompleted: true }
    await db.saveProfile(updated)
    set({ profile: updated })
  },

  setSkillSummary: async (skills) => {
    const p = get().profile
    if (!p) return
    const updated: UserProfile = { ...p, skills: { ...p.skills, ...skills } }
    await db.saveProfile(updated)
    set({ profile: updated })
  },

  recordConceptAttempt: async (conceptId, kind, correct, responseMs, exerciseId) => {
    const state = get()
    const existing = state.progressMap[conceptId] ?? emptyProgress(conceptId, kind)
    const distinctContexts = new Set(existing.history.map((h) => h.exerciseId))
    distinctContexts.add(exerciseId)

    const expectedMs = 6000
    const stats = recordAttempt(existing.stats, correct, responseMs, expectedMs, distinctContexts.size)
    stats.masteryScore = computeMasteryScore(stats)
    const status = computeStatus(stats, stats.masteryScore)
    const { nextReviewDue, intervalStep } = nextReviewDate(existing.intervalStep, correct)

    const updated: ConceptProgress = {
      ...existing,
      stats,
      status,
      lastSeen: Date.now(),
      nextReviewDue,
      intervalStep,
      history: [...existing.history, { timestamp: Date.now(), correct, exerciseId }].slice(-30),
    }

    await db.saveProgress(updated)
    set({ progressMap: { ...state.progressMap, [conceptId]: updated } })
  },

  setTheme: async (theme) => {
    const p = get().profile
    if (!p) return
    const updated: UserProfile = { ...p, theme }
    await db.saveProfile(updated)
    set({ profile: updated })
  },

  setSpeechRate: async (speechRate) => {
    const p = get().profile
    if (!p) return
    const updated: UserProfile = { ...p, speechRate }
    await db.saveProfile(updated)
    set({ profile: updated })
  },

  resetAll: async () => {
    await db.wipeAllData()
    set({ profile: null, progressMap: {} })
  },
}))
