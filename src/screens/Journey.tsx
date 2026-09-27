import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../lib/store'
import { allMissions, TOTAL_CONTENT_DAYS } from '../content'

const WEEK_TITLES: Record<number, string> = {
  1: 'Survival English', 2: 'Daily Life', 3: 'The Past', 4: 'Events & Stories',
  5: 'Future', 6: 'Experience', 7: 'Connecting Ideas', 8: 'Conditionals',
  9: 'Real Conversation', 10: 'Professional English', 11: 'Networking & Clients', 12: 'Fluency',
}

export default function Journey() {
  const profile = useAppStore((s) => s.profile)
  const navigate = useNavigate()
  if (!profile) return null

  const days = Array.from({ length: 90 }, (_, i) => i + 1)

  function statusFor(day: number): 'locked' | 'available' | 'completed' | 'boss' | 'boss-locked' {
    const mission = allMissions.find((m) => m.day === day)
    const isBoss = mission?.isBoss ?? day % 7 === 0
    if (day < profile!.currentDay) return isBoss ? 'boss' : 'completed'
    if (day === profile!.currentDay) return isBoss ? 'boss' : 'available'
    return isBoss ? 'boss-locked' : 'locked'
  }

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Journey</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--sq-text-muted)' }}>90 days, 12 weeks, one campaign.</p>

      <div className="relative pl-6">
        <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'var(--sq-border)' }} />
        {days.map((day) => {
          const week = Math.min(12, Math.ceil(day / 7)) || 1
          const isWeekStart = day % 7 === 1
          const status = statusFor(day)
          const hasContent = day <= TOTAL_CONTENT_DAYS
          const mission = allMissions.find((m) => m.day === day)

          return (
            <div key={day}>
              {isWeekStart && day <= 90 && (
                <div className="text-xs font-semibold sq-mono mt-6 mb-3 first:mt-0" style={{ color: 'var(--sq-text-faint)' }}>
                  WEEK {week} — {(WEEK_TITLES[week] ?? 'Finalization').toUpperCase()}
                </div>
              )}
              <button
                disabled={status === 'locked' || status === 'boss-locked' || !hasContent}
                onClick={() => navigate(`/mission/${day}`)}
                className="relative flex items-center gap-3 w-full text-left py-2 group disabled:cursor-not-allowed"
              >
                <span
                  className="absolute -left-6 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: status === 'boss' || status === 'boss-locked' ? 'var(--sq-accent)' : 'var(--sq-border-strong)',
                    background: status === 'completed' || status === 'boss'
                      ? (status === 'boss' ? 'var(--sq-accent)' : 'var(--sq-success)')
                      : 'var(--sq-bg)',
                  }}
                />
                <div
                  className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-[var(--sq-radius-sm)] text-sm"
                  style={{
                    background: status === 'available' ? 'var(--sq-bg-inset)' : 'transparent',
                    color: status === 'locked' || status === 'boss-locked' || !hasContent ? 'var(--sq-text-faint)' : 'var(--sq-text)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    {(status === 'boss' || status === 'boss-locked') && <span style={{ color: 'var(--sq-accent)' }}>★</span>}
                    Day {day} {mission ? `— ${mission.title}` : ''}
                  </span>
                  {!hasContent && <span className="text-[10px] sq-mono">SOON</span>}
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
