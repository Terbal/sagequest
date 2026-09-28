import type { VerbEntry } from '../../core/types'

function v(
  base: string, past: string, pp: string, ing: string, fr: string, rank: number,
  irregular: boolean, collocations: string[], examples: string[],
  phrasal: { form: string; meaningFr: string }[] = []
): VerbEntry {
  return {
    id: base, base, past, pastParticiple: pp, ing, meaningFr: fr, cefr: 'A2.1',
    irregular, frequencyRank: rank, collocations, phrasalVerbs: phrasal, exampleSentences: examples,
  }
}

export const week3Verbs: VerbEntry[] = [
  v('make', 'made', 'made', 'making', 'faire / fabriquer', 9, true, ['make a decision', 'make a mistake', 'make money'], ['She makes coffee every morning.', 'I made a mistake.'], [{ form: 'make up', meaningFr: 'inventer / se réconcilier' }]),
  v('buy', 'bought', 'bought', 'buying', 'acheter', 65, true, ['buy a ticket', 'buy online'], ['I buy bread every day.', 'He bought a new phone.']),
  v('say', 'said', 'said', 'saying', 'dire', 7, true, ['say hello', 'say sorry'], ['She says it is easy.', 'He said nothing.']),
  v('tell', 'told', 'told', 'telling', 'dire à / raconter', 35, true, ['tell a story', 'tell the truth'], ['Tell me about your day.', 'She told me the news.']),
  v('think', 'thought', 'thought', 'thinking', 'penser', 14, true, ['think about', 'think so'], ['I think it is a good idea.', 'We thought about it.']),
  v('know', 'knew', 'known', 'knowing', 'savoir / connaître', 11, true, ['know how', 'know someone'], ['I know him well.', 'She knew the answer.']),
  v('find', 'found', 'found', 'finding', 'trouver', 33, true, ['find a job', 'find out'], ['I find it difficult.', 'He found his keys.'], [{ form: 'find out', meaningFr: 'découvrir' }]),
  v('send', 'sent', 'sent', 'sending', 'envoyer', 105, true, ['send an email', 'send a message'], ['I send reports on Friday.', 'She sent the file yesterday.']),
  v('run', 'ran', 'run', 'running', 'courir / diriger', 75, true, ['run a business', 'run late'], ['He runs every morning.', 'She ran the meeting.']),
  v('speak', 'spoke', 'spoken', 'speaking', 'parler', 85, true, ['speak English', 'speak slowly'], ['I speak three languages.', 'He spoke to the manager.']),
  v('drive', 'drove', 'driven', 'driving', 'conduire', 150, true, ['drive to work', 'drive a car'], ['She drives to the office.', 'We drove all night.']),
  v('pay', 'paid', 'paid', 'paying', 'payer', 95, true, ['pay attention', 'pay by card'], ['I pay by card.', 'He paid the bill.']),
  v('bring', 'brought', 'brought', 'bringing', 'apporter', 90, true, ['bring a friend', 'bring up'], ['Bring your laptop.', 'She brought some cake.'], [{ form: 'bring up', meaningFr: 'évoquer / élever' }]),
  v('read', 'read', 'read', 'reading', 'lire (passé : prononcé « red »)', 80, true, ['read a book', 'read the news'], ['I read the news every day.', 'She read the report yesterday.']),
  v('visit', 'visited', 'visited', 'visiting', 'rendre visite / visiter', 130, false, ['visit a client', 'visit a website'], ['We visit our parents on Sundays.', 'He visited Paris last year.']),
  v('call', 'called', 'called', 'calling', 'appeler', 60, false, ['call back', 'call a client'], ['I call my mother every day.', 'She called me yesterday.'], [{ form: 'call back', meaningFr: 'rappeler' }]),
  v('play', 'played', 'played', 'playing', 'jouer', 88, false, ['play football', 'play a role'], ['He plays football on Sunday.', 'We played all afternoon.']),
  v('arrive', 'arrived', 'arrived', 'arriving', 'arriver', 115, false, ['arrive late', 'arrive at'], ['The train arrives at nine.', 'She arrived early.']),
]
