import { useEffect, useState } from 'react'
import { useAppStore } from '../lib/store'

interface AudioButtonProps {
  text: string
  size?: 'sm' | 'md'
}

// Uses the browser/device's built-in text-to-speech (SpeechSynthesis), not a
// pre-recorded audio file and not an external API — so voice quality varies
// by device/browser, and it needs the device's English voices to be available.
// Playback rate is the user's own setting (Profile > Appearance > Speech rate).
//
// Setting utterance.lang alone is NOT enough on many devices: if the system
// locale is French, some browsers ignore the requested lang and fall back to
// the default (French) voice, reading English words with French phonetics
// ("name" -> "neim"). We must explicitly pick an English voice from the
// device's voice list. That list can load asynchronously, so we listen for
// 'voiceschanged' rather than assuming getVoices() is populated immediately.
let cachedVoices: SpeechSynthesisVoice[] = []
let voicesReady = false

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (voicesReady) return Promise.resolve(cachedVoices)
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      cachedVoices = voices
      voicesReady = true
      resolve(voices)
      return
    }
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices()
      voicesReady = true
      resolve(cachedVoices)
    }
    // Safety timeout: some browsers never fire onvoiceschanged.
    setTimeout(() => {
      if (!voicesReady) {
        cachedVoices = window.speechSynthesis.getVoices()
        voicesReady = true
        resolve(cachedVoices)
      }
    }, 1000)
  })
}

function pickEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null
  const usVoice = voices.find((v) => v.lang === 'en-US')
  if (usVoice) return usVoice
  const anyEnglish = voices.find((v) => v.lang?.toLowerCase().startsWith('en'))
  return anyEnglish ?? null
}

export default function AudioButton({ text, size = 'sm' }: AudioButtonProps) {
  const rate = useAppStore((s) => s.profile?.speechRate ?? 1)
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window)
  const [playing, setPlaying] = useState(false)
  const [noEnglishVoice, setNoEnglishVoice] = useState(false)

  useEffect(() => {
    if (!supported) return
    loadVoices()
  }, [supported])

  if (!supported) return null

  async function play() {
    try {
      window.speechSynthesis.cancel()
      const voices = await loadVoices()
      const englishVoice = pickEnglishVoice(voices)
      setNoEnglishVoice(!englishVoice)

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      if (englishVoice) utterance.voice = englishVoice
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
      title={noEnglishVoice ? 'No English voice found on this device — playing with the default voice.' : undefined}
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
