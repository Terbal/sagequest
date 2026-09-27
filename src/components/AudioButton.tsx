import { useState } from 'react'
import { useAppStore } from '../lib/store'

interface AudioButtonProps {
  text: string
  size?: 'sm' | 'md'
}

// Uses the browser/device's built-in text-to-speech (SpeechSynthesis), not a
// pre-recorded audio file and not an external API — so voice quality varies
// by device/browser, and it needs the device's English voices to be available.
// Playback rate is the user's own setting (Profile > Appearance > Speech rate).
export default function AudioButton({ text, size = 'sm' }: AudioButtonProps) {
  const rate = useAppStore((s) => s.profile?.speechRate ?? 1)
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window)
  const [playing, setPlaying] = useState(false)

  if (!supported) return null

  function play() {
    try {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = rate
      utterance.onstart = () => setPlaying(true)
      utterance.onend = () => setPlaying(false)
      utterance.onerror = () => setPlaying(false)
      window.speechSynthesis.speak(utterance)
    } catch {
      setPlaying(false)
    }
  }

  const dim = size === 'sm' ? 28 : 36

  return (
    <button
      onClick={play}
      aria-label={`Play pronunciation: ${text}`}
      className="inline-flex items-center justify-center rounded-full shrink-0 transition-opacity"
      style={{
        width: dim,
        height: dim,
        background: playing ? 'var(--sq-accent)' : 'var(--sq-bg-inset)',
        color: playing ? 'var(--sq-accent-text)' : 'var(--sq-text-muted)',
      }}
    >
      <svg width={size === 'sm' ? 14 : 16} height={size === 'sm' ? 14 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      </svg>
    </button>
  )
}
