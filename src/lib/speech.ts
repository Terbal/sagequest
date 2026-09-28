// Pure helper for merging Web Speech API results into one clean transcript.
//
// Some browsers (notably Chrome on Android, with continuous=true) return the
// same utterance several times, or return cumulative segments
// ("Hello", then "Hello world"). Naively concatenating them produces
// "HelloHello" or "Hello Hello world". We join segments with a space and
// collapse duplicates / cumulative repeats.
//
// Trade-off: a deliberate immediate repetition ("no, no") collapses to one
// occurrence. For short learner answers that is far less harmful than
// doubling every sentence.

export function mergeSpeechSegments(segments: string[]): string {
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()
  const out: string[] = []
  for (const raw of segments) {
    const seg = raw.trim()
    if (!seg) continue
    const last = out.length ? out[out.length - 1] : null
    if (last !== null) {
      const a = norm(last)
      const b = norm(seg)
      if (a === b) continue // exact duplicate
      if (b.startsWith(a)) { out[out.length - 1] = seg; continue } // cumulative: keep the longer one
      if (a.startsWith(b)) continue // shorter echo of what we already have
    }
    out.push(seg)
  }
  return out.join(' ')
}
