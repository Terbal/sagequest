// Content + scoring QA. Run from the project root:  npx tsx scripts/qa.mts
import { allGrammar, allVerbs, allVocab, allExercises, allMissions, allUsageNotes, allIdioms } from '../src/content/index.ts'
import { checkAnswer } from '../src/core/engines/correction.ts'
import { thirdPersonForm } from '../src/core/engines/verbForms.ts'
import { mergeSpeechSegments } from '../src/lib/speech.ts'
import { getUnlockedGrammarIds, getUnlockedVerbs } from '../src/content/helpers.ts'

let problems = 0
const bad = (...a: unknown[]) => { problems++; console.error('PROBLEM:', ...a) }
const run = (id: string, text: string) => {
  const e = allExercises.find((x) => x.id === id)
  if (!e) { bad('unknown exercise', id); return null }
  return checkAnswer(text, e.expectedPatterns, [], e.acceptableAnswers ?? [])
}

console.log({ grammar: allGrammar.length, verbs: allVerbs.length, vocab: allVocab.length, exercises: allExercises.length, missions: allMissions.length, notes: allUsageNotes.length, idioms: allIdioms.length })

// ---- structure ----
const exIds = new Set(allExercises.map((e) => e.id))
const gIds = new Set(allGrammar.map((g) => g.id))
const vIds = new Set(allVocab.map((v) => v.id))
for (const [name, arr] of [['exercise', allExercises], ['grammar', allGrammar], ['vocab', allVocab], ['verb', allVerbs], ['mission', allMissions], ['note', allUsageNotes], ['idiom', allIdioms]] as const) {
  const ids = (arr as { id: string }[]).map((x) => x.id)
  if (new Set(ids).size !== ids.length) bad('duplicate', name, 'ids')
}
for (const m of allMissions) {
  for (const s of m.sections) for (const id of s.exerciseIds) if (!exIds.has(id)) bad('missing exercise', id, m.id)
  for (const g of m.grammarFocus) if (!gIds.has(g)) bad('missing grammar', g, m.id)
  for (const v of m.vocabularyFocus) if (!vIds.has(v)) bad('missing vocab', v, m.id)
}
const days = allMissions.map((m) => m.day).sort((a, b) => a - b)
days.forEach((d, i) => { if (d !== i + 1) bad('mission days not contiguous at', d) })
for (const e of allExercises) {
  for (const g of e.grammar) if (!gIds.has(g)) bad('exercise grammar ref', g, e.id)
  for (const p of e.expectedPatterns) if (p.startsWith('regex:')) { try { new RegExp(p.slice(6), 'i') } catch { bad('bad regex', e.id, p) } }
  if (['transformation', 'reorder', 'fill_blank'].includes(e.type) && !e.acceptableAnswers) bad('no acceptableAnswers', e.id)
  // every acceptable answer must satisfy its own required keywords, else valid answers get rejected
  for (const a of e.acceptableAnswers ?? []) {
    const r = checkAnswer(a, e.expectedPatterns, [], e.acceptableAnswers)
    if (!r.correct || r.score !== 100) bad('acceptable answer rejected/not 100', e.id, JSON.stringify(a), r.score, r.failedPatterns)
  }
}
for (const g of allGrammar) for (const pre of g.prerequisites) if (!gIds.has(pre)) bad('prereq', pre, g.id)
for (const n of allUsageNotes) for (const g of n.relatedGrammar) if (!gIds.has(g)) bad('note grammar', g, n.id)

