import { useEffect, useState } from 'react'
import { todayKey } from '../utils/dates.js'

const STORAGE_KEY = 'habits.v1'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `h_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function useHabits() {
  const [habits, setHabits] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  function addHabit(name) {
    const trimmed = name.trim()
    if (!trimmed) return
    const today = todayKey()
    setHabits((prev) => [
      ...prev,
      {
        id: makeId(),
        name: trimmed,
        createdAt: today,
        completions: [],
      },
    ])
  }

  function removeHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id))
  }

  function toggleToday(id) {
    const today = todayKey()
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h
        const has = h.completions.includes(today)
        return {
          ...h,
          completions: has
            ? h.completions.filter((d) => d !== today)
            : [...h.completions, today],
        }
      }),
    )
  }

  return { habits, addHabit, removeHabit, toggleToday }
}
