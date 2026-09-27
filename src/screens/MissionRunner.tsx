import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMissionByDay, getExerciseById, getVocabById, getGrammarById } from '../content'
import ExercisePlayer from '../components/ExercisePlayer'
import AudioButton from '../components/AudioButton'
import { useAppStore } from '../lib/store'
import { loadErrors, loadDueProgress } from '../lib/db'
import type { ErrorRecord, ConceptProgress, Exercise } from '../core/types'
import { XP_TABLE, streakBonus } from '../core/engines/xp'
import { allExercises } from '../content'

export default function MissionRunner() {
  const { day } = useParams()
  const navigate = useNavigate()
  const dayNum = Number(day)
  const mission = getMissionByDay(dayNum)
  const profile = useAppStore((s) => s.profile)
  const advanceDay = useAppStore((s) => s.advanceDay)
  const addXP = useAppStore((s) => s.addXP)
  const touchDailyStreak = useAppStore((s) => s.touchDailyStreak)

  const [sectionIndex, setSectionIndex] = useState(0)
  const [sessionXP, setSessionXP] = useState(0)
  const [sessionErrors, setSessionErrors] = useState<ErrorRecord[]>([])
  const [dueConcepts, setDueConcepts] = useState<ConceptProgress[]>([])
  const [finished, setFinished] = useState(false)
  const [sessionStart] = useState(() => Date.now())

  useEffect(() => {
    loadDueProgress().then(setDueConcepts)
  }, [])

  const reviewExercises = useMemo(() => {
    const picked: Exercise[] = []
    for (const c of dueConcepts) {
      if (picked.length >= 3) break
      const match = allExercises.find((e) => e.grammar.includes(c.conceptId) && e.type === 'reflex')
      if (match) picked.push(match)
    }
    return picked
  }, [dueConcepts])

  if (!mission || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--sq-bg)' }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--sq-text-muted)' }}>This mission isn't available yet.</p>
          <button onClick={() => navigate('/home')} className="text-sm underline" style={{ color: 'var(--sq-accent)' }}>
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const section = mission.sections[sectionIndex]
  const isLastSection = sectionIndex === mission.sections.length - 1

  function resolveExercises(ids: string[]): Exercise[] {
    return ids.map((id) => getExerciseById(id)).filter((e): e is Exercise => !!e)
  }

  async function completeSectionAndAdvance(xpFromSection = 0) {
    setSessionXP((x) => x + xpFromSection)
    if (isLastSection) {
      await finishMission()
    } else {
      setSectionIndex(sectionIndex + 1)
    }
  }

  async function finishMission() {
    const m = mission!
    const p = profile!
    await touchDailyStreak()
    const errors = await loadErrors()
    setSessionErrors(errors.filter((e) => e.timestamp >= sessionStart))

    const bonus = streakBonus(p.streak + 1)
    await addXP(m.isBoss ? XP_TABLE.boss : XP_TABLE.dailyMission, m.isBoss ? 'boss' : 'daily-mission')
    if (bonus > 0) await addXP(bonus, 'streak-bonus')
    if (dayNum === p.currentDay) await advanceDay()
    setFinished(true)
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
        <div className="w-full max-w-md text-center">
          <div className="text-xs sq-mono mb-3" style={{ color: 'var(--sq-accent)' }}>
            {mission.isBoss ? 'BOSS DEFEATED' : 'MISSION COMPLETE'}
          </div>
          <h1 className="text-3xl font-bold mb-6">Day {dayNum} done.</h1>
          <div className="sq-panel p-5 mb-6 text-left">
            <Row label="XP earned" value={`+${sessionXP + (mission.isBoss ? XP_TABLE.boss : XP_TABLE.dailyMission)}`} />
            <Row label="Streak" value={`${profile.streak + 1} days`} />
            {sessionErrors.length > 0 && (
              <Row label="Recurring focus" value={`${sessionErrors.length} pattern${sessionErrors.length > 1 ? 's' : ''} to review`} />
            )}
          </div>
          <button
            onClick={() => navigate('/home')}
            className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
            style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-8" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
      <div className="max-w-lg w-full mx-auto flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate('/home')} className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>
            ← Exit
          </button>
          <span className="text-xs sq-mono" style={{ color: 'var(--sq-text-faint)' }}>
            {section.label.toUpperCase()} · {sectionIndex + 1}/{mission.sections.length}
          </span>
        </div>
        <div className="h-1 w-full rounded-full mb-8" style={{ background: 'var(--sq-border)' }}>
          <div
            className="h-1 rounded-full transition-all"
            style={{ width: `${((sectionIndex + 1) / mission.sections.length) * 100}%`, background: 'var(--sq-accent)' }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {(section.kind === 'warmup' || section.kind === 'grammar_reflex' || section.kind === 'speaking') && (
            resolveExercises(section.exerciseIds).length > 0 ? (
              <ExercisePlayer
                key={section.kind}
                exercises={resolveExercises(section.exerciseIds)}
                onComplete={(summary) => completeSectionAndAdvance(summary.xpEarned)}
              />
            ) : (
              <EmptySection onContinue={() => completeSectionAndAdvance(0)} label={section.label} />
            )
          )}

          {section.kind === 'vocabulary' && (
            <VocabularySection
              vocabIds={mission.vocabularyFocus}
              onContinue={() => completeSectionAndAdvance(0)}
            />
          )}

          {section.kind === 'correction' && (
            <CorrectionSection
              onContinue={() => completeSectionAndAdvance(0)}
            />
          )}

          {section.kind === 'review' && (
            reviewExercises.length > 0 ? (
              <ExercisePlayer
                key="review"
                exercises={reviewExercises}
                onComplete={(summary) => completeSectionAndAdvance(summary.xpEarned)}
              />
            ) : (
              <EmptySection onContinue={() => completeSectionAndAdvance(0)} label="Review" note="Nothing due for review today." />
            )
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1.5">
      <span style={{ color: 'var(--sq-text-muted)' }}>{label}</span>
      <span className="font-semibold sq-mono" style={{ color: 'var(--sq-accent)' }}>{value}</span>
    </div>
  )
}

function EmptySection({ onContinue, label, note }: { onContinue: () => void; label: string; note?: string }) {
  return (
    <div className="text-center">
      <p className="text-sm mb-6" style={{ color: 'var(--sq-text-muted)' }}>
        {note ?? `${label} — nothing scheduled for this step yet.`}
      </p>
      <button
        onClick={onContinue}
        className="px-8 py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
        style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
      >
        CONTINUE
      </button>
    </div>
  )
}

function VocabularySection({ vocabIds, onContinue }: { vocabIds: string[]; onContinue: () => void }) {
  const items = vocabIds.map((id) => getVocabById(id)).filter((v): v is NonNullable<typeof v> => !!v)
  return (
    <div>
      <div className="text-xs sq-mono mb-4" style={{ color: 'var(--sq-text-faint)' }}>VOCABULARY</div>
      <div className="space-y-3 mb-6">
        {items.map((v) => (
          <div key={v.id} className="sq-panel p-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{v.word}</span>
                <AudioButton text={v.word} />
              </div>
              <span className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>{v.meaningFr}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm italic" style={{ color: 'var(--sq-text-muted)' }}>{v.exampleSentence}</div>
              <AudioButton text={v.exampleSentence} />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onContinue}
        className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
        style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
      >
        CONTINUE
      </button>
    </div>
  )
}

function CorrectionSection({ onContinue }: { onContinue: () => void }) {
  const [errors, setErrors] = useState<ErrorRecord[]>([])
  useEffect(() => {
    loadErrors().then((all) => setErrors(all.slice(-3)))
  }, [])
  return (
    <div>
      <div className="text-xs sq-mono mb-4" style={{ color: 'var(--sq-text-faint)' }}>KEY CORRECTIONS</div>
      {errors.length === 0 ? (
        <p className="text-sm mb-6" style={{ color: 'var(--sq-text-muted)' }}>No major errors this session. Clean run.</p>
      ) : (
        <div className="space-y-3 mb-6">
          {errors.map((e) => (
            <div key={e.id} className="sq-panel p-4">
              <div className="text-sm mb-1" style={{ color: 'var(--sq-error)' }}>✕ {e.wrongText}</div>
              <div className="text-sm" style={{ color: 'var(--sq-success)' }}>✓ {e.rightText}</div>
              {e.grammarId && (
                <div className="text-xs mt-1" style={{ color: 'var(--sq-text-faint)' }}>
                  {getGrammarById(e.grammarId)?.label ?? e.grammarId}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={onContinue}
        className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
        style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
      >
        CONTINUE
      </button>
    </div>
  )
}
