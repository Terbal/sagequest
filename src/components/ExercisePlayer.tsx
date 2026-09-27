import { useMemo, useState } from 'react'
import type { Exercise } from '../core/types'
import { checkAnswer, buildCorrectionDisplay } from '../core/engines/correction'
import { getGrammarById } from '../content'
import { useAppStore } from '../lib/store'
import SpeechRecorder from './SpeechRecorder'
import AudioButton from './AudioButton'
import { XP_TABLE } from '../core/engines/xp'
import { addError } from '../lib/db'

interface ExercisePlayerProps {
  exercises: Exercise[]
  onComplete: (summary: { correct: number; total: number; xpEarned: number }) => void
}

type Phase = 'answer' | 'feedback'

export default function ExercisePlayer({ exercises, onComplete }: ExercisePlayerProps) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('answer')
  const [textAnswer, setTextAnswer] = useState('')
  const [lastCheck, setLastCheck] = useState<ReturnType<typeof checkAnswer> | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [attemptStart, setAttemptStart] = useState<number>(() => Date.now())
  const recordConceptAttempt = useAppStore((s) => s.recordConceptAttempt)
  const addXP = useAppStore((s) => s.addXP)

  const ex = exercises[index]
  const isSpeakingLike = ex.type === 'speaking' || ex.type === 'reflex'

  const grammarLabel = useMemo(
    () => ex.grammar.map((g) => getGrammarById(g)?.label ?? g).join(', '),
    [ex]
  )

  async function submit(text: string, responseMs: number | null) {
    const primaryConcept = ex.grammar[0]
    const concept = primaryConcept ? getGrammarById(primaryConcept) : undefined
    const check = checkAnswer(text, ex.expectedPatterns, concept?.commonMistakes ?? [], ex.acceptableAnswers ?? [])
    setLastCheck(check)
    setTextAnswer(text)
    setPhase('feedback')

    if (check.correct) setCorrectCount((c) => c + 1)

    let xp = 0
    if (ex.type === 'speaking') xp = XP_TABLE.speaking
    else if (ex.type === 'reflex') xp = XP_TABLE.reflex
    if (check.correct) xp += XP_TABLE.perfectExercise === xp ? 0 : Math.round(XP_TABLE.perfectExercise / 3)
    if (xp > 0) {
      await addXP(xp, `exercise:${ex.id}`)
      setXpEarned((x) => x + xp)
    }

    for (const g of ex.grammar) {
      await recordConceptAttempt(g, 'grammar', check.correct, responseMs, ex.id)
    }

    if (!check.correct) {
      const correction = buildCorrectionDisplay(text, check, ex.acceptableAnswers?.[0])
      await addError({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        grammarId: primaryConcept,
        pattern: ex.grammar.join(','),
        wrongText: correction.wrong,
        rightText: correction.right,
        timestamp: Date.now(),
        resolved: false,
      })
    }
  }

  function next() {
    if (index + 1 >= exercises.length) {
      onComplete({ correct: correctCount, total: exercises.length, xpEarned })
      return
    }
    setIndex(index + 1)
    setPhase('answer')
    setTextAnswer('')
    setLastCheck(null)
    setAttemptStart(Date.now())
  }

  function retry() {
    setPhase('answer')
    setTextAnswer('')
    setLastCheck(null)
    setAttemptStart(Date.now())
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between text-xs sq-mono mb-4" style={{ color: 'var(--sq-text-faint)' }}>
        <span>{ex.type.toUpperCase()}</span>
        <span>{index + 1} / {exercises.length}</span>
      </div>

      {phase === 'answer' && (
        <div>
          {ex.promptFr && (
            <div className="text-sm mb-2" style={{ color: 'var(--sq-text-faint)' }}>{ex.promptFr}</div>
          )}
          <div className="flex items-start gap-2 mb-2">
            <h2 className="text-xl md:text-2xl font-bold leading-snug">{ex.prompt}</h2>
            {!isSpeakingLike && <AudioButton text={ex.prompt} />}
          </div>
          {ex.hint && <div className="text-xs mb-6" style={{ color: 'var(--sq-text-faint)' }}>Hint: {ex.hint}</div>}
          {!ex.hint && <div className="mb-6" />}

          {isSpeakingLike ? (
            <SpeechRecorder
              timeLimitSeconds={ex.timeLimitSeconds}
              onResult={(text, durationMs) => submit(text, durationMs)}
            />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit(textAnswer, Date.now() - attemptStart)
              }}
            >
              <input
                autoFocus
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Type your answer…"
                className="w-full px-4 py-3 sq-panel text-sm outline-none mb-4"
                style={{ color: 'var(--sq-text)' }}
              />
              <button
                type="submit"
                disabled={!textAnswer.trim()}
                className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)] disabled:opacity-40"
                style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
              >
                CHECK
              </button>
            </form>
          )}
        </div>
      )}

      {phase === 'feedback' && lastCheck && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>{grammarLabel}</span>
            <span
              className="text-xs font-bold sq-mono px-2 py-0.5 rounded-[var(--sq-radius-sm)]"
              style={{
                color: lastCheck.correct ? 'var(--sq-success)' : 'var(--sq-error)',
                background: 'var(--sq-bg-inset)',
              }}
            >
              {lastCheck.score}% MATCH
            </span>
          </div>
          {lastCheck.correct ? (
            <div className="sq-panel p-5 mb-5" style={{ borderColor: 'var(--sq-success)' }}>
              <div className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--sq-success)' }}>
                <CheckIcon /> Correct
              </div>
              <div className="text-sm" style={{ color: 'var(--sq-text)' }}>"{textAnswer}"</div>
            </div>
          ) : (
            <div className="sq-panel p-5 mb-5" style={{ borderColor: 'var(--sq-error)' }}>
              {(() => {
                const correction = buildCorrectionDisplay(textAnswer, lastCheck, ex.acceptableAnswers?.[0])
                return (
                  <>
                    <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--sq-error)' }}>
                      <CrossIcon /> {correction.wrong || '(no clear structure detected)'}
                    </div>
                    <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'var(--sq-success)' }}>
                      <CheckIcon /> {correction.right}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--sq-text-muted)' }}>
                      {correction.why}
                    </div>
                  </>
                )
              })()}
            </div>
          )}

          <div className="flex gap-3">
            {!lastCheck.correct && (
              <button
                onClick={retry}
                className="flex-1 py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)] sq-panel"
              >
                TRY AGAIN
              </button>
            )}
            <button
              onClick={next}
              className="flex-1 py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
              style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
            >
              {index + 1 >= exercises.length ? 'FINISH' : 'CONTINUE'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function CheckIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
}
function CrossIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
}
