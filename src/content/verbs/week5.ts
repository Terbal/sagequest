import type { VerbEntry } from '../../core/types'
function v(base: string, past: string, pp: string, ing: string, fr: string, rank: number, irregular: boolean, collocations: string[], examples: string[]) {
  return { id: base, base, past, pastParticiple: pp, ing, meaningFr: fr, cefr: 'A2.3' as const, irregular, frequencyRank: rank, collocations, phrasalVerbs: [], exampleSentences: examples }
}
export const week5Verbs: VerbEntry[] = [
  v('plan', 'planned', 'planned', 'planning', 'planifier / prévoir', 175, false, ['plan a trip', 'plan ahead'], ['I plan my week on Sunday.', 'We planned the trip together.']),
  v('expect', 'expected', 'expected', 'expecting', "s'attendre à", 220, false, ['expect a call', 'expect the worst'], ['I expect good news.', 'I expected more.']),
  v('hope', 'hoped', 'hoped', 'hoping', 'espérer', 195, false, ['hope for the best'], ['I hope so.', 'I hoped for good weather.']),
  v('promise', 'promised', 'promised', 'promising', 'promettre', 230, false, ['promise to help'], ['I promise to call.', 'She promised to come.']),
  v('offer', 'offered', 'offered', 'offering', 'proposer / offrir', 240, false, ['offer help', 'offer a discount'], ['I offer my help.', 'He offered me a job.']),
  v('suggest', 'suggested', 'suggested', 'suggesting', 'suggérer', 250, false, ['suggest an idea'], ['I suggest a break.', 'She suggested a new plan.']),
  v('quit', 'quit', 'quit', 'quitting', 'quitter / arrêter', 260, true, ['quit a job', 'quit smoking'], ['I quit my job.', 'He quit smoking last year.']),
]
