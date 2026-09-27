import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../lib/store'
import { allVocab, allUsageNotes, allIdioms } from '../content'
import { getUnlockedVocabIds, getUnlockedGrammarIds, isCefrUnlocked } from '../content/helpers'
import AudioButton from '../components/AudioButton'

interface ModeCard {
  id: string
  title: string
  duration: string
  description: string
  locked?: boolean
  unlockNote?: string
  to?: string
}

const MODES: ModeCard[] = [
  { id: 'reflex-rush', title: '⚡ Reflex Rush', duration: '5 min', description: 'Fast French → English structure drills.', to: '/train/reflex-rush' },
  { id: 'speaking-challenge', title: '🎙️ Speaking Challenge', duration: '10 min', description: 'Open speaking prompts, no scaffolding.', to: '/train/speaking-challenge' },
  { id: 'verb-attack', title: '🧠 Verb Attack', duration: 'Flexible', description: 'Drill irregular verb forms until automatic.', to: '/train/verb-attack' },
  { id: 'career', title: '💼 Career Mode', duration: 'Flexible', description: 'Interviews, workplace English.', locked: true, unlockNote: 'Unlocks Week 10' },
  { id: 'cloud-it', title: '☁️ Cloud & IT', duration: 'Flexible', description: 'Infrastructure, deployment, troubleshooting.', locked: true, unlockNote: 'Unlocks Week 10' },
  { id: 'client', title: '🤝 Client Mode', duration: 'Flexible', description: 'Explaining, proposing, troubleshooting for clients.', locked: true, unlockNote: 'Unlocks Week 11' },
  { id: 'conference', title: '🌍 Conference Mode', duration: 'Flexible', description: 'Networking, introductions, small talk.', locked: true, unlockNote: 'Unlocks Week 11' },
  { id: 'travel', title: '✈️ Travel Mode', duration: 'Flexible', description: 'Airport, hotel, restaurant, directions.', locked: true, unlockNote: 'Unlocks later' },
]

type Tab = 'drills' | 'learn'

export default function Train() {
  const navigate = useNavigate()
  const profile = useAppStore((s) => s.profile)
  const [tab, setTab] = useState<Tab>('drills')

  const currentDay = profile?.currentDay ?? 1

  const unlockedVocab = useMemo(() => {
    const ids = getUnlockedVocabIds(currentDay)
    return allVocab.filter((v) => ids.has(v.id))
  }, [currentDay])

  const unlockedNotes = useMemo(() => {
    const grammarIds = getUnlockedGrammarIds(currentDay)
    return allUsageNotes.filter((n) => n.relatedGrammar.some((g) => grammarIds.has(g)))
  }, [currentDay])

  const unlockedIdioms = useMemo(
    () => allIdioms.filter((i) => isCefrUnlocked(i.cefr, currentDay)),
    [currentDay]
  )

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Train</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--sq-text-muted)' }}>
        Go beyond today's mission. {profile ? `${profile.streak} day streak.` : ''}
      </p>

      <div className="flex gap-1 mb-8 p-1 rounded-[var(--sq-radius-sm)] w-fit" style={{ background: 'var(--sq-bg-inset)' }}>
        {(['drills', 'learn'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-1.5 text-sm font-medium rounded-[var(--sq-radius-sm)] capitalize"
            style={{
              background: tab === t ? 'var(--sq-bg-raised)' : 'transparent',
              color: tab === t ? 'var(--sq-text)' : 'var(--sq-text-faint)',
            }}
          >
            {t === 'drills' ? 'Drills' : 'Learn'}
          </button>
        ))}
      </div>

      {tab === 'drills' && (
        <div className="grid sm:grid-cols-2 gap-3">
          {MODES.map((m) => (
            <button
              key={m.id}
              disabled={m.locked}
              onClick={() => m.to && navigate(m.to)}
              className="text-left sq-panel p-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--sq-accent)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{m.title}</span>
                <span className="text-[11px] sq-mono" style={{ color: 'var(--sq-text-faint)' }}>{m.duration}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--sq-text-muted)' }}>{m.description}</p>
              {m.locked && (
                <div className="text-[11px] mt-3 font-medium" style={{ color: 'var(--sq-warning)' }}>{m.unlockNote}</div>
              )}
            </button>
          ))}
        </div>
      )}

      {tab === 'learn' && (
        <div className="space-y-8">
          <p className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>
            Only content you've reached so far (Day {currentDay}) shows up here — it grows as you progress.
          </p>

          <section>
            <div className="text-xs font-semibold mb-3" style={{ color: 'var(--sq-text-faint)' }}>VOCABULARY</div>
            {unlockedVocab.length === 0 ? (
              <p className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>Nothing unlocked yet.</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {unlockedVocab.map((v) => (
                  <div key={v.id} className="sq-panel p-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{v.word}</span>
                        <AudioButton text={v.word} />
                      </div>
                      <span className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>{v.meaningFr}</span>
                    </div>
                    <div className="text-xs italic" style={{ color: 'var(--sq-text-muted)' }}>{v.exampleSentence}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="text-xs font-semibold mb-3" style={{ color: 'var(--sq-text-faint)' }}>SUBTLETIES — WHEN TO USE WHAT</div>
            {unlockedNotes.length === 0 ? (
              <p className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>Nothing unlocked yet.</p>
            ) : (
              <div className="space-y-3">
                {unlockedNotes.map((n) => (
                  <div key={n.id} className="sq-panel p-4">
                    <div className="font-semibold text-sm mb-1.5">{n.title}</div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--sq-text-muted)' }}>{n.explanation}</p>
                    <div className="flex flex-wrap gap-2">
                      {n.examplesGood.map((ex) => (
                        <span key={ex} className="text-[11px] px-2 py-1 rounded-[var(--sq-radius-sm)]" style={{ background: 'var(--sq-bg-inset)', color: 'var(--sq-success)' }}>
                          ✓ {ex}
                        </span>
                      ))}
                      {n.examplesBad.map((ex) => (
                        <span key={ex} className="text-[11px] px-2 py-1 rounded-[var(--sq-radius-sm)]" style={{ background: 'var(--sq-bg-inset)', color: 'var(--sq-error)' }}>
                          ✕ {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="text-xs font-semibold mb-3" style={{ color: 'var(--sq-text-faint)' }}>EXPRESSIONS IN CONTEXT</div>
            {unlockedIdioms.length === 0 ? (
              <p className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>Nothing unlocked yet.</p>
            ) : (
              <div className="space-y-3">
                {unlockedIdioms.map((idiom) => (
                  <div key={idiom.id} className="sq-panel p-4">
                    <p className="text-xs mb-2" style={{ color: 'var(--sq-text-faint)' }}>{idiom.situation}</p>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">"{idiom.expression}"</span>
                      <AudioButton text={idiom.expression} />
                      <span className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>— {idiom.meaningFr}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
