# SAGEQUEST

> 90 days to make English automatic.

A speaking-first English training PWA. Not a chatbot, not a flashcard app, not an
AI tutor — a deterministic, rule-based system that drills grammar reflexes, verb
mastery, and spoken production through a structured 90-day program.

This build implements **Days 1–35** (Weeks 1–5: Survival English, Daily Life, The Past, Events & Stories, Future — each ending in a Boss) end to end, on an architecture designed to scale to the full 90 days without
touching the engine — see `PHASES.md` for what's built and what's next.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (design tokens in `src/styles/tokens.css`)
- Zustand for app state
- IndexedDB (via `idb`) for offline-first local storage — no backend, no account
- `vite-plugin-pwa` for the service worker / installable app
- Web Speech API for recording + live transcription, with a typed-input fallback
  when unsupported
- **No AI/LLM API calls anywhere.** Correction is rule-based pattern matching
  (`src/core/engines/correction.ts`).

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
npm run lint       # oxlint
```

## Project structure

```
src/
  core/            # types + deterministic engines (mastery, XP, spaced repetition, correction)
  content/         # all learning content — grammar, verbs, vocab, missions, exercises.
                   # Adding Day 8-90 means adding files here, not touching the engine.
  lib/             # IndexedDB layer + Zustand store wiring content <-> engines <-> UI
  components/      # shared UI: Layout (nav), ExercisePlayer, SpeechRecorder
  screens/         # Onboarding, PlacementTest, Home, Journey, Train, Progress, Profile, MissionRunner
```

## What's implemented (MVP scope)

- Onboarding + placement test → estimated CEFR + skill breakdown
- Daily Mission loop: Warm-up → Grammar Reflex → Vocabulary → Speaking →
  Correction → Review, matching the LEARN → RECALL → SPEAK → CORRECT → RETRY →
  REVIEW → MASTER loop
- Day 7 Boss ("introduce yourself for 60 seconds")
- Grammar/verb/vocab content for Week 1 (pronouns, be, have, present simple,
  articles, plurals, there is/are, questions, negatives)
- Mastery engine: accuracy + speed + retention + context variation → a single
  mastery score per concept, with five statuses (unseen → learning → developing
  → known → mastered)
- Spaced repetition scheduler feeding the daily Review section
- XP + 7-tier rank system (ROOKIE → MASTER), separate from CEFR
- Progress dashboard: skills, strong/weak concepts, per-concept mastery detail,
  recurring errors
- Bonus training modes: Reflex Rush, Speaking Challenge, Verb Attack (Career /
  Cloud & IT / Client / Conference / Travel tracks are visible but locked —
  they unlock with later weeks' content)
- Offline-first PWA: installable, service worker precaches the app shell, all
  user data lives in IndexedDB on-device

## What's not built yet

Days 8–90 of content, speaking-track content (Career/Cloud/Client/Conference/
Travel), pronunciation-specific drills (TH/R/W/V/H, stress, linking), idiom
scenario mode, and audio playback controls (normal/slow/very slow) — the data
models for all of these already exist in `src/core/types.ts`; they need content
authored into `src/content/` and, where relevant, a screen wired to it.
