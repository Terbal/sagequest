import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ExercisePlayer from '../components/ExercisePlayer'
import { allExercises } from '../content'
import { getUnlockedGrammarIds } from '../content/helpers'
import { useAppStore } from '../lib/store'
import type { ExerciseType } from '../core/types'

const DRILL_CONFIG: Record<string, { title: string; type: ExerciseType; limit: number }> = {
  'reflex-rush': { title: 'Reflex Rush', type: 'reflex', limit: 10 },
  'speaking-challenge': { title: 'Speaking Challenge', type: 'speaking', limit: 6 },
}

function buildDeck(mode: string | undefined, currentDay: number) {
  const config = mode ? DRILL_CONFIG[mode] : undefined
  if (!config) return []
  const unlocked = getUnlockedGrammarIds(currentDay)
  return allExercises
    .filter((e) => e.type === config.type && e.grammar.every((g) => unlocked.has(g)))
    .sort(() => Math.random() - 0.5)
    .slice(0, config.limit)
}

export default function TrainDrill() {
  const { mode } = useParams()
  const navigate = useNavigate()
  const currentDay = useAppStore((s) => s.profile?.currentDay ?? 1)
  const [finished, setFinished] = useState<{ correct: number; total: number; xpEarned: number } | null>(null)

  const config = mode ? DRILL_CONFIG[mode] : undefined
  const [exercises] = useState(() => buildDeck(mode, currentDay))

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--sq-bg)' }}>
        <button onClick={() => navigate('/train')} className="text-sm" style={{ color: 'var(--sq-accent)' }}>← Back to Train</button>
      </div>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--sq-text-muted)' }}>Not enough content unlocked yet for this drill.</p>
          <button onClick={() => navigate('/train')} className="text-sm underline" style={{ color: 'var(--sq-accent)' }}>Back to Train</button>
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
        <div className="w-full max-w-md text-center">
          <div className="text-xs sq-mono mb-3" style={{ color: 'var(--sq-accent)' }}>DRILL COMPLETE</div>
          <h1 className="text-2xl font-bold mb-6">{config.title}</h1>
          <div className="sq-panel p-5 mb-6 text-left">
            <div className="flex justify-between text-sm py-1.5">
              <span style={{ color: 'var(--sq-text-muted)' }}>Score</span>
              <span className="font-semibold sq-mono" style={{ color: 'var(--sq-accent)' }}>{finished.correct}/{finished.total}</span>
            </div>
            <div className="flex justify-between text-sm py-1.5">
              <span style={{ color: 'var(--sq-text-muted)' }}>XP earned</span>
              <span className="font-semibold sq-mono" style={{ color: 'var(--sq-accent)' }}>+{finished.xpEarned}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/train')}
            className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
            style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
          >
            DONE
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-8" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
      <div className="max-w-lg w-full mx-auto flex-1 flex flex-col">
        <button onClick={() => navigate('/train')} className="text-xs mb-6 self-start" style={{ color: 'var(--sq-text-faint)' }}>
          ← Exit
        </button>
        <div className="flex-1 flex flex-col justify-center">
          <ExercisePlayer exercises={exercises} onComplete={setFinished} />
        </div>
      </div>
    </div>
  )
}
