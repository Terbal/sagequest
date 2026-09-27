import { RANK_ORDER, RANK_XP_THRESHOLDS, type Rank } from '../types'

export const XP_TABLE = {
  dailyMission: 100,
  speaking: 40,
  reflex: 25,
  perfectExercise: 15,
  review: 10,
  boss: 150,
} as const

export function rankForXP(xp: number): Rank {
  let current: Rank = 'ROOKIE'
  for (const rank of RANK_ORDER) {
    if (xp >= RANK_XP_THRESHOLDS[rank]) current = rank
  }
  return current
}

export function xpToNextRank(xp: number): { next: Rank | null; remaining: number; progress: number } {
  const currentIdx = RANK_ORDER.indexOf(rankForXP(xp))
  const next = RANK_ORDER[currentIdx + 1] ?? null
  if (!next) return { next: null, remaining: 0, progress: 1 }
  const floor = RANK_XP_THRESHOLDS[RANK_ORDER[currentIdx]]
  const ceil = RANK_XP_THRESHOLDS[next]
  const progress = (xp - floor) / (ceil - floor)
  return { next, remaining: ceil - xp, progress: Math.max(0, Math.min(1, progress)) }
}

// Streak bonus: small, capped — avoids the streak becoming the whole point of the app.
export function streakBonus(streakDays: number): number {
  if (streakDays <= 1) return 0
  const bonus = Math.min(50, Math.floor(streakDays / 5) * 10)
  return bonus
}
