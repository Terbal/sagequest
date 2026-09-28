import type { Exercise } from '../../core/types'

export const week3Exercises: Exercise[] = [
  // ---------- DAY 15 — was / were + time expressions ----------
  {
    id: 'd15-ex1', type: 'fill_blank', grammar: ['past_simple_be'], cefr: 'A2.1',
    prompt: 'I ___ tired yesterday. (was/were)', expectedPatterns: ['word:was'], acceptableAnswers: ['was'],
  },
  {
    id: 'd15-ex2', type: 'fill_blank', grammar: ['past_simple_be'], cefr: 'A2.1',
    prompt: 'They ___ at the office last night. (was/were)', expectedPatterns: ['word:were'], acceptableAnswers: ['were'],
  },
  {
    id: 'd15-ex3', type: 'transformation', grammar: ['past_simple_be', 'past_time_expressions'], cefr: 'A2.1',
    prompt: 'Change to the past with "yesterday": She is at home.',
    expectedPatterns: ['word:was'],
    acceptableAnswers: ['she was at home yesterday', 'yesterday she was at home'],
  },
  {
    id: 'd15-reflex1', type: 'reflex', grammar: ['past_simple_be', 'past_time_expressions'], cefr: 'A2.1',
    promptFr: "J'étais fatigué hier.", prompt: 'Say it in English.',
    expectedPatterns: ['word:was', 'word:tired', 'word:yesterday'], timeLimitSeconds: 8,
  },
  {
    id: 'd15-reflex2', type: 'reflex', grammar: ['past_simple_be', 'past_time_expressions'], cefr: 'A2.1',
    promptFr: 'Nous étions au bureau hier soir.', prompt: 'Say it in English.',
    expectedPatterns: ['word:were', 'word:office', 'regex:\\b(last night|yesterday evening)\\b'], timeLimitSeconds: 8,
  },
  {
    id: 'd15-speak1', type: 'speaking', grammar: ['past_simple_be', 'past_time_expressions'], cefr: 'A2.1',
    prompt: 'Say where you were yesterday morning, yesterday afternoon and last night. Use "I was".',
    expectedPatterns: ['regex:\\bi was\\b', 'regex:\\b(morning|afternoon|last night|evening|yesterday)\\b'],
  },

  // ---------- DAY 16 — regular verbs ----------
  {
    id: 'd16-ex1', type: 'fill_blank', grammar: ['past_simple_regular'], cefr: 'A2.1',
    prompt: 'I ___ in Paris last year. (live)', expectedPatterns: ['word:lived'], acceptableAnswers: ['lived'],
  },
  {
    id: 'd16-ex2', type: 'fill_blank', grammar: ['past_simple_regular'], cefr: 'A2.1',
    prompt: 'She ___ English yesterday. (study)', expectedPatterns: ['word:studied'], acceptableAnswers: ['studied'],
    hint: 'consonant + y → -ied',
  },
  {
    id: 'd16-ex3', type: 'transformation', grammar: ['past_simple_regular', 'past_time_expressions'], cefr: 'A2.1',
    prompt: 'Change to the past with "yesterday": I watch TV.',
    expectedPatterns: ['word:watched'],
    acceptableAnswers: ['i watched tv yesterday', 'yesterday i watched tv'],
  },
  {
    id: 'd16-reflex1', type: 'reflex', grammar: ['past_simple_regular'], cefr: 'A2.1',
    promptFr: "J'ai travaillé hier.", prompt: 'Say it in English.',
    expectedPatterns: ['word:worked', 'word:yesterday'], timeLimitSeconds: 8,
  },
  {
    id: 'd16-reflex2', type: 'reflex', grammar: ['past_simple_regular'], cefr: 'A2.1',
    promptFr: 'Elle a fini le rapport.', prompt: 'Say it in English.',
    expectedPatterns: ['word:finished', 'word:report'], timeLimitSeconds: 8,
  },
  {
    id: 'd16-speak1', type: 'speaking', grammar: ['past_simple_regular'], cefr: 'A2.1',
    prompt: 'Say three things you did last weekend. Use regular verbs like worked, watched, visited, called.',
    expectedPatterns: ['regex:\\b(?!need\\b|red\\b|bed\\b)\\w{2,}ed\\b', 'regex:\\bi\\b'],
  },

  // ---------- DAY 17 — irregular verbs I ----------
  {
    id: 'd17-ex1', type: 'fill_blank', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    prompt: 'Yesterday, I ___ to the office. (go)', expectedPatterns: ['word:went'], acceptableAnswers: ['went'],
  },
  {
    id: 'd17-ex2', type: 'fill_blank', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    prompt: 'She ___ a great film last night. (see)', expectedPatterns: ['word:saw'], acceptableAnswers: ['saw'],
  },
  {
    id: 'd17-ex3', type: 'transformation', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    prompt: 'Change to the past with "yesterday": I take the bus.',
    expectedPatterns: ['word:took'],
    acceptableAnswers: ['i took the bus yesterday', 'yesterday i took the bus'],
  },
  {
    id: 'd17-reflex1', type: 'reflex', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    promptFr: 'Hier, je suis allé au bureau.', prompt: 'Say it in English.',
    expectedPatterns: ['word:yesterday', 'word:went', 'word:office'], timeLimitSeconds: 8,
  },
  {
    id: 'd17-reflex2', type: 'reflex', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    promptFr: 'Elle a écrit un e-mail.', prompt: 'Say it in English.',
    expectedPatterns: ['word:wrote', 'regex:\\b(email|mail)\\b'], timeLimitSeconds: 8,
  },
  {
    id: 'd17-speak1', type: 'speaking', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    prompt: 'Tell me three things you did yesterday. Use went, saw, took, had, ate or got.',
    expectedPatterns: ['regex:\\b(went|saw|took|had|ate|got|came|gave|wrote|did)\\b', 'regex:\\b(yesterday|this morning|last night)\\b'],
  },

  // ---------- DAY 18 — irregular verbs II ----------
  {
    id: 'd18-ex1', type: 'fill_blank', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    prompt: 'I ___ a new phone last week. (buy)', expectedPatterns: ['word:bought'], acceptableAnswers: ['bought'],
  },
  {
    id: 'd18-ex2', type: 'fill_blank', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    prompt: 'He ___ me the truth. (tell)', expectedPatterns: ['word:told'], acceptableAnswers: ['told'],
  },
  {
    id: 'd18-ex3', type: 'transformation', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    prompt: 'Change to the past with "last week": She makes a cake.',
    expectedPatterns: ['word:made'],
    acceptableAnswers: ['she made a cake last week', 'last week she made a cake'],
  },
  {
    id: 'd18-reflex1', type: 'reflex', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    promptFr: "J'ai rencontré un client hier.", prompt: 'Say it in English.',
    expectedPatterns: ['word:met', 'word:client', 'word:yesterday'], timeLimitSeconds: 8,
  },
  {
    id: 'd18-reflex2', type: 'reflex', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    promptFr: 'Il a quitté le bureau tôt.', prompt: 'Say it in English.',
    expectedPatterns: ['word:left', 'word:office', 'word:early'], timeLimitSeconds: 8,
  },
  {
    id: 'd18-speak1', type: 'speaking', grammar: ['past_simple_irregular'], cefr: 'A2.1',
    prompt: 'Tell me about something you bought, sent, found or made recently.',
    expectedPatterns: ['regex:\\b(bought|sent|found|made|paid|brought)\\b', 'regex:\\bi\\b'],
  },

  // ---------- DAY 19 — negatives ----------
  {
    id: 'd19-ex1', type: 'fill_blank', grammar: ['past_simple_negatives'], cefr: 'A2.1',
    prompt: "I ___ work yesterday. (didn't/don't)", expectedPatterns: ["regex:\\b(didn't|did not)\\b"], acceptableAnswers: ["didn't", 'did not'],
  },
  {
    id: 'd19-ex2', type: 'fill_blank', grammar: ['past_simple_negatives'], cefr: 'A2.1',
    prompt: "She ___ see the message. (didn't/doesn't)", expectedPatterns: ["regex:\\b(didn't|did not)\\b"], acceptableAnswers: ["didn't", 'did not'],
  },
  {
    id: 'd19-ex3', type: 'transformation', grammar: ['past_simple_negatives', 'past_simple_irregular'], cefr: 'A2.1',
    prompt: 'Make it negative: I went to the party.',
    expectedPatterns: ["regex:\\b(didn't|did not)\\b", 'word:go'],
    acceptableAnswers: ["i didn't go to the party", 'i did not go to the party'],
    hint: "didn't + base verb (go, not went)",
  },
  {
    id: 'd19-reflex1', type: 'reflex', grammar: ['past_simple_negatives'], cefr: 'A2.1',
    promptFr: "Je n'ai pas mangé hier.", prompt: 'Say it in English.',
    expectedPatterns: ["regex:\\b(didn't|did not)\\b", 'word:eat', 'word:yesterday'], timeLimitSeconds: 8,
  },
  {
    id: 'd19-reflex2', type: 'reflex', grammar: ['past_simple_negatives'], cefr: 'A2.1',
    promptFr: "Elle n'a pas appelé.", prompt: 'Say it in English.',
    expectedPatterns: ["regex:\\b(didn't|did not)\\b", 'word:call'], timeLimitSeconds: 8,
  },
  {
    id: 'd19-speak1', type: 'speaking', grammar: ['past_simple_negatives'], cefr: 'A2.1',
    prompt: "Say two things you did not do yesterday. Use \"I didn't...\".",
    expectedPatterns: ["regex:\\b(didn't|did not)\\b", 'regex:\\bi\\b'],
  },

  // ---------- DAY 20 — questions ----------
  {
    id: 'd20-ex1', type: 'fill_blank', grammar: ['past_simple_questions'], cefr: 'A2.1',
    prompt: '___ you go to work yesterday? (Did/Do)', expectedPatterns: ['word:did'], acceptableAnswers: ['did'],
  },
  {
    id: 'd20-ex2', type: 'fill_blank', grammar: ['past_simple_questions'], cefr: 'A2.1',
    prompt: 'Did she ___ the email? (send/sent)', expectedPatterns: ['word:send'], acceptableAnswers: ['send'],
    hint: 'after "did", use the base verb',
  },
  {
    id: 'd20-ex3', type: 'transformation', grammar: ['past_simple_questions', 'past_simple_irregular'], cefr: 'A2.1',
    prompt: 'Make it a question: You saw the movie.',
    expectedPatterns: ['word:did', 'word:see'], acceptableAnswers: ['did you see the movie'],
  },
  {
    id: 'd20-reflex1', type: 'reflex', grammar: ['past_simple_questions'], cefr: 'A2.1',
    promptFr: "Qu'est-ce que tu as fait hier ?", prompt: 'Say it in English.',
    expectedPatterns: ['contains:what did you do', 'word:yesterday'], timeLimitSeconds: 8,
  },
  {
    id: 'd20-reflex2', type: 'reflex', grammar: ['past_simple_questions'], cefr: 'A2.1',
    promptFr: "Est-ce qu'il a appelé le client ?", prompt: 'Say it in English.',
    expectedPatterns: ['word:did', 'word:he', 'word:call', 'word:client'], timeLimitSeconds: 8,
  },
  {
    id: 'd20-speak1', type: 'speaking', grammar: ['past_simple_questions'], cefr: 'A2.1',
    prompt: 'Ask three questions about someone\'s weekend. Start with "Did you...?" or "What did you...?".',
    expectedPatterns: ['regex:\\b(did you|what did|where did|who did|when did)\\b'],
  },
]

export const day21Boss: Exercise[] = [
  {
    id: 'd21-boss1', type: 'speaking',
    grammar: ['past_simple_be', 'past_simple_regular', 'past_simple_irregular', 'past_simple_negatives', 'past_time_expressions'],
    cefr: 'A2.1',
    prompt: 'Tell me what you did yesterday: where you went, what you did, and what you did not do.',
    // 5 required elements; 80% threshold => at least 4 of 5.
    expectedPatterns: [
      'regex:\\b(yesterday|last night|this morning|last week)\\b',
      'regex:\\b(went|saw|took|had|ate|got|came|met|left|slept|made|bought|drove|wrote|gave|did|read|said|found|sent|ran)\\b',
      'regex:\\b(?!need\\b|red\\b|bed\\b)\\w{2,}ed\\b',
      'regex:\\b(then|after|before|later|first|next)\\b',
      "regex:\\b(didn't|did not|was|were)\\b",
    ],
    timeLimitSeconds: 60,
  },
]
