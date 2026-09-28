import type { VerbEntry } from '../types'

const IRREGULAR_THIRD: Record<string, string> = { be: 'is', have: 'has', do: 'does', go: 'goes' }

/** He/she/it form of a verb in the present simple. */
export function thirdPersonForm(base: string): string {
  if (IRREGULAR_THIRD[base]) return IRREGULAR_THIRD[base]
  if (/[^aeiou]y$/.test(base)) return base.slice(0, -1) + 'ies'
  if (/(s|sh|ch|x|z|o)$/.test(base)) return base + 'es'
  return base + 's'
}

/** All accepted answers for the past simple, e.g. "was/were" -> ["was","were"]. */
export function pastAnswers(verb: VerbEntry): string[] {
  return verb.past.split('/').map((p) => p.trim().toLowerCase())
}