// ---- model answers must PASS ----
const good: Record<string, string> = {
  'd1-speak1': 'I am Joel. I am a developer. I am from Congo.', 'd2-speak1': 'I have two brothers and one sister.',
  'd3-speak1': 'I like coffee. I like music. I like football.', 'd4-speak1': 'There is a bed. There are two chairs.',
  'd5-speak1': 'What is your name? Where are you from? Do you work here?', 'd6-speak1': "I work every day. I don't work on Sunday. I don't eat meat.",
  'd1-reflex1': 'I am a developer', 'd1-reflex2': 'We are ready', 'd2-reflex1': 'He has a car', 'd2-reflex2': 'Our house is big',
  'd3-reflex1': 'I work in the cloud', 'd3-reflex2': 'She lives in Paris', 'd4-reflex1': 'There is a table in the room', 'd4-reflex2': 'I have a car',
  'd5-reflex1': 'Do you work here', 'd5-reflex2': 'What is your name', 'd6-reflex1': "She doesn't like coffee", 'd6-reflex2': "I don't work on Sundays",
  'd7-boss1': 'My name is Joel. I am from Congo. I work as a developer. I have two brothers in my family. I like football.',
  'd8-reflex1': 'He wakes up at 6', 'd8-reflex2': 'She finishes work at five', 'd8-speak1': 'My sister works in a bank. She goes to work by bus.',
  'd9-reflex1': 'I always go to work by bus', 'd9-reflex2': 'He is never late', 'd9-speak1': 'I always drink coffee. I usually read the news. I never eat breakfast.',
  'd10-reflex1': 'Does he work on Saturday', 'd10-reflex2': 'What time do you wake up', 'd10-speak1': 'Do you wake up early? Does he work at home?',
  'd11-reflex1': 'I start at 8', 'd11-reflex2': 'The class is on Monday in the morning', 'd11-speak1': 'I wake up at six. I start work at eight. I go to sleep at ten.',
  'd12-reflex1': 'I am at the office', 'd12-reflex2': 'She lives next to the station', 'd12-speak1': 'I live in Kinshasa and I work at a bank next to my house.',
  'd13-reflex1': 'He speaks fast', 'd13-reflex2': 'She works well', 'd13-speak1': 'My brother works hard. He speaks quickly.',
  'd14-boss1': 'I usually wake up at six. I have breakfast at seven and I start work at eight. I always eat lunch at noon.',
  'd15-reflex1': 'I was tired yesterday', 'd15-reflex2': 'We were at the office last night',
  'd15-speak1': 'Yesterday morning I was at home. In the afternoon I was at work. Last night I was at a restaurant.',
  'd16-reflex1': 'I worked yesterday', 'd16-reflex2': 'She finished the report', 'd16-speak1': 'I watched TV. I visited my friend and I called my mother.',
  'd17-reflex1': 'Yesterday I went to the office', 'd17-reflex2': 'She wrote an email', 'd17-speak1': 'Yesterday I went to work, I saw a friend and I took the bus.',
  'd18-reflex1': 'I met a client yesterday', 'd18-reflex2': 'He left the office early', 'd18-speak1': 'I bought a new phone last week.',
  'd19-reflex1': "I didn't eat yesterday", 'd19-reflex2': "She didn't call", 'd19-speak1': "I didn't go to work and I didn't cook.",
  'd20-reflex1': 'What did you do yesterday', 'd20-reflex2': 'Did he call the client', 'd20-speak1': 'Did you go to the party? What did you do?',
  'd21-boss1': "Yesterday I went to the office. I worked all morning and then I met a client. I didn't have lunch.",
  'd22-reflex1': 'I was working at nine pm', 'd22-reflex2': 'It was raining', 'd22-speak1': 'I was sleeping at 8pm yesterday. I was working at noon today.',
  'd23-reflex1': 'What were you doing at noon', 'd23-reflex2': "I wasn't listening", 'd23-speak1': 'What were you doing yesterday morning? What were you doing at noon?',
  'd24-reflex1': 'I was working when he called', 'd24-reflex2': 'She was cooking when the phone rang',
  'd24-speak1': 'I was walking home when it started to rain.',
  'd25-reflex1': 'While I was cooking, she was reading', 'd25-reflex2': 'While I was driving, he was sleeping',
  'd25-speak1': 'While I was working, my brother was watching TV.',
  'd26-reflex1': 'Suddenly the phone rang', 'd26-reflex2': 'Finally I found my keys',
  'd26-speak1': 'First I woke up. Then I had breakfast. Finally I left home.',
  'd27-reflex1': 'I was walking when I saw an accident', 'd27-reflex2': 'It was raining when we left',
  'd27-speak1': 'It was raining and I was walking home when I saw an old friend.',
  'd28-boss1': 'It was raining and I was walking home when I saw an accident. Suddenly a car stopped. First I called for help, then I waited.',
  'd29-reflex1': 'I think it will rain', 'd29-reflex2': "I'll help you", 'd29-speak1': "I think it will be sunny. I'll call you tomorrow.",
  'd30-reflex1': "I'm going to start a new job next month", 'd30-reflex2': "We're going to move next year",
  'd30-speak1': "I'm going to visit my family next month.",
  'd31-reflex1': "I'm going to travel this summer", 'd31-reflex2': "OK, I'll think about it",
  'd31-speak1': "I'm going to change jobs next year. OK, I'll come with you.",
  'd32-reflex1': "I'm meeting a client tomorrow", 'd32-reflex2': "We're having dinner at 8",
  'd32-speak1': "I'm meeting my team tomorrow at 9.",
  'd33-reflex1': 'I might come to the party', 'd33-reflex2': 'She might not be ready',
  'd33-speak1': 'I might travel this weekend. It may rain too.',
  'd34-reflex1': 'You should see a doctor', 'd34-reflex2': 'We should leave now',
  'd34-speak1': "You should rest more. You shouldn't work so hard.",
  'd35-boss1': "I'm going to change my career next year. I'll also try to travel more. I might start a new hobby soon.",
}
for (const [id, text] of Object.entries(good)) {
  const r = run(id, text)
  if (r && !r.correct) bad('model answer FAILS', id, JSON.stringify(text), r.score, r.failedPatterns)
}
// every reflex/speaking/boss exercise must have a model answer in this file
for (const e of allExercises) if (['reflex', 'speaking'].includes(e.type) && !(e.id in good)) bad('no model answer tested for', e.id)

