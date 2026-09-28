# Build phases — status

Per the master spec's development strategy (phased build, verify after each phase).

| Phase | Scope | Status |
|---|---|---|
| 1 | Architecture + project setup | ✅ Done |
| 2 | Design system + navigation | ✅ Done |
| 3 | Content engine | ✅ Done (Week 1 content authored; engine supports 90 days) |
| 4 | Progression + mastery | ✅ Done |
| 5 | Daily Mission | ✅ Done |
| 6 | English Reflex | ✅ Done |
| 7 | Speaking | ✅ Done (Web Speech API + typed fallback) |
| 8 | Placement Test | ✅ Done |
| 9 | Boss system | ✅ Done (Day 7 boss; weekly boss pattern established) |
| 10 | Offline/PWA | ✅ Done (service worker, manifest, IndexedDB) — not yet tested on a real device |
| 11 | Content expansion (Days 8–90) | 🟡 Days 1–21 done (Weeks 1–3 + 3 bosses); Days 22–90 not started |
| 12 | QA + polish | 🟡 Build/typecheck/lint clean; no in-browser manual QA pass yet |

## Verified this session

- `npm run build` — clean, no errors
- `npx tsc --noEmit` — clean
- `npm run lint` (oxlint) — 0 warnings, 0 errors
- Production build served via `vite preview`; index.html, manifest, service
  worker, and both PWA icons all return 200
- Content integrity script confirms every mission's exercise/grammar/vocabulary
  references resolve to real content entries (no dangling IDs)

## Known gaps to close before calling this "QA'd"

- No in-browser manual pass yet (no headless browser available in this
  environment to automate it) — recommend clicking through Onboarding →
  Placement → Day 1 → Day 7 Boss on a real device/browser before shipping
- Speech recognition behavior varies significantly by browser (Chrome supports
  it well; Firefox/Safari support is inconsistent) — the typed-input fallback
  path should be spot-checked too
- No automated tests yet (unit tests for the mastery/XP/spaced-repetition
  engines would be cheap and high-value — they're pure functions)

## QA script

`npx tsx scripts/qa.mts` checks content references, runs a model answer through every
reflex/speaking/boss exercise (must pass), runs known-wrong answers (must fail), and tests
the speech-transcript merge and the unlock gating. Run it after adding any content.

## Installing the PWA

- Needs HTTPS (or localhost). `http://192.168.x.x` will not offer installation.
- The service worker only exists in a production build: `npm run build && npm run preview`,
  not `npm run dev`.
- Chrome / Edge / Samsung Internet: Profile > Install, or the browser menu > Install app.
- iOS: Safari only, Share > Add to Home Screen.
