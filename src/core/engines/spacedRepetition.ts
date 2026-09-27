// Spaced repetition schedule, in hours, indexed by intervalStep.
// immediate -> later same day -> next day -> 3d -> 7d -> 14d -> 30d -> 60d (stable)
const SCHEDULE_HOURS = [0, 4, 24, 72, 168, 336, 720, 1440]

export function nextReviewDate(intervalStep: number, correct: boolean, fromTimestamp = Date.now()): {
  nextReviewDue: number
  intervalStep: number
} {
  let step = intervalStep
  if (correct) {
    step = Math.min(step + 1, SCHEDULE_HOURS.length - 1)
  } else {
    // Failure resets progress but not all the way to zero — avoids punishing
    // a single slip on an otherwise well-retained concept too harshly.
    step = Math.max(0, step - 2)
  }
  const hours = SCHEDULE_HOURS[step]
  return {
    nextReviewDue: fromTimestamp + hours * 3600 * 1000,
    intervalStep: step,
  }
}

export function isDue(nextReviewDue: number, now = Date.now()): boolean {
  return nextReviewDue <= now
}
