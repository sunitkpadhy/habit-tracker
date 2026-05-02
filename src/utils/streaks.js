import { todayKey, addDays } from './dates.js'

export function isCompletedToday(completions) {
  return completions.includes(todayKey())
}

export function currentStreak(completions) {
  if (!completions || completions.length === 0) return 0
  const set = new Set(completions)
  const today = todayKey()
  let cursor = set.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (set.has(cursor)) {
    streak++
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function longestStreak(completions) {
  if (!completions || completions.length === 0) return 0
  const sorted = [...new Set(completions)].sort()
  let longest = 1
  let run = 1
  for (let i = 1; i < sorted.length; i++) {
    if (addDays(sorted[i - 1], 1) === sorted[i]) {
      run++
      if (run > longest) longest = run
    } else {
      run = 1
    }
  }
  return longest
}
