import { useState } from 'react'
import { useAppStore } from '../lib/store'

export default function Onboarding() {
  const [name, setName] = useState('')
  const createProfile = useAppStore((s) => s.createProfile)
  const [starting, setStarting] = useState(false)

  async function handleStart() {
    setStarting(true)
    await createProfile(name.trim() || 'Learner')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
      <div className="w-full max-w-md">
        <div className="text-sm sq-mono tracking-widest" style={{ color: 'var(--sq-accent)' }}>SAGEQUEST</div>
        <div className="h-px w-full my-4" style={{ background: 'var(--sq-border)' }} />

        <div className="text-xs sq-mono mb-2" style={{ color: 'var(--sq-text-faint)' }}>DAY 01 / 90</div>
        <h1 className="text-3xl font-bold leading-tight mb-4">
          Your English journey<br />starts here.
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--sq-text-muted)' }}>
          Before we begin, we need to understand how you use English today. This takes about
          10–15 minutes: a short grammar, vocabulary, and speaking check.
        </p>

        <label className="block text-xs font-medium mb-2" style={{ color: 'var(--sq-text-muted)' }}>
          What should we call you?
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-3 mb-6 sq-panel text-sm outline-none"
          style={{ color: 'var(--sq-text)' }}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />

        <button
          onClick={handleStart}
          disabled={starting}
          className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)] transition-opacity disabled:opacity-60"
          style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
        >
          START
        </button>

        <div className="mt-6 flex gap-4 text-xs" style={{ color: 'var(--sq-text-faint)' }}>
          <span>Speaking assessment</span>
          <span>·</span>
          <span>Grammar assessment</span>
          <span>·</span>
          <span>Vocabulary assessment</span>
        </div>
      </div>
    </div>
  )
}
