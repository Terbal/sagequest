import type { Exercise } from '../../core/types'

// Note on patterns: scoring is % of patterns matched, threshold 80%.
// Numbers are accepted as words or digits because speech recognition
// often transcribes "six" as "6".

export const week2Exercises: Exercise[] = [
  // ---------- DAY 8 — he / she / it (-s) ----------
  {
    id: 'd8-ex1', type: 'fill_blank', grammar: ['present_simple_third_person'], cefr: 'A1.2',
    prompt: 'He ___ to work by bus. (go)', expectedPatterns: ['word:goes'], acceptableAnswers: ['goes'],
    hint: 'go + es with he/she/it',
  },
  {
    id: 'd8-ex2', type: 'fill_blank', grammar: ['present_simple_third_person'], cefr: 'A1.2',
    prompt: 'She ___ TV in the evening. (watch)', expectedPatterns: ['word:watches'], acceptableAnswers: ['watches'],
  },
  {
    id: 'd8-ex3', type: 'transformation', grammar: ['present_simple_third_person'], cefr: 'A1.2',
    prompt: 'Change to he/she: I study English every day.',
    expectedPatterns: ['word:studies'],
    acceptableAnswers: ['she studies english every day', 'he studies english every day'],
    hint: 'study → studies',
  },
  {
    id: 'd8-reflex1', type: 'reflex', grammar: ['present_simple_third_person'], cefr: 'A1.2',
    promptFr: 'Il se réveille à six heures.', prompt: 'Say it in English.',
    expectedPatterns: ['word:wakes', 'regex:\\b(six|6)\\b'], timeLimitSeconds: 8,
  },
  {
    id: 'd8-reflex2', type: 'reflex', grammar: ['present_simple_third_person'], cefr: 'A1.2',
    promptFr: 'Elle finit le travail à cinq heures.', prompt: 'Say it in English.',
    expectedPatterns: ['word:finishes', 'regex:\\b(five|5)\\b'], timeLimitSeconds: 8,
  },
  {
    id: 'd8-speak1', type: 'speaking', grammar: ['present_simple_third_person'], cefr: 'A1.2',
    prompt: 'Describe what someone in your family does every day. Use "he" or "she".',
    expectedPatterns: ['regex:\\b(he|she)\\b', 'regex:\\b(he|she) \\w+s\\b'],
  },

  // ---------- DAY 9 — frequency adverbs ----------
  {
    id: 'd9-ex1', type: 'reorder', grammar: ['frequency_adverbs'], cefr: 'A1.2',
    prompt: 'Reorder into a sentence: always / I / drink / coffee',
    expectedPatterns: ['word:always'], acceptableAnswers: ['i always drink coffee'],
    hint: 'adverb goes before the main verb',
  },
  {
    id: 'd9-ex2', type: 'reorder', grammar: ['frequency_adverbs', 'be'], cefr: 'A1.2',
    prompt: 'Reorder into a sentence: is / late / never / she',
    expectedPatterns: ['word:never'], acceptableAnswers: ['she is never late'],
    hint: 'with "be", the adverb goes after it',
  },
  {
    id: 'd9-ex3', type: 'transformation', grammar: ['frequency_adverbs'], cefr: 'A1.2',
    prompt: 'Add "usually": I wake up at six.',
    expectedPatterns: ['word:usually'],
    acceptableAnswers: ['i usually wake up at six', 'i usually wake up at 6'],
  },
  {
    id: 'd9-reflex1', type: 'reflex', grammar: ['frequency_adverbs'], cefr: 'A1.2',
    promptFr: 'Je vais toujours au travail en bus.', prompt: 'Say it in English.',
    expectedPatterns: ['word:always', 'word:bus'], timeLimitSeconds: 8,
  },
  {
    id: 'd9-reflex2', type: 'reflex', grammar: ['frequency_adverbs', 'be'], cefr: 'A1.2',
    promptFr: "Il n'est jamais en retard.", prompt: 'Say it in English.',
    expectedPatterns: ['word:never', 'word:late'], timeLimitSeconds: 8,
  },
  {
    id: 'd9-speak1', type: 'speaking', grammar: ['frequency_adverbs'], cefr: 'A1.2',
    prompt: 'Say three things you always, usually or never do in the morning.',
    expectedPatterns: ['regex:\\b(always|usually|often|sometimes|never)\\b', 'regex:\\bi\\b'],
  },

  // ---------- DAY 10 — do / does questions ----------
  {
    id: 'd10-ex1', type: 'fill_blank', grammar: ['present_simple_questions'], cefr: 'A1.2',
    prompt: '___ she work here? (do/does)', expectedPatterns: ['word:does'], acceptableAnswers: ['does'],
  },
  {
    id: 'd10-ex2', type: 'fill_blank', grammar: ['present_simple_questions'], cefr: 'A1.2',
    prompt: '___ they live in Paris? (do/does)', expectedPatterns: ['word:do'], acceptableAnswers: ['do'],
  },
  {
    id: 'd10-ex3', type: 'transformation', grammar: ['present_simple_questions'], cefr: 'A1.2',
    prompt: 'Make it a question: You work in IT.',
    expectedPatterns: ['word:do'], acceptableAnswers: ['do you work in it'],
  },
  {
    id: 'd10-reflex1', type: 'reflex', grammar: ['present_simple_questions'], cefr: 'A1.2',
    promptFr: 'Est-ce qu’il travaille le samedi ?', prompt: 'Say it in English.',
    expectedPatterns: ['word:does', 'word:work', 'word:saturday'], timeLimitSeconds: 8,
  },
  {
    id: 'd10-reflex2', type: 'reflex', grammar: ['present_simple_questions'], cefr: 'A1.2',
    promptFr: 'À quelle heure tu te réveilles ?', prompt: 'Say it in English.',
    expectedPatterns: ['contains:what time', 'word:do', 'word:you', 'word:wake'], timeLimitSeconds: 8,
  },
  {
    id: 'd10-speak1', type: 'speaking', grammar: ['present_simple_questions'], cefr: 'A1.2',
    prompt: 'Ask three questions to learn about someone\'s daily routine. Start with "Do you..." or "Does he/she...".',
    expectedPatterns: ['regex:\\b(do|does) (you|he|she|they)\\b'],
  },

  // ---------- DAY 11 — at / on / in (time) ----------
  {
    id: 'd11-ex1', type: 'fill_blank', grammar: ['prepositions_time'], cefr: 'A1.2',
    prompt: "I wake up ___ 6 o'clock. (at/on/in)", expectedPatterns: ['word:at'], acceptableAnswers: ['at'],
  },
  {
    id: 'd11-ex2', type: 'fill_blank', grammar: ['prepositions_time'], cefr: 'A1.2',
    prompt: 'The meeting is ___ Monday. (at/on/in)', expectedPatterns: ['word:on'], acceptableAnswers: ['on'],
  },
  {
    id: 'd11-ex3', type: 'transformation', grammar: ['prepositions_time'], cefr: 'A1.2',
    prompt: 'Build a sentence with: I / study / the evening',
    expectedPatterns: ['contains:in the evening'], acceptableAnswers: ['i study in the evening'],
  },
  {
    id: 'd11-reflex1', type: 'reflex', grammar: ['prepositions_time'], cefr: 'A1.2',
    promptFr: 'Je commence à huit heures.', prompt: 'Say it in English.',
    expectedPatterns: ['word:start', 'word:at', 'regex:\\b(eight|8)\\b'], timeLimitSeconds: 8,
  },
  {
    id: 'd11-reflex2', type: 'reflex', grammar: ['prepositions_time'], cefr: 'A1.2',
    promptFr: 'Le cours est le lundi matin.', prompt: 'Say it in English.',
    expectedPatterns: ['contains:on monday', 'contains:in the morning'], timeLimitSeconds: 8,
  },
  {
    id: 'd11-speak1', type: 'speaking', grammar: ['prepositions_time'], cefr: 'A1.2',
    prompt: 'Say when you wake up, when you start work and when you go to sleep. Use "at".',
    expectedPatterns: ['word:at', 'regex:\\b(wake|get up|start|sleep|go to bed)\\b'],
  },

  // ---------- DAY 12 — in / on / at (place) ----------
  {
    id: 'd12-ex1', type: 'fill_blank', grammar: ['prepositions_place'], cefr: 'A1.2',
    prompt: 'My brother lives ___ Paris. (in/at)', expectedPatterns: ['word:in'], acceptableAnswers: ['in'],
  },
  {
    id: 'd12-ex2', type: 'fill_blank', grammar: ['prepositions_place'], cefr: 'A1.2',
    prompt: 'She is ___ home now. (at/in)', expectedPatterns: ['word:at'], acceptableAnswers: ['at'],
  },
  {
    id: 'd12-ex3', type: 'transformation', grammar: ['prepositions_place', 'be'], cefr: 'A1.2',
    prompt: 'Build a sentence with: the keys / on / the table',
    expectedPatterns: ['word:on'], acceptableAnswers: ['the keys are on the table'],
  },
  {
    id: 'd12-reflex1', type: 'reflex', grammar: ['prepositions_place'], cefr: 'A1.2',
    promptFr: 'Je suis au bureau.', prompt: 'Say it in English.',
    expectedPatterns: ['word:at', 'word:office'], timeLimitSeconds: 8,
  },
  {
    id: 'd12-reflex2', type: 'reflex', grammar: ['prepositions_place', 'present_simple_third_person'], cefr: 'A1.2',
    promptFr: 'Elle habite à côté de la gare.', prompt: 'Say it in English.',
    expectedPatterns: ['word:lives', 'contains:next to', 'word:station'], timeLimitSeconds: 8,
  },
  {
    id: 'd12-speak1', type: 'speaking', grammar: ['prepositions_place'], cefr: 'A1.2',
    prompt: 'Describe where you live and where you work. Use "in", "at" or "next to".',
    expectedPatterns: ['regex:\\b(in|at|next to|near)\\b', 'regex:\\b(live|work)\\b'],
  },

  // ---------- DAY 13 — adverbs of manner + review ----------
  {
    id: 'd13-ex1', type: 'fill_blank', grammar: ['adverbs_manner'], cefr: 'A1.2',
    prompt: 'He speaks English very ___. (good/well)', expectedPatterns: ['word:well'], acceptableAnswers: ['well'],
  },
  {
    id: 'd13-ex2', type: 'fill_blank', grammar: ['adverbs_manner'], cefr: 'A1.2',
    prompt: 'She drives ___. (slow/slowly)', expectedPatterns: ['word:slowly'], acceptableAnswers: ['slowly'],
  },
  {
    id: 'd13-ex3', type: 'transformation', grammar: ['adverbs_manner', 'present_simple_third_person'], cefr: 'A1.2',
    prompt: 'Build a sentence with: she / work / hard',
    expectedPatterns: ['word:works'], acceptableAnswers: ['she works hard'],
  },
  {
    id: 'd13-reflex1', type: 'reflex', grammar: ['adverbs_manner', 'present_simple_third_person'], cefr: 'A1.2',
    promptFr: 'Il parle vite.', prompt: 'Say it in English.',
    expectedPatterns: ['word:speaks', 'regex:\\b(fast|quickly)\\b'], timeLimitSeconds: 8,
  },
  {
    id: 'd13-reflex2', type: 'reflex', grammar: ['adverbs_manner', 'present_simple_third_person'], cefr: 'A1.2',
    promptFr: 'Elle travaille bien.', prompt: 'Say it in English.',
    expectedPatterns: ['word:works', 'word:well'], timeLimitSeconds: 8,
  },
  {
    id: 'd13-speak1', type: 'speaking', grammar: ['adverbs_manner', 'present_simple_third_person'], cefr: 'A1.2',
    prompt: 'Describe a person you know, using at least one adverb (well, hard, quickly, slowly).',
    expectedPatterns: ['regex:\\b(well|hard|quickly|slowly|fast|carefully)\\b', 'regex:\\b(he|she) \\w+s\\b'],
  },
]

export const day14Boss: Exercise[] = [
  {
    id: 'd14-boss1', type: 'speaking',
    grammar: ['present_simple_basic', 'present_simple_third_person', 'frequency_adverbs', 'prepositions_time'],
    cefr: 'A1.2',
    prompt: 'Describe your typical day: when you wake up, what you do, when you eat, and what you always or never do.',
    // 5 required elements; 80% threshold => at least 4 of 5.
    expectedPatterns: [
      'regex:\\b(always|usually|often|sometimes|never)\\b',
      'regex:\\b(wake|get) up\\b',
      'regex:\\b(work|study|go to work|start work)\\b',
      'regex:\\bat (\\d|six|seven|eight|nine|ten|noon|midnight)',
      'regex:\\b(eat|have|breakfast|lunch|dinner)\\b',
    ],
    timeLimitSeconds: 60,
  },
]
