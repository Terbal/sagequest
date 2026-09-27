import { useEffect, useRef, useState } from 'react'

interface SpeechRecorderProps {
  onResult: (text: string, durationMs: number) => void
  onSkip?: () => void
  timeLimitSeconds?: number
}

type RecState = 'idle' | 'recording' | 'done' | 'unsupported'

// Minimal ambient typing for the Web Speech API (not in default TS lib dom).
interface SpeechRecognitionResultLike {
  transcript: string
}

export default function SpeechRecorder({ onResult, onSkip, timeLimitSeconds }: SpeechRecorderProps) {
  const [state, setState] = useState<RecState>('idle')
  const [liveText, setLiveText] = useState('')
  const [manualText, setManualText] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const recognitionRef = useRef<any>(null)
  const startRef = useRef<number>(0)
  const timerRef = useRef<number | undefined>(undefined)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
      return
    }
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.onresult = (event: any) => {
      let text = ''
      for (let i = 0; i < event.results.length; i++) {
        text += (event.results[i][0] as SpeechRecognitionResultLike).transcript
      }
      setLiveText(text)
    }
    recognition.onerror = () => {
      // Fail silently into manual fallback — never block the learner.
    }
    recognitionRef.current = recognition
    return () => {
      try { recognition.stop() } catch { /* noop */ }
    }
  }, [])

  function start() {
    setState('recording')
    setLiveText('')
    startRef.current = Date.now()
    timerRef.current = window.setInterval(() => setElapsed(Date.now() - startRef.current), 200)
    try {
      recognitionRef.current?.start()
    } catch { /* already started */ }
  }

  function stop() {
    window.clearInterval(timerRef.current)
    try { recognitionRef.current?.stop() } catch { /* noop */ }
    setState('done')
    const duration = Date.now() - startRef.current
    onResult(liveText || manualText, duration)
  }

  useEffect(() => {
    if (state === 'recording' && timeLimitSeconds && elapsed >= timeLimitSeconds * 1000) {
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, state, timeLimitSeconds])

  if (!supported) {
    return (
      <div>
        <div className="text-xs mb-3 px-3 py-2 rounded-[var(--sq-radius-sm)]" style={{ background: 'var(--sq-bg-inset)', color: 'var(--sq-text-muted)' }}>
          Speech recognition isn't available on this browser/device. Type your answer instead.
        </div>
        <textarea
          value={manualText}
          onChange={(e) => setManualText(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 sq-panel text-sm outline-none mb-3"
          style={{ color: 'var(--sq-text)' }}
          placeholder="Type your answer in English..."
        />
        <button
          onClick={() => onResult(manualText, 0)}
          disabled={!manualText.trim()}
          className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)] disabled:opacity-40"
          style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
        >
          SUBMIT
        </button>
      </div>
    )
  }

  return (
    <div>
      <div
        className="min-h-[72px] px-4 py-3 mb-4 sq-panel text-sm"
        style={{ color: liveText ? 'var(--sq-text)' : 'var(--sq-text-faint)' }}
      >
        {liveText || (state === 'recording' ? 'Listening…' : 'Press record and speak.')}
      </div>

      <div className="flex items-center gap-3">
        {state !== 'recording' ? (
          <button
            onClick={start}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
            style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
          >
            <MicIcon /> RECORD
          </button>
        ) : (
          <button
            onClick={stop}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)]"
            style={{ background: 'var(--sq-error)', color: '#fff' }}
          >
            <StopIcon /> STOP ({Math.max(0, Math.floor((timeLimitSeconds ?? 60) - elapsed / 1000))}s)
          </button>
        )}
        {onSkip && state === 'idle' && (
          <button onClick={onSkip} className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--sq-text-faint)' }}>
            Skip
          </button>
        )}
      </div>
      <div className="text-[11px] mt-3" style={{ color: 'var(--sq-text-faint)' }}>
        Scored on what the mic transcribed, not a pronunciation analysis.
      </div>
    </div>
  )
}

function MicIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" /></svg>
}
function StopIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
}
