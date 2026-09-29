import type { Exercise } from '../../core/types'

export const week5Exercises: Exercise[] = [
  // ---------- DAY 29 — will (predictions, decisions, promises) ----------
  {
    id: 'd29-ex1', type: 'fill_blank', grammar: ['future_will'], cefr: 'A2.3',
    prompt: 'I think it ___ rain tomorrow. (will/going to)', expectedPatterns: ['word:will'], acceptableAnswers: ['will'],
  },
  {
    id: 'd29-ex2', type: 'fill_blank', grammar: ['future_will'], cefr: 'A2.3',
    prompt: "OK, I ___ help you. (will/am)", expectedPatterns: ['word:will'], acceptableAnswers: ['will'],
  },
  {
    id: 'd29-ex3', type: 'transformation', grammar: ['future_will'], cefr: 'A2.3',
    prompt: 'Build a sentence with: I / think / it / rain / tomorrow',
    expectedPatterns: ['word:think', 'word:will', 'word:rain'],
    acceptableAnswers: ['i think it will rain tomorrow'],
  },
  {
    id: 'd29-reflex1', type: 'reflex', grammar: ['future_will'], cefr: 'A2.3',
    promptFr: "Je pense qu'il va pleuvoir.", prompt: 'Say it in English.',
    expectedPatterns: ['word:think', 'word:will', 'word:rain'], timeLimitSeconds: 9,
  },
  {
    id: 'd29-reflex2', type: 'reflex', grammar: ['future_will'], cefr: 'A2.3',
    promptFr: "Je vais t'aider.", prompt: 'Say it in English.',
    expectedPatterns: ["regex:\\b(i will|i'll)\\b", 'word:help'], timeLimitSeconds: 8,
  },
  {
    id: 'd29-speak1', type: 'speaking', grammar: ['future_will'], cefr: 'A2.3',
    prompt: 'Make a prediction about the weather, and a promise to a friend. Use "will" for both.',
    expectedPatterns: ["regex:\\b(will|'ll)\\b", 'regex:\\bi\\b'],
  },

  // ---------- DAY 30 — going to (plans) ----------
  {
    id: 'd30-ex1', type: 'fill_blank', grammar: ['future_going_to'], cefr: 'A2.3',
    prompt: "I ___ going to start a new job next month. (am/will)", expectedPatterns: ['word:am'], acceptableAnswers: ['am'],
  },
  {
    id: 'd30-ex2', type: 'fill_blank', grammar: ['future_going_to'], cefr: 'A2.3',
    prompt: 'Look at those clouds — it ___ going to rain. (is/will)', expectedPatterns: ['word:is'], acceptableAnswers: ['is'],
  },
  {
    id: 'd30-ex3', type: 'transformation', grammar: ['future_going_to'], cefr: 'A2.3',
    prompt: 'Build a sentence with: we / going to / travel / next year',
    expectedPatterns: ['word:going', 'word:travel'],
    acceptableAnswers: ["we are going to travel next year", "we're going to travel next year"],
  },
  {
    id: 'd30-reflex1', type: 'reflex', grammar: ['future_going_to'], cefr: 'A2.3',
    promptFr: 'Je vais commencer un nouveau travail le mois prochain.', prompt: 'Say it in English.',
    expectedPatterns: ['word:going', 'word:start', 'word:job'], timeLimitSeconds: 9,
  },
  {
    id: 'd30-reflex2', type: 'reflex', grammar: ['future_going_to'], cefr: 'A2.3',
    promptFr: 'Nous allons déménager l’année prochaine.', prompt: 'Say it in English.',
    expectedPatterns: ['word:going', 'word:move'], timeLimitSeconds: 9,
  },
  {
    id: 'd30-speak1', type: 'speaking', grammar: ['future_going_to'], cefr: 'A2.3',
    prompt: 'Talk about a plan you already have for next month. Use "going to".',
    expectedPatterns: ['word:going', 'regex:\\bi\\b'],
  },

  // ---------- DAY 31 — will vs going to ----------
  {
    id: 'd31-ex1', type: 'fill_blank', grammar: ['will_vs_going_to'], cefr: 'A2.3',
    prompt: "It's already booked — I ___ going to travel this summer. (am/will)", expectedPatterns: ['word:am'], acceptableAnswers: ['am'],
  },
  {
    id: 'd31-ex2', type: 'fill_blank', grammar: ['will_vs_going_to'], cefr: 'A2.3',
    prompt: "The phone is ringing — I ___ answer it. (will/am going to)", expectedPatterns: ['word:will'], acceptableAnswers: ['will'],
  },
  {
    id: 'd31-ex3', type: 'transformation', grammar: ['will_vs_going_to'], cefr: 'A2.3',
    prompt: 'Build a sentence with: OK / I / will / come / with you',
    expectedPatterns: ["regex:\\b(will|'ll)\\b", 'word:come'],
    acceptableAnswers: ['ok i will come with you', "ok i'll come with you"],
  },
  {
    id: 'd31-reflex1', type: 'reflex', grammar: ['will_vs_going_to'], cefr: 'A2.3',
    promptFr: "C'est déjà réservé, je vais voyager cet été.", prompt: 'Say it in English.',
    expectedPatterns: ['word:going', 'word:travel'], timeLimitSeconds: 9,
  },
  {
    id: 'd31-reflex2', type: 'reflex', grammar: ['will_vs_going_to'], cefr: 'A2.3',
    promptFr: "D'accord, je vais y réfléchir.", prompt: 'Say it in English.',
    expectedPatterns: ["regex:\\b(will|'ll)\\b", 'word:think'], timeLimitSeconds: 9,
  },
  {
    id: 'd31-speak1', type: 'speaking', grammar: ['will_vs_going_to'], cefr: 'A2.3',
    prompt: 'Say one already-planned thing (going to) and one decision you are making right now (will).',
    expectedPatterns: ['word:going', "regex:\\b(will|'ll)\\b"],
  },

  // ---------- DAY 32 — present continuous for future ----------
  {
    id: 'd32-ex1', type: 'fill_blank', grammar: ['present_continuous_future'], cefr: 'A2.3',
    prompt: "I ___ meeting a client tomorrow. (am/will)", expectedPatterns: ['word:am'], acceptableAnswers: ['am'],
  },
  {
    id: 'd32-ex2', type: 'fill_blank', grammar: ['present_continuous_future'], cefr: 'A2.3',
    prompt: 'She ___ flying to Paris on Monday. (is/will)', expectedPatterns: ['word:is'], acceptableAnswers: ['is'],
  },
  {
    id: 'd32-ex3', type: 'transformation', grammar: ['present_continuous_future'], cefr: 'A2.3',
    prompt: 'Build a sentence with: we / have / dinner / at 8',
    expectedPatterns: ['word:having', 'word:dinner'],
    acceptableAnswers: ['we are having dinner at 8', "we're having dinner at 8"],
  },
  {
    id: 'd32-reflex1', type: 'reflex', grammar: ['present_continuous_future'], cefr: 'A2.3',
    promptFr: 'Je rencontre un client demain.', prompt: 'Say it in English.',
    expectedPatterns: ['word:meeting', 'word:client', 'word:tomorrow'], timeLimitSeconds: 9,
  },
  {
    id: 'd32-reflex2', type: 'reflex', grammar: ['present_continuous_future'], cefr: 'A2.3',
    promptFr: 'Nous dînons à huit heures.', prompt: 'Say it in English.',
    expectedPatterns: ['word:having', 'word:dinner'], timeLimitSeconds: 9,
  },
  {
    id: 'd32-speak1', type: 'speaking', grammar: ['present_continuous_future'], cefr: 'A2.3',
    prompt: 'Talk about something already arranged in your calendar this week. Use the present continuous.',
    expectedPatterns: ['regex:\\w+ing\\b', 'regex:\\b(tomorrow|this week|on)\\b'],
  },

  // ---------- DAY 33 — may / might ----------
  {
    id: 'd33-ex1', type: 'fill_blank', grammar: ['modals_possibility'], cefr: 'A2.3',
    prompt: 'I ___ come to the party. (might/mights)', expectedPatterns: ['word:might'], acceptableAnswers: ['might'],
  },
  {
    id: 'd33-ex2', type: 'fill_blank', grammar: ['modals_possibility'], cefr: 'A2.3',
    prompt: 'It ___ rain later. (may/mays)', expectedPatterns: ['word:may'], acceptableAnswers: ['may'],
  },
  {
    id: 'd33-ex3', type: 'transformation', grammar: ['modals_possibility'], cefr: 'A2.3',
    prompt: 'Build a sentence with: she / might / not / be / ready',
    expectedPatterns: ['word:might', 'word:ready'],
    acceptableAnswers: ['she might not be ready'],
  },
  {
    id: 'd33-reflex1', type: 'reflex', grammar: ['modals_possibility'], cefr: 'A2.3',
    promptFr: 'Je viendrai peut-être à la fête.', prompt: 'Say it in English.',
    expectedPatterns: ['word:might', 'word:party'], timeLimitSeconds: 9,
  },
  {
    id: 'd33-reflex2', type: 'reflex', grammar: ['modals_possibility'], cefr: 'A2.3',
    promptFr: "Elle n'est peut-être pas prête.", prompt: 'Say it in English.',
    expectedPatterns: ['word:might', 'word:ready'], timeLimitSeconds: 9,
  },
  {
    id: 'd33-speak1', type: 'speaking', grammar: ['modals_possibility'], cefr: 'A2.3',
    prompt: 'Say two things that might happen this weekend, using "might" or "may".',
    expectedPatterns: ['regex:\\b(might|may)\\b'],
  },

  // ---------- DAY 34 — should (advice) ----------
  {
    id: 'd34-ex1', type: 'fill_blank', grammar: ['modals_advice'], cefr: 'A2.3',
    prompt: 'You ___ see a doctor. (should/shoulds)', expectedPatterns: ['word:should'], acceptableAnswers: ['should'],
  },
  {
    id: 'd34-ex2', type: 'fill_blank', grammar: ['modals_advice'], cefr: 'A2.3',
    prompt: 'We ___ leave now. (should/shoulds)', expectedPatterns: ['word:should'], acceptableAnswers: ['should'],
  },
  {
    id: 'd34-ex3', type: 'transformation', grammar: ['modals_advice'], cefr: 'A2.3',
    prompt: "Give advice (negative): you / work / so hard",
    expectedPatterns: ["regex:\\b(shouldn't|should not)\\b", 'word:work'],
    acceptableAnswers: ["you shouldn't work so hard", 'you should not work so hard'],
  },
  {
    id: 'd34-reflex1', type: 'reflex', grammar: ['modals_advice'], cefr: 'A2.3',
    promptFr: 'Tu devrais voir un médecin.', prompt: 'Say it in English.',
    expectedPatterns: ['word:should', 'word:doctor'], timeLimitSeconds: 8,
  },
  {
    id: 'd34-reflex2', type: 'reflex', grammar: ['modals_advice'], cefr: 'A2.3',
    promptFr: 'Nous devrions partir maintenant.', prompt: 'Say it in English.',
    expectedPatterns: ['word:should', 'word:leave'], timeLimitSeconds: 8,
  },
  {
    id: 'd34-speak1', type: 'speaking', grammar: ['modals_advice'], cefr: 'A2.3',
    prompt: 'Give someone two pieces of advice, using "should" and "shouldn\'t".',
    expectedPatterns: ["regex:\\b(should|shouldn't)\\b"],
  },
]

export const day35Boss: Exercise[] = [
  {
    id: 'd35-boss1', type: 'speaking',
    grammar: ['future_will', 'future_going_to', 'present_continuous_future', 'modals_possibility', 'modals_advice'],
    cefr: 'A2.3',
    prompt: 'Talk about your plans for next year: what you are going to do, something you might do, and a prediction.',
    // 5 required elements; 80% threshold => at least 4 of 5.
    expectedPatterns: [
      'word:going',
      "regex:\\b(will|'ll)\\b",
      'regex:\\b(might|may)\\b',
      'regex:\\b(next year|next month|soon)\\b',
      'regex:\\bi\\b',
    ],
    timeLimitSeconds: 60,
  },
]
