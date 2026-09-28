import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../lib/store'
import { XP_TABLE } from '../core/engines/xp'
import { getUnlockedVerbs, getUnlockedGrammarIds } from '../content/helpers'
import { thirdPersonForm, pastAnswers } from '../core/engines/verbForms'

export default function VerbAttack() {
  const navigate = useNavigate()
  const addXP = useAppStore((s) => s.addXP)
  const recordConceptAttempt = useAppStore((s) => s.recordConceptAttempt)
  const currentDay = useAppStore((s) => s.profile?.currentDay ?? 1)

  const [deck] = useState(() => [...getUnlockedVerbs(currentDay)].sort(() => Math.random() - 0.5))
  // Only drill the past simple once the learner has actually been taught it
  // (Week 3). Before that, drill the he/she/it -s form, which Weeks 1-2 cover.
  const [mode] = useState<'past' | 'third'>(() =>
    getUnlockedGrammarIds(currentDay).has('past_simple') ? 'past' : 'third'
  )
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  if (deck.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--sq-text-muted)' }}>No verbs unlocked yet — complete a few more days first.</p>
          <button onClick={() => navigate('/train')} className="text-sm underline" style={{ color: 'var(--sq-accent)' }}>Back to Train</button>
        </div>
      </div>
    )
  }
  const verb = deck[index % deck.length]
  const finished = index >= deck.length

  function check() {
    const normalized = answer.trim().toLowerCase()
    const targets = mode === 'past' ? pastAnswers(verb) : [thirdPersonForm(verb.base)]
    // Exact match only — partial answers like "wen" must not pass for "went".
    const correct = targets.includes(normalized)
    setWasCorrect(correct)
    setRevealed(true)
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    recordConceptAttempt(`verb:${verb.id}`, 'verb', correct, null, `${mode}:${verb.id}`)
    if (correct) addXP(Math.round(XP_TABLE.perfectExercise / 2), `verb-attack:${verb.id}`)
  }

  function next() {
    setAnswer('')
    setRevealed(false)
    setWasCorrect(null)
    setIndex((i) => i + 1)
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
        <div className="w-full max-w-md text-center">
          <div className="text-xs sq-mono mb-3" style={{ color: 'var(--sq-accent)' }}>VERB ATTACK COMPLETE</div>
          <h1 className="text-2xl font-bold mb-6">{score.correct} / {score.total}</h1>
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
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/train')} className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>← Exit</button>
          <span className="text-xs sq-mono" style={{ color: 'var(--sq-text-faint)' }}>{index + 1} / {deck.length}</span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="text-xs sq-mono mb-2" style={{ color: 'var(--sq-text-faint)' }}>
            {mode === 'past' ? 'PAST SIMPLE OF' : 'HE / SHE / IT FORM OF'}
          </div>
          <h1 className="text-4xl font-bold mb-8 sq-mono">{verb.base}</h1>

          {!revealed ? (
            <form onSubmit={(e) => { e.preventDefault(); check() }}>
              <input
                autoFocus
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={mode === 'past' ? 'Type the past form…' : 'Type the he/she form…'}
                className="w-full px-4 py-3 sq-panel text-sm outline-none mb-4 sq-mono"
                style={{ color: 'var(--sq-text)' }}
              />
              <button
                type="submit"
                disabled={!answer.trim()}
                className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)] disabled:opacity-40"
                style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
              >
                CHECK
              </button>
            </form>
          ) : (
            <div>
              <div
                className="sq-panel p-5 mb-5"
                style={{ borderColor: wasCorrect ? 'var(--sq-success)' : 'var(--sq-error)' }}
              >
                <div className="text-sm mb-1" style={{ color: wasCorrect ? 'var(--sq-success)' : 'var(--sq-error)' }}>
                  {wasCorrect ? '✓ Correct' : `✕ You said "${answer}"`}
                </div>
                <div className="text-lg font-bold sq-mono">
                  {mode === 'past'
                    ? `${verb.base} → ${verb.past} → ${verb.pastParticiple}`
                    : `${verb.base} → ${thirdPersonForm(verb.base)}`}
                </div>
                <div className="text-xs mt-2" style={{ color: 'var(--sq-text-faint)' }}>{verb.meaningFr}</div>
                {verb.collocations.length > 0 && (
                  <div className="text-xs mt-3" style={{ color: 'var(--sq-text-muted)' }}>
                    {verb.collocations.slice(0, 3).join(' · ')}
                  </div>
                )}
              </div>
              <button
                onClick={next}
                className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
                style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
              >
                NEXT VERB
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
