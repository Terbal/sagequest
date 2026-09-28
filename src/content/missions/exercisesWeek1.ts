import type { Exercise } from '../../core/types'

export const week1Exercises: Exercise[] = [
  // ---------- DAY 1 — pronouns + be ----------
  {
    id: 'd1-ex1', type: 'fill_blank', grammar: ['be'], cefr: 'A1.1',
    prompt: 'I ___ a developer.', expectedPatterns: ['word:am'],
    acceptableAnswers: ['am'],
  },
  {
    id: 'd1-ex2', type: 'fill_blank', grammar: ['be'], cefr: 'A1.1',
    prompt: 'She ___ from Kinshasa.', expectedPatterns: ['word:is'],
    acceptableAnswers: ['is'],
  },
  {
    id: 'd1-ex3', type: 'transformation', grammar: ['be', 'pronouns'], cefr: 'A1.1',
    prompt: 'Build a sentence with: they / tired', expectedPatterns: ['word:they', 'word:are', 'word:tired'],
    acceptableAnswers: ['they are tired'],
    hint: 'they + are + adjective',
  },
  {
    id: 'd1-reflex1', type: 'reflex', grammar: ['be'], cefr: 'A1.1',
    promptFr: 'Je suis développeur.', prompt: 'Say it in English.',
    expectedPatterns: ['word:am'], timeLimitSeconds: 8,
  },
  {
    id: 'd1-reflex2', type: 'reflex', grammar: ['be'], cefr: 'A1.1',
    promptFr: 'Nous sommes prêts.', prompt: 'Say it in English.',
    expectedPatterns: ['word:we', 'word:are', 'word:ready'], timeLimitSeconds: 8,
  },
  {
    id: 'd1-speak1', type: 'speaking', grammar: ['be', 'pronouns'], cefr: 'A1.1',
    prompt: 'Say three sentences about yourself starting with "I am..."',
    expectedPatterns: ['word:am'],
  },

  // ---------- DAY 2 — have / possessives ----------
  {
    id: 'd2-ex1', type: 'fill_blank', grammar: ['have'], cefr: 'A1.1',
    prompt: 'She ___ two brothers.', expectedPatterns: ['word:has'], acceptableAnswers: ['has'],
  },
  {
    id: 'd2-ex2', type: 'fill_blank', grammar: ['have'], cefr: 'A1.1',
    prompt: 'I ___ a laptop.', expectedPatterns: ['word:have'], acceptableAnswers: ['have'],
  },
  {
    id: 'd2-ex3', type: 'transformation', grammar: ['possessives'], cefr: 'A1.1',
    prompt: 'Build a sentence with: Anna / name (use a possessive)',
    expectedPatterns: ['word:her', 'word:name'],
    acceptableAnswers: ['her name is anna'],
    hint: 'Her name is...',
  },
  {
    id: 'd2-reflex1', type: 'reflex', grammar: ['have'], cefr: 'A1.1',
    promptFr: "Il a une voiture.", prompt: 'Say it in English.',
    expectedPatterns: ['word:has', 'word:car'], timeLimitSeconds: 8,
  },
  {
    id: 'd2-reflex2', type: 'reflex', grammar: ['possessives'], cefr: 'A1.1',
    promptFr: 'Notre maison est grande.', prompt: 'Say it in English.',
    expectedPatterns: ['word:our', 'word:house'], timeLimitSeconds: 8,
  },
  {
    id: 'd2-speak1', type: 'speaking', grammar: ['have', 'possessives'], cefr: 'A1.1',
    prompt: 'Describe your family: how many brothers/sisters do you have?',
    expectedPatterns: ['word:have'],
  },

  // ---------- DAY 3 — present simple basics ----------
  {
    id: 'd3-ex1', type: 'fill_blank', grammar: ['present_simple_basic'], cefr: 'A1.2',
    prompt: 'I ___ in Kinshasa. (live)', expectedPatterns: ['word:live'], acceptableAnswers: ['live'],
  },
  {
    id: 'd3-ex2', type: 'fill_blank', grammar: ['present_simple_basic'], cefr: 'A1.2',
    prompt: 'She ___ coffee. (like)', expectedPatterns: ['word:likes'], acceptableAnswers: ['likes'],
  },
  {
    id: 'd3-ex3', type: 'transformation', grammar: ['present_simple_basic'], cefr: 'A1.2',
    prompt: 'Transform to he/she form: I work in IT.',
    expectedPatterns: ['word:works'],
    acceptableAnswers: ['she works in it', 'he works in it'],
    hint: 'Add -s for he/she/it.',
  },
  {
    id: 'd3-reflex1', type: 'reflex', grammar: ['present_simple_basic'], cefr: 'A1.2',
    promptFr: 'Je travaille dans le cloud.', prompt: 'Say it in English.',
    expectedPatterns: ['word:work'], timeLimitSeconds: 8,
  },
  {
    id: 'd3-reflex2', type: 'reflex', grammar: ['present_simple_basic'], cefr: 'A1.2',
    promptFr: "Elle vit à Paris.", prompt: 'Say it in English.',
    expectedPatterns: ['word:lives'], timeLimitSeconds: 8,
  },
  {
    id: 'd3-speak1', type: 'speaking', grammar: ['present_simple_basic'], cefr: 'A1.2',
    prompt: 'Say three things you like, using "I like..."',
    expectedPatterns: ['word:like'],
  },

  // ---------- DAY 4 — articles + plural ----------
  {
    id: 'd4-ex1', type: 'fill_blank', grammar: ['articles'], cefr: 'A1.1',
    prompt: 'She is ___ engineer.', expectedPatterns: ['word:an'], acceptableAnswers: ['an'],
  },
  {
    id: 'd4-ex2', type: 'fill_blank', grammar: ['plural_nouns'], cefr: 'A1.1',
    prompt: 'I have two ___. (book)', expectedPatterns: ['word:books'], acceptableAnswers: ['books'],
  },
  {
    id: 'd4-ex3', type: 'transformation', grammar: ['there_is_are'], cefr: 'A1.1',
    prompt: 'Build a sentence with: three chairs / room (use "there are")',
    expectedPatterns: ['word:there', 'word:are', 'word:chairs'],
    acceptableAnswers: ['there are three chairs in the room', 'there are three chairs'],
  },
  {
    id: 'd4-reflex1', type: 'reflex', grammar: ['there_is_are'], cefr: 'A1.1',
    promptFr: 'Il y a une table dans la pièce.', prompt: 'Say it in English.',
    expectedPatterns: ['word:there', 'word:is'], timeLimitSeconds: 8,
  },
  {
    id: 'd4-reflex2', type: 'reflex', grammar: ['articles'], cefr: 'A1.1',
    promptFr: "J'ai une voiture.", prompt: 'Say it in English.',
    expectedPatterns: ['word:a', 'word:car'], timeLimitSeconds: 8,
  },
  {
    id: 'd4-speak1', type: 'speaking', grammar: ['there_is_are'], cefr: 'A1.1',
    prompt: 'Describe your room: what is there in it?',
    expectedPatterns: ['word:there'],
  },

  // ---------- DAY 5 — basic questions ----------
  {
    id: 'd5-ex1', type: 'reorder', grammar: ['basic_questions'], cefr: 'A1.1',
    prompt: 'Reorder into a question: you / ready / are', expectedPatterns: ['word:are', 'word:you', 'word:ready'],
    acceptableAnswers: ['are you ready'],
  },
  {
    id: 'd5-ex2', type: 'fill_blank', grammar: ['basic_questions'], cefr: 'A1.1',
    prompt: '___ you work here? (do/does)', expectedPatterns: ['word:do'], acceptableAnswers: ['do'],
  },
  {
    id: 'd5-ex3', type: 'transformation', grammar: ['basic_questions'], cefr: 'A1.1',
    prompt: 'Make a question: What / your name',
    expectedPatterns: ['word:what', 'word:is', 'word:your', 'word:name'],
    acceptableAnswers: ['what is your name'],
  },
  {
    id: 'd5-reflex1', type: 'reflex', grammar: ['basic_questions'], cefr: 'A1.1',
    promptFr: 'Est-ce que tu travailles ici ?', prompt: 'Say it in English.',
    expectedPatterns: ['word:do', 'word:you', 'word:work'], timeLimitSeconds: 8,
  },
  {
    id: 'd5-reflex2', type: 'reflex', grammar: ['basic_questions'], cefr: 'A1.1',
    promptFr: "Quel est ton nom ?", prompt: 'Say it in English.',
    expectedPatterns: ['word:what', 'word:name'], timeLimitSeconds: 8,
  },
  {
    id: 'd5-speak1', type: 'speaking', grammar: ['basic_questions'], cefr: 'A1.1',
    prompt: 'Ask three questions you could ask someone you just met.',
    expectedPatterns: ['word:you'],
  },

  // ---------- DAY 6 — negatives + review ----------
  {
    id: 'd6-ex1', type: 'fill_blank', grammar: ['basic_negatives'], cefr: 'A1.1',
    prompt: "I ___ work on Sundays. (don't/doesn't)", expectedPatterns: ["word:don't", 'not:doesn\'t'],
    acceptableAnswers: ["don't"],
  },
  {
    id: 'd6-ex2', type: 'fill_blank', grammar: ['basic_negatives'], cefr: 'A1.1',
    prompt: "She ___ like coffee. (don't/doesn't)", expectedPatterns: ["word:doesn't"],
    acceptableAnswers: ["doesn't"],
  },
  {
    id: 'd6-ex3', type: 'transformation', grammar: ['basic_negatives'], cefr: 'A1.1',
    prompt: 'Make it negative: I am ready.', expectedPatterns: ['word:not'],
    acceptableAnswers: ['i am not ready', "i'm not ready"],
  },
  {
    id: 'd6-reflex1', type: 'reflex', grammar: ['basic_negatives'], cefr: 'A1.1',
    promptFr: "Elle n'aime pas le café.", prompt: 'Say it in English.',
    expectedPatterns: ["word:doesn't"], timeLimitSeconds: 8,
  },
  {
    id: 'd6-reflex2', type: 'reflex', grammar: ['basic_negatives'], cefr: 'A1.1',
    promptFr: "Je ne travaille pas le dimanche.", prompt: 'Say it in English.',
    expectedPatterns: ["word:don't"], timeLimitSeconds: 8,
  },
  {
    id: 'd6-speak1', type: 'speaking', grammar: ['basic_negatives', 'present_simple_basic'], cefr: 'A1.1',
    prompt: 'Say two things you do, and two things you don\'t do.',
    expectedPatterns: ["word:don't"],
  },
]

export const day7Boss: Exercise[] = [
  {
    id: 'd7-boss1', type: 'speaking', grammar: ['be', 'have', 'present_simple_basic', 'basic_negatives'],
    cefr: 'A1.2',
    prompt: 'Introduce yourself for 60 seconds: your name, where you are from, your job, your family, and something you like.',
    // 5 required elements; 80% threshold => at least 4 of 5 must be present.
    expectedPatterns: [
      'regex:\\b(my name is|i am|i\'m)\\b',
      'regex:\\bfrom\\b',
      'regex:\\b(work|job|developer|engineer|student|teacher)\\b',
      'regex:\\b(family|brother|sister|mother|father|wife|husband|children|child)\\b',
      'regex:\\b(like|love|enjoy)\\b',
    ],
    timeLimitSeconds: 60,
  },
]