// ---- known-wrong answers must FAIL ----
const wrong: [string, string][] = [
  ['d5-ex3', 'what is name your'], ['d5-ex1', 'you are ready'], ['d9-ex1', 'i drink always coffee'], ['d9-ex2', 'she never is late'],
  ['d1-reflex1', 'I is a developer'], ['d8-reflex1', 'He wake up at six'], ['d6-reflex1', 'She not like coffee'],
  ['d12-ex3', 'the keys is on the table'], ['d10-ex3', 'does you work in it'], ['d4-ex3', 'there is three chairs in the room'],
  ['d15-ex3', 'she were at home yesterday'], ['d17-ex3', 'i taked the bus yesterday'], ['d18-ex3', 'she maked a cake last week'],
  ['d19-ex3', "i didn't went to the party"], ['d20-ex3', 'did you saw the movie'], ['d17-reflex1', 'Yesterday I go to the office'],
  ['d19-reflex1', 'I not eat yesterday'], ['d20-reflex1', 'What you did yesterday'],
  ['d14-boss1', 'I like football'], ['d7-boss1', 'Hello'], ['d21-boss1', 'I am fine'],
  ['d22-ex1', 'i work at 9pm'], ['d23-ex3', 'did you were sleeping'], ['d24-ex3', 'we slept when the alarm was going off'],
  ['d25-ex3', 'while i worked she studied'], ['d27-ex3', 'i drove when i was seeing the accident'],
  ['d22-reflex1', 'I working at nine pm'], ['d28-boss1', 'Nothing happened.'],
  ['d29-ex2', 'OK, I am going to help you'], ['d30-ex1', 'I will going to start a new job next month'],
  ['d31-ex1', "It's already booked, I will travel this summer"], ['d32-ex1', 'I meet a client tomorrow'],
  ['d33-ex1', 'I mights come to the party'], ['d34-ex1', 'You should to see a doctor'],
  ['d34-ex3', "you must not work so hard"], ['d35-boss1', 'I have no plans.'],
]
for (const [id, text] of wrong) {
  const r = run(id, text)
  if (!r) continue
  console.log((r.correct ? '  !! ACCEPTED ' : '  ok rejected ') + id.padEnd(12), JSON.stringify(text).padEnd(42), r.score + '%')
  if (r.correct) bad('wrong answer accepted', id, text)
}
// typographic apostrophe from a phone keyboard must be treated like a straight one
const apos = run('d19-ex3', 'I didn\u2019t go to the party'); if (!apos?.correct) bad('curly apostrophe not accepted', apos)

// ---- speech transcript merge (the "HelloHello" bug) ----
const merge: [string[], string][] = [
  [['Hello', 'Hello'], 'Hello'], [['Hello'], 'Hello'], [['Hello', 'Hello world'], 'Hello world'],
  [['I went', 'to the office'], 'I went to the office'], [['Hello ', ' hello'], 'Hello'], [[''], ''], [['I like coffee', 'I like'], 'I like coffee'],
]
for (const [input, expected] of merge) {
  const got = mergeSpeechSegments(input)
  if (got !== expected) bad('speech merge', JSON.stringify(input), '->', JSON.stringify(got), 'expected', JSON.stringify(expected))
}

// ---- verb forms + unlock gating ----
const third: Record<string, string> = { be: 'is', have: 'has', work: 'works', go: 'goes', do: 'does', study: 'studies', watch: 'watches', finish: 'finishes', play: 'plays', pay: 'pays', say: 'says', arrive: 'arrives' }
for (const [b, t] of Object.entries(third)) if (thirdPersonForm(b) !== t) bad('thirdPerson', b, thirdPersonForm(b))
if (getUnlockedGrammarIds(16).has('past_simple_irregular')) bad('irregular past unlocked too early (day 16)')
if (!getUnlockedGrammarIds(17).has('past_simple_irregular')) bad('irregular past not unlocked on day 17')
if (getUnlockedVerbs(1).some((v) => v.id === 'make')) bad('week-3 verb visible on day 1')
if (!getUnlockedVerbs(15).some((v) => v.id === 'make')) bad('week-3 verb missing on day 15')

console.log(problems === 0 ? 'ALL CHECKS PASSED' : problems + ' PROBLEM(S)')
process.exit(problems === 0 ? 0 : 1)
