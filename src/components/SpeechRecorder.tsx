import { useEffect, useRef, useState } from 'react'
import { mergeSpeechSegments } from '../lib/speech'

interface SpeechRecorderProps {
  onResult: (text: string, durationMs: number) => void
  onSkip?: () => void
  timeLimitSeconds?: number
}

type RecState = 'idle' | 'recording' | 'stopping'

// The audio is never stored: only the transcribed text is kept and scored.
// On Chrome the transcription itself is done by the browser vendor's speech
// service, so it needs an internet connection.
export default function SpeechRecorder({ onResult, onSkip, timeLimitSeconds }: SpeechRecorderProps) {
  const [state, setState] = useState<RecState>('idle')
  const [liveText, setLiveText] = useState('')
  const [manualText, setManualText] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [micProblem, setMicProblem] = useState<string | null>(null)
  const [supported] = useState(() => {
    const w = window as any
    return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition)
  })

  const recognitionRef = useRef<any>(null)
  const startRef = useRef<number>(0)
  const timerRef = useRef<number | undefined>(undefined)
  const stateRef = useRef<RecState>('idle')
  const textRef = useRef('')
  const deliveredRef = useRef(false)
  const onResultRef = useRef(onResult)

  useEffect(() => { onResultRef.current = onResult }, [onResult])

  function setBoth(next: RecState) {
    stateRef.current = next
    setState(next)
  }

  // Deliver the final transcript exactly once.
  function deliver() {
    if (deliveredRef.current) return
    deliveredRef.current = true
    window.clearInterval(timerRef.current)
    setBoth('idle')
    onResultRef.current(textRef.current.trim(), Date.now() - startRef.current)
  }

  useEffect(() => {
    if (!supported) return
    const w = window as any
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition
    const recognition = new Ctor()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event: any) => {
      const segments: string[] = []
      for (let i = 0; i < event.results.length; i++) {
        segments.push(event.results[i][0].transcript)
      }
      const merged = mergeSpeechSegments(segments)
      textRef.current = merged
      setLiveText(merged)
    }
    recognition.onerror = (e: any) => {
      if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed') {
        setMicProblem('Microphone access was denied. Allow it in your browser settings, or type your answer instead.')
      } else if (e?.error === 'network') {
        setMicProblem('Speech recognition needs an internet connection on this browser. Type your answer instead.')
      } else if (e?.error === 'audio-capture') {
        setMicProblem('No microphone was found. Type your answer instead.')
      }
      // 'no-speech' / 'aborted' are normal: onend will deliver whatever we have.
    }
    // The engine can end on its own (silence). Treat that as "done" instead of
    // leaving the UI stuck in "recording".
    recognition.onend = () => {
      if (stateRef.current !== 'idle') deliver()
    }
    recognitionRef.current = recognition
    return () => {
      window.clearInterval(timerRef.current)
      recognition.onend = null
      try { recognition.abort() } catch { /* noop */ }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported])

  function start() {
    textRef.current = ''
    deliveredRef.current = false
    setLiveText('')
    setElapsed(0)
    setMicProblem(null)
    startRef.current = Date.now()
    setBoth('recording')
    timerRef.current = window.setInterval(() => setElapsed(Date.now() - startRef.current), 200)
    try {
      recognitionRef.current?.start()
    } catch { /* already started */ }
  }

  function stop() {
    if (stateRef.current !== 'recording') return
    setBoth('stopping')
    try { recognitionRef.current?.stop() } catch { /* noop */ }
    // onend delivers the final text; this is a safety net if it never fires.
    window.setTimeout(deliver, 1500)
  }

  useEffect(() => {
    if (state === 'recording' && timeLimitSeconds && elapsed >= timeLimitSeconds * 1000) stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, state, timeLimitSeconds])

  if (!supported || micProblem) {
    return (
      <div>
        <div className="text-xs mb-3 px-3 py-2 rounded-[var(--sq-radius-sm)]" style={{ background: 'var(--sq-bg-inset)', color: 'var(--sq-text-muted)' }}>
          {micProblem ?? "Speech recognition isn't available on this browser/device. Type your answer instead."}
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
          onClick={() => onResult(manualText.trim(), 0)}
          disabled={!manualText.trim()}
          className="w-full py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)] disabled:opacity-40"
          style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
        >
          SUBMIT
        </button>
      </div>
    )
  }

  const remaining = Math.max(0, Math.floor((timeLimitSeconds ?? 60) - elapsed / 1000))

  return (
    <div>
      <div
        className="min-h-[72px] px-4 py-3 mb-4 sq-panel text-sm"
        style={{ color: liveText ? 'var(--sq-text)' : 'var(--sq-text-faint)' }}
      >
        {liveText || (state === 'recording' ? 'Listening…' : state === 'stopping' ? 'Processing…' : 'Press record and speak.')}
      </div>

      <div className="flex items-center gap-3">
        {state === 'idle' ? (
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
            disabled={state === 'stopping'}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-[var(--sq-radius-sm)] disabled:opacity-60"
            style={{ background: 'var(--sq-error)', color: '#fff' }}
          >
            <StopIcon /> STOP ({remaining}s)
          </button>
        )}
        {onSkip && state === 'idle' && (
          <button onClick={onSkip} className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--sq-text-faint)' }}>
            Skip
          </button>
        )}
      </div>
      <div className="text-[11px] mt-3" style={{ color: 'var(--sq-text-faint)' }}>
        Scored on what the mic transcribed, not a pronunciation analysis. Audio is not saved.
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
