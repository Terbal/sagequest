import type { VerbEntry } from '../../core/types'

export const week2Verbs: VerbEntry[] = [
  {
    id: 'eat', base: 'eat', past: 'ate', pastParticiple: 'eaten', ing: 'eating',
    meaningFr: 'manger', cefr: 'A1.2', irregular: true, frequencyRank: 40,
    collocations: ['eat breakfast', 'eat out', 'eat healthy'],
    phrasalVerbs: [{ form: 'eat out', meaningFr: 'manger au restaurant' }],
    exampleSentences: ['I eat breakfast at seven.', 'We ate at a small restaurant.'],
  },
  {
    id: 'sleep', base: 'sleep', past: 'slept', pastParticiple: 'slept', ing: 'sleeping',
    meaningFr: 'dormir', cefr: 'A1.2', irregular: true, frequencyRank: 90,
    collocations: ['sleep well', 'sleep late'],
    phrasalVerbs: [{ form: 'sleep in', meaningFr: 'faire la grasse matinée' }],
    exampleSentences: ['I sleep seven hours a night.', 'She slept badly last night.'],
  },
  {
    id: 'get', base: 'get', past: 'got', pastParticiple: 'got', ing: 'getting',
    meaningFr: 'obtenir / devenir / arriver', cefr: 'A1.2', irregular: true, frequencyRank: 8,
    collocations: ['get up', 'get home', 'get a job', 'get tired'],
    phrasalVerbs: [{ form: 'get up', meaningFr: 'se lever' }, { form: 'get on', meaningFr: 'monter (dans)' }],
    exampleSentences: ['I get up at six.', 'He got home late.'],
  },
  {
    id: 'come', base: 'come', past: 'came', pastParticiple: 'come', ing: 'coming',
    meaningFr: 'venir', cefr: 'A1.2', irregular: true, frequencyRank: 12,
    collocations: ['come home', 'come back', 'come in'],
    phrasalVerbs: [{ form: 'come back', meaningFr: 'revenir' }],
    exampleSentences: ['She comes to the office by bus.', 'They came late.'],
  },
  {
    id: 'meet', base: 'meet', past: 'met', pastParticiple: 'met', ing: 'meeting',
    meaningFr: 'rencontrer', cefr: 'A1.2', irregular: true, frequencyRank: 60,
    collocations: ['meet a client', 'nice to meet you'],
    phrasalVerbs: [{ form: 'meet up', meaningFr: 'se retrouver' }],
    exampleSentences: ['I meet my team every Monday.', 'We met at a conference.'],
  },
  {
    id: 'leave', base: 'leave', past: 'left', pastParticiple: 'left', ing: 'leaving',
    meaningFr: 'partir / quitter', cefr: 'A1.2', irregular: true, frequencyRank: 55,
    collocations: ['leave home', 'leave work'],
    phrasalVerbs: [{ form: 'leave out', meaningFr: 'omettre' }],
    exampleSentences: ['He leaves home at seven.', 'She left the office early.'],
  },
  {
    id: 'start', base: 'start', past: 'started', pastParticiple: 'started', ing: 'starting',
    meaningFr: 'commencer', cefr: 'A1.2', irregular: false, frequencyRank: 70,
    collocations: ['start work', 'start a meeting'],
    phrasalVerbs: [{ form: 'start over', meaningFr: 'recommencer' }],
    exampleSentences: ['I start work at eight.', 'The meeting started late.'],
  },
  {
    id: 'finish', base: 'finish', past: 'finished', pastParticiple: 'finished', ing: 'finishing',
    meaningFr: 'finir', cefr: 'A1.2', irregular: false, frequencyRank: 110,
    collocations: ['finish work', 'finish a report'],
    phrasalVerbs: [{ form: 'finish off', meaningFr: 'terminer' }],
    exampleSentences: ['He finishes work at five.', 'I finished the report yesterday.'],
  },
  {
    id: 'study', base: 'study', past: 'studied', pastParticiple: 'studied', ing: 'studying',
    meaningFr: 'étudier', cefr: 'A1.2', irregular: false, frequencyRank: 120,
    collocations: ['study English', 'study hard'],
    phrasalVerbs: [],
    exampleSentences: ['I study English every evening.', 'She studied medicine.'],
  },
  {
    id: 'watch', base: 'watch', past: 'watched', pastParticiple: 'watched', ing: 'watching',
    meaningFr: 'regarder', cefr: 'A1.2', irregular: false, frequencyRank: 100,
    collocations: ['watch TV', 'watch a movie'],
    phrasalVerbs: [{ form: 'watch out', meaningFr: 'faire attention' }],
    exampleSentences: ['They watch TV after dinner.', 'We watched a great film.'],
  },
]
