import type { GrammarConcept } from '../../core/types'

export const week4Grammar: GrammarConcept[] = [
  {
    id: 'past_continuous',
    label: 'Past Continuous: was/were + -ing',
    cefr: 'A2.2',
    explanation: 'Describes an action IN PROGRESS at a moment in the past. "I was working" = I was in the middle of working. Use was (I/he/she/it) or were (you/we/they) + verb-ing.',
    examples: ['I was working at 9pm.', 'They were watching a film.', 'It was raining.'],
    commonMistakes: [
      { wrong: 'i was work', right: 'i was working', why: 'Add -ing to the main verb after was/were.' },
      { wrong: 'i working', right: 'i was working', why: 'The past continuous needs was/were, not just -ing alone.' },
    ],
    triggerWords: ['at that moment', 'at 9pm', 'all day'],
    prerequisites: ['past_simple_be', 'present_simple_basic'],
    masteryThreshold: 70,
  },
  {
    id: 'past_continuous_questions',
    label: 'Past Continuous: questions & negatives',
    cefr: 'A2.2',
    explanation: 'Questions: Was/Were + subject + verb-ing? ("Were you sleeping?"). Negatives: wasn\'t/weren\'t + verb-ing ("I wasn\'t listening"). No "did" here — was/were carries the question and negative, just like "be".',
    examples: ['Were you sleeping?', "I wasn't listening.", 'What were you doing at noon?'],
    commonMistakes: [
      { wrong: 'did you were sleeping', right: 'were you sleeping', why: "Don't add \"did\" — was/were already forms the question." },
      { wrong: "i didn't was listening", right: "i wasn't listening", why: 'Negate with wasn\'t/weren\'t, not didn\'t.' },
    ],
    triggerWords: [],
    prerequisites: ['past_continuous', 'past_simple_questions'],
    masteryThreshold: 70,
  },
  {
    id: 'when_interrupted_action',
    label: '"when" + past simple interrupts an action',
    cefr: 'A2.2',
    explanation: 'The longer, in-progress action goes in the past continuous; the short action that interrupts it goes in the past simple, introduced by "when". "I was working when he called" = the call interrupted the working.',
    examples: ['I was working when he called.', 'She was cooking when the phone rang.', 'We were sleeping when the alarm went off.'],
    commonMistakes: [
      { wrong: 'i worked when he was calling', right: 'i was working when he called', why: 'The background action is continuous; the interrupting action is simple past.' },
    ],
    triggerWords: ['when'],
    prerequisites: ['past_continuous', 'past_simple_irregular'],
    masteryThreshold: 70,
  },
  {
    id: 'while_parallel_actions',
    label: '"while" for two actions at the same time',
    cefr: 'A2.2',
    explanation: '"while" introduces two things happening in parallel, both usually in the past continuous. "While I was cooking, she was reading" — both actions were in progress together.',
    examples: ['While I was cooking, she was reading.', 'While he was driving, I was checking emails.'],
    commonMistakes: [
      { wrong: 'while i cooked, she read', right: 'while i was cooking, she was reading', why: 'For two parallel in-progress actions, use the past continuous on both.' },
    ],
    triggerWords: ['while'],
    prerequisites: ['past_continuous'],
    masteryThreshold: 70,
  },
  {
    id: 'narrative_connectors',
    label: 'Telling a Story in Order',
    cefr: 'A2.2',
    explanation: 'first, then, after that, suddenly, in the end / finally — these words show the order of events and make a story easy to follow, instead of a flat list of sentences.',
    examples: ['First I woke up. Then I checked my phone. Suddenly it rang. In the end, I was late.'],
    commonMistakes: [
      { wrong: 'first... after... then', right: 'first... then... after that', why: '"after" alone needs an object or clause; "after that" links two full sentences.' },
    ],
    triggerWords: ['first', 'then', 'after that', 'suddenly', 'finally'],
    prerequisites: ['past_simple_irregular'],
    masteryThreshold: 65,
  },
  {
    id: 'storytelling_mixed',
    label: 'Mixing Past Simple & Past Continuous',
    cefr: 'A2.2',
    explanation: 'A good story sets the scene with the past continuous (what was going on) then moves it forward with the past simple (what happened). Both tenses work together, not one instead of the other.',
    examples: ['It was raining. I was walking home when I saw an old friend. We talked for an hour.'],
    commonMistakes: [
      { wrong: 'i walked home when i was seeing my friend', right: 'i was walking home when i saw my friend', why: 'Background action = continuous; the event that happens = simple past.' },
    ],
    triggerWords: [],
    prerequisites: ['past_continuous', 'when_interrupted_action', 'narrative_connectors'],
    masteryThreshold: 75,
  },
]
