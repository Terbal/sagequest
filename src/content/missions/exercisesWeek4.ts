import type { Exercise } from '../../core/types'

export const week4Exercises: Exercise[] = [
  // ---------- DAY 22 — past continuous ----------
  {
    id: 'd22-ex1', type: 'fill_blank', grammar: ['past_continuous'], cefr: 'A2.2',
    prompt: 'I ___ at 9pm. (work)', expectedPatterns: ['word:was', 'word:working'], acceptableAnswers: ['was working'],
  },
  {
    id: 'd22-ex2', type: 'fill_blank', grammar: ['past_continuous'], cefr: 'A2.2',
    prompt: 'They ___ a film. (watch)', expectedPatterns: ['word:were', 'word:watching'], acceptableAnswers: ['were watching'],
  },
  {
    id: 'd22-ex3', type: 'transformation', grammar: ['past_continuous'], cefr: 'A2.2',
    prompt: 'Build a sentence with: it / rain / all morning',
    expectedPatterns: ['word:was', 'word:raining'],
    acceptableAnswers: ['it was raining all morning'],
  },
  {
    id: 'd22-reflex1', type: 'reflex', grammar: ['past_continuous'], cefr: 'A2.2',
    promptFr: 'Je travaillais à neuf heures du soir.', prompt: 'Say it in English.',
    expectedPatterns: ['word:was', 'word:working'], timeLimitSeconds: 8,
  },
  {
    id: 'd22-reflex2', type: 'reflex', grammar: ['past_continuous'], cefr: 'A2.2',
    promptFr: 'Il pleuvait.', prompt: 'Say it in English.',
    expectedPatterns: ['word:was', 'word:raining'], timeLimitSeconds: 8,
  },
  {
    id: 'd22-speak1', type: 'speaking', grammar: ['past_continuous'], cefr: 'A2.2',
    prompt: 'Say what you were doing at 8pm yesterday and at noon today.',
    expectedPatterns: ['regex:\\b(was|were)\\b', 'regex:\\w+ing\\b'],
  },

  // ---------- DAY 23 — questions & negatives ----------
  {
    id: 'd23-ex1', type: 'fill_blank', grammar: ['past_continuous_questions'], cefr: 'A2.2',
    prompt: '___ you sleeping at midnight? (Were/Did)', expectedPatterns: ['word:were'], acceptableAnswers: ['were'],
  },
  {
    id: 'd23-ex2', type: 'fill_blank', grammar: ['past_continuous_questions'], cefr: 'A2.2',
    prompt: "I ___ listening. (wasn't/didn't)", expectedPatterns: ["regex:\\b(wasn't|was not)\\b"], acceptableAnswers: ["wasn't", 'was not'],
  },
  {
    id: 'd23-ex3', type: 'transformation', grammar: ['past_continuous_questions'], cefr: 'A2.2',
    prompt: 'Make it a question: You were sleeping.',
    expectedPatterns: ['word:were'], acceptableAnswers: ['were you sleeping'],
  },
  {
    id: 'd23-reflex1', type: 'reflex', grammar: ['past_continuous_questions'], cefr: 'A2.2',
    promptFr: "Qu'est-ce que tu faisais à midi ?", prompt: 'Say it in English.',
    expectedPatterns: ['contains:what were you doing'], timeLimitSeconds: 8,
  },
  {
    id: 'd23-reflex2', type: 'reflex', grammar: ['past_continuous_questions'], cefr: 'A2.2',
    promptFr: "Je n'écoutais pas.", prompt: 'Say it in English.',
    expectedPatterns: ["word:wasn't", 'word:listening'], timeLimitSeconds: 8,
  },
  {
    id: 'd23-speak1', type: 'speaking', grammar: ['past_continuous_questions'], cefr: 'A2.2',
    prompt: 'Ask someone what they were doing at three different times yesterday.',
    expectedPatterns: ['contains:what were you doing', 'regex:\\byesterday\\b'],
  },

  // ---------- DAY 24 — when + interrupted action ----------
  {
    id: 'd24-ex1', type: 'fill_blank', grammar: ['when_interrupted_action'], cefr: 'A2.2',
    prompt: 'I was working when he ___. (call)', expectedPatterns: ['word:called'], acceptableAnswers: ['called'],
  },
  {
    id: 'd24-ex2', type: 'fill_blank', grammar: ['when_interrupted_action'], cefr: 'A2.2',
    prompt: 'She ___ cooking when the phone rang. (be)', expectedPatterns: ['word:was'], acceptableAnswers: ['was'],
  },
  {
    id: 'd24-ex3', type: 'transformation', grammar: ['when_interrupted_action'], cefr: 'A2.2',
    prompt: 'Build a sentence with: we / sleep / when / the alarm / go off',
    expectedPatterns: ['word:were', 'word:sleeping', 'word:when', 'word:went'],
    acceptableAnswers: ['we were sleeping when the alarm went off'],
  },
  {
    id: 'd24-reflex1', type: 'reflex', grammar: ['when_interrupted_action'], cefr: 'A2.2',
    promptFr: 'Je travaillais quand il a appelé.', prompt: 'Say it in English.',
    expectedPatterns: ['word:was', 'word:working', 'word:when', 'word:called'], timeLimitSeconds: 9,
  },
  {
    id: 'd24-reflex2', type: 'reflex', grammar: ['when_interrupted_action'], cefr: 'A2.2',
    promptFr: "Elle cuisinait quand le téléphone a sonné.", prompt: 'Say it in English.',
    expectedPatterns: ['word:was', 'word:cooking', 'word:when', 'word:rang'], timeLimitSeconds: 9,
  },
  {
    id: 'd24-speak1', type: 'speaking', grammar: ['when_interrupted_action'], cefr: 'A2.2',
    prompt: 'Tell me about a time something interrupted you. Use "I was ... when ...".',
    expectedPatterns: ['regex:\\bwas \\w+ing\\b', 'word:when'],
  },

  // ---------- DAY 25 — while + parallel actions ----------
  {
    id: 'd25-ex1', type: 'fill_blank', grammar: ['while_parallel_actions'], cefr: 'A2.2',
    prompt: 'While I was cooking, she ___ reading. (be)', expectedPatterns: ['word:was'], acceptableAnswers: ['was'],
  },
  {
    id: 'd25-ex2', type: 'fill_blank', grammar: ['while_parallel_actions'], cefr: 'A2.2',
    prompt: 'While he was driving, I ___ checking emails. (be)', expectedPatterns: ['word:was'], acceptableAnswers: ['was'],
  },
  {
    id: 'd25-ex3', type: 'transformation', grammar: ['while_parallel_actions'], cefr: 'A2.2',
    prompt: 'Build a sentence with: while / I / work / she / study',
    expectedPatterns: ['word:while', 'word:was', 'word:working', 'word:studying'],
    acceptableAnswers: ['while i was working, she was studying'],
  },
  {
    id: 'd25-reflex1', type: 'reflex', grammar: ['while_parallel_actions'], cefr: 'A2.2',
    promptFr: 'Pendant que je cuisinais, elle lisait.', prompt: 'Say it in English.',
    expectedPatterns: ['word:while', 'word:cooking', 'word:reading'], timeLimitSeconds: 9,
  },
  {
    id: 'd25-reflex2', type: 'reflex', grammar: ['while_parallel_actions'], cefr: 'A2.2',
    promptFr: 'Pendant que je conduisais, il dormait.', prompt: 'Say it in English.',
    expectedPatterns: ['word:while', 'word:driving', 'word:sleeping'], timeLimitSeconds: 9,
  },
  {
    id: 'd25-speak1', type: 'speaking', grammar: ['while_parallel_actions'], cefr: 'A2.2',
    prompt: 'Describe two things happening at the same time yesterday, using "while".',
    expectedPatterns: ['word:while', 'regex:\\bwas \\w+ing\\b'],
  },

  // ---------- DAY 26 — narrative connectors ----------
  {
    id: 'd26-ex1', type: 'fill_blank', grammar: ['narrative_connectors'], cefr: 'A2.2',
    prompt: '___, I woke up. ___, I checked my phone. (First/Then)', expectedPatterns: ['word:first'], acceptableAnswers: ['first'],
  },
  {
    id: 'd26-ex2', type: 'fill_blank', grammar: ['narrative_connectors'], cefr: 'A2.2',
    prompt: '___, the lights went out. (Suddenly/Slowly)', expectedPatterns: ['word:suddenly'], acceptableAnswers: ['suddenly'],
  },
  {
    id: 'd26-ex3', type: 'reorder', grammar: ['narrative_connectors'], cefr: 'A2.2',
    prompt: 'Reorder: found / finally / my / I / keys',
    expectedPatterns: ['word:finally'], acceptableAnswers: ['finally i found my keys'],
  },
  {
    id: 'd26-reflex1', type: 'reflex', grammar: ['narrative_connectors'], cefr: 'A2.2',
    promptFr: "Soudain, le téléphone a sonné.", prompt: 'Say it in English.',
    expectedPatterns: ['word:suddenly', 'word:rang'], timeLimitSeconds: 9,
  },
  {
    id: 'd26-reflex2', type: 'reflex', grammar: ['narrative_connectors'], cefr: 'A2.2',
    promptFr: "Finalement, j'ai trouvé mes clés.", prompt: 'Say it in English.',
    expectedPatterns: ['word:finally', 'word:found'], timeLimitSeconds: 9,
  },
  {
    id: 'd26-speak1', type: 'speaking', grammar: ['narrative_connectors'], cefr: 'A2.2',
    prompt: 'Tell a 3-step mini story using "first", "then" and "finally".',
    expectedPatterns: ['word:first', 'word:then', 'word:finally'],
  },

  // ---------- DAY 27 — mixed review ----------
  {
    id: 'd27-ex1', type: 'fill_blank', grammar: ['storytelling_mixed'], cefr: 'A2.2',
    prompt: 'I ___ home when I ___ my friend. (walk / see)',
    expectedPatterns: ['word:was', 'word:walking', 'word:saw'],
    acceptableAnswers: ['was walking / saw'],
  },
  {
    id: 'd27-ex2', type: 'fill_blank', grammar: ['storytelling_mixed'], cefr: 'A2.2',
    prompt: 'It ___ when we ___ the house. (rain / leave)',
    expectedPatterns: ['word:was', 'word:raining', 'word:left'],
    acceptableAnswers: ['was raining / left'],
  },
  {
    id: 'd27-ex3', type: 'transformation', grammar: ['storytelling_mixed'], cefr: 'A2.2',
    prompt: 'Build a sentence with: I / drive / when / I / see / the accident',
    expectedPatterns: ['word:was', 'word:driving', 'word:when', 'word:saw'],
    acceptableAnswers: ['i was driving when i saw the accident'],
  },
  {
    id: 'd27-reflex1', type: 'reflex', grammar: ['storytelling_mixed'], cefr: 'A2.2',
    promptFr: "Je marchais quand j'ai vu un accident.", prompt: 'Say it in English.',
    expectedPatterns: ['word:was', 'word:walking', 'word:when', 'word:saw'], timeLimitSeconds: 9,
  },
  {
    id: 'd27-reflex2', type: 'reflex', grammar: ['storytelling_mixed'], cefr: 'A2.2',
    promptFr: "Il pleuvait quand nous sommes partis.", prompt: 'Say it in English.',
    expectedPatterns: ['word:was', 'word:raining', 'word:when', 'word:left'], timeLimitSeconds: 9,
  },
  {
    id: 'd27-speak1', type: 'speaking', grammar: ['storytelling_mixed'], cefr: 'A2.2',
    prompt: 'Tell a short story: set the scene (what was happening) then say what happened.',
    expectedPatterns: ['regex:\\bwas \\w+ing\\b', 'word:when'],
  },
]

export const day28Boss: Exercise[] = [
  {
    id: 'd28-boss1', type: 'speaking',
    grammar: ['past_continuous', 'when_interrupted_action', 'while_parallel_actions', 'narrative_connectors', 'storytelling_mixed'],
    cefr: 'A2.2',
    prompt: 'Tell a story about something that happened: set the scene with what was going on, then say what happened, in order.',
    // 5 required elements; 80% threshold => at least 4 of 5.
    expectedPatterns: [
      'regex:\\bwas \\w+ing\\b',
      'regex:\\b(when|while)\\b',
      'regex:\\b(went|saw|took|had|got|came|met|left|called|heard|felt|fell|began|broke|forgot|lost|happened|rang)\\b',
      'regex:\\b(first|then|after that|suddenly|finally)\\b',
      'regex:\\b(was|were)\\b',
    ],
    timeLimitSeconds: 60,
  },
]
