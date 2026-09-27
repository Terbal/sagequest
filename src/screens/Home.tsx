import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../lib/store'
import { getMissionByDay, getGrammarById, TOTAL_CONTENT_DAYS } from '../content'

export default function Home() {
  const profile = useAppStore((s) => s.profile)
  const progressMap = useAppStore((s) => s.progressMap)
  const navigate = useNavigate()
  if (!profile) return null

  const mission = getMissionByDay(profile.currentDay)
  const totalMinutes = mission?.sections.reduce((sum, s) => sum + s.durationMinutes, 0) ?? 20

  const weakSpots = Object.values(progressMap)
    .filter((p) => p.kind === 'grammar' && (p.status === 'learning' || p.status === 'developing'))
    .sort((a, b) => a.stats.masteryScore - b.stats.masteryScore)
    .slice(0, 3)
    .map((p) => getGrammarById(p.conceptId)?.label ?? p.conceptId)

  const contentReady = profile.currentDay <= TOTAL_CONTENT_DAYS

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-3xl mx-auto">
      <div className="text-xs sq-mono mb-1" style={{ color: 'var(--sq-text-faint)' }}>
        DAY {String(profile.currentDay).padStart(2, '0')} / 90
      </div>
      <div className="text-sm font-medium mb-8" style={{ color: 'var(--sq-accent)' }}>
        {profile.estimatedCefr} — {mission?.title ?? 'More content coming soon'}
      </div>

      {contentReady && mission ? (
        <div className="sq-panel p-6 mb-6">
          <div className="text-xs font-semibold mb-2" style={{ color: 'var(--sq-text-faint)' }}>
            {mission.isBoss ? "TODAY'S MISSION — BOSS" : "TODAY'S MISSION"}
          </div>
          <h1 className="text-2xl font-bold mb-4 leading-snug">
            {(mission as any).bossPrompt ?? mission.sections.find((s) => s.kind === 'speaking')?.label ?? mission.title}
          </h1>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--sq-text-muted)' }}>
            <ClockIcon /> {totalMinutes} MIN
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {mission.grammarFocus.map((g) => (
              <span key={g} className="text-xs px-2.5 py-1 rounded-[var(--sq-radius-sm)]" style={{ background: 'var(--sq-bg-inset)', color: 'var(--sq-text-muted)' }}>
                {getGrammarById(g)?.label ?? g}
              </span>
            ))}
          </div>

          <button
            onClick={() => navigate(`/mission/${profile.currentDay}`)}
            className="w-full md:w-auto px-8 py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
            style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
          >
            {mission.isBoss ? 'START BOSS' : 'START MISSION'}
          </button>
        </div>
      ) : (
        <div className="sq-panel p-6 mb-6">
          <p className="text-sm" style={{ color: 'var(--sq-text-muted)' }}>
            You've completed all available content in this build (Days 1–{TOTAL_CONTENT_DAYS}). Days 8–90
            will unlock as new content ships — your engine, XP, and progress carry forward.
          </p>
        </div>
      )}

      {weakSpots.length > 0 && (
        <div className="sq-panel p-5 mb-6">
          <div className="text-xs font-semibold mb-3" style={{ color: 'var(--sq-text-faint)' }}>WEAK SPOTS</div>
          <div className="space-y-2">
            {weakSpots.map((w) => (
              <div key={w} className="flex items-center gap-2 text-sm" style={{ color: 'var(--sq-text)' }}>
                <span style={{ color: 'var(--sq-warning)' }}>!</span> {w}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--sq-text-muted)' }}>
        <FireIcon /> {profile.streak} day streak
      </div>
    </div>
  )
}

function ClockIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
}
function FireIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c1 1 2 2.5 2 4.5A5.5 5.5 0 0 1 6 15.5C6 10 12 8 12 2z" /></svg>
}
