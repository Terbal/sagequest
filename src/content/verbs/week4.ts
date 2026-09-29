import type { VerbEntry } from '../../core/types'
function v(base: string, past: string, pp: string, ing: string, fr: string, rank: number, irregular: boolean, collocations: string[], examples: string[], phrasal: { form: string; meaningFr: string }[] = []) {
  return { id: base, base, past, pastParticiple: pp, ing, meaningFr: fr, cefr: 'A2.2' as const, irregular, frequencyRank: rank, collocations, phrasalVerbs: phrasal, exampleSentences: examples }
}
export const week4Verbs: VerbEntry[] = [
  v('hear', 'heard', 'heard', 'hearing', 'entendre', 68, true, ['hear a noise', 'hear about'], ['I hear you.', 'I heard a strange noise.']),
  v('feel', 'felt', 'felt', 'feeling', 'ressentir / se sentir', 55, true, ['feel tired', 'feel sick'], ['I feel great.', 'I felt scared.']),
  v('fall', 'fell', 'fallen', 'falling', 'tomber', 145, true, ['fall asleep', 'fall down'], ['She falls asleep at ten.', 'He fell off his bike.'], [{ form: 'fall asleep', meaningFr: "s'endormir" }]),
  v('begin', 'began', 'begun', 'beginning', 'commencer', 78, true, ['begin a project'], ['The film begins at eight.', 'It began to rain.']),
  v('break', 'broke', 'broken', 'breaking', 'casser', 160, true, ['break the rules', 'break down'], ['Don\u2019t break it.', 'My car broke down.'], [{ form: 'break down', meaningFr: 'tomber en panne' }]),
  v('forget', 'forgot', 'forgotten', 'forgetting', 'oublier', 200, true, ['forget a name', 'forget about'], ['I forget names easily.', 'I forgot my phone at home.']),
  v('stand', 'stood', 'stood', 'standing', 'être debout', 170, true, ['stand up', 'stand still'], ['Please stand up.', 'We stood in line for an hour.']),
  v('lose', 'lost', 'lost', 'losing', 'perdre', 155, true, ['lose a game', 'lose track'], ['I hate losing.', 'I lost my keys.']),
  v('decide', 'decided', 'decided', 'deciding', 'décider', 190, false, ['decide to', 'decide on'], ['I decide fast.', 'She decided to leave early.']),
  v('realize', 'realized', 'realized', 'realizing', 'se rendre compte', 210, false, ['realize a mistake'], ['I realize now.', 'He realized his mistake.']),
  v('walk', 'walked', 'walked', 'walking', 'marcher', 140, false, ['walk home', 'walk the dog'], ['I walk to work.', 'We walked for an hour.']),
  v('happen', 'happened', 'happened', 'happening', 'se passer / arriver', 165, false, ['happen suddenly'], ['It happens every year.', 'It happened last night.']),
]
