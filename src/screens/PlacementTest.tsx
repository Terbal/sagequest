import { useState } from 'react'
import { placementQuestions, scorePlacement } from '../content/placementTest'
import { useAppStore } from '../lib/store'
import SpeechRecorder from '../components/SpeechRecorder'

export default function PlacementTest() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | string>>({})
  const [done, setDone] = useState(false)
  const setEstimatedCefr = useAppStore((s) => s.setEstimatedCefr)
  const setSkillSummary = useAppStore((s) => s.setSkillSummary)

  const question = placementQuestions[index]
  const isLast = index === placementQuestions.length - 1
  const progress = ((index + (done ? 1 : 0)) / placementQuestions.length) * 100

  function answer(value: number | string) {
    const next = { ...answers, [question.id]: value }
    setAnswers(next)
    if (isLast) {
      finish(next)
    } else {
      setIndex(index + 1)
    }
  }

  async function finish(finalAnswers: Record<string, number | string>) {
    const result = scorePlacement(finalAnswers)
    await setEstimatedCefr(result.estimatedCefr)
    await setSkillSummary(result.skillBreakdown)
    setDone(true)
  }

  if (done) return null // App.tsx re-renders into main app once placementCompleted flips true

  return (
    <div className="min-h-screen flex flex-col px-6 py-8" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
      <div className="max-w-lg w-full mx-auto flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs sq-mono mb-2" style={{ color: 'var(--sq-text-faint)' }}>
          <span>PLACEMENT TEST</span>
          <span>{index + 1} / {placementQuestions.length}</span>
        </div>
        <div className="h-1 w-full rounded-full mb-10" style={{ background: 'var(--sq-border)' }}>
          <div className="h-1 rounded-full transition-all" style={{ width: `${progress}%`, background: 'var(--sq-accent)' }} />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="text-xs font-semibold mb-3" style={{ color: 'var(--sq-accent)' }}>
            {question.skill.toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold mb-8 leading-snug">{question.prompt}</h2>

          {question.type === 'choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => answer(i)}
                  className="w-full text-left px-4 py-3 sq-panel text-sm font-medium transition-colors hover:border-[var(--sq-accent)]"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {question.type === 'speaking' && (
            <SpeechRecorder
              onResult={(text) => answer(text || 'attempted')}
              onSkip={() => answer('')}
            />
          )}
        </div>
      </div>
    </div>
  )
}
