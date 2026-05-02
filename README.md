# Habit Tracker

A small React + Vite app for tracking daily habits. Habits are stored in the
browser's `localStorage`, so the app runs entirely client-side with no backend.

## Features

- Add and remove habits
- Toggle today's completion with one click
- Dashboard with totals, today's progress, and current/longest streaks per habit
- Data persisted to `localStorage` (key: `habits.v1`)

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically http://localhost:5173).

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — produce a production build in `dist/`
- `npm run preview` — preview the production build locally

## Project structure

```
src/
  App.jsx              # Top-level layout, tab switching
  main.jsx             # React entry point
  components/
    Dashboard.jsx      # Stats, progress bar, per-habit summary table
    HabitForm.jsx      # Add-habit input
    HabitList.jsx      # Today's habits list
    HabitItem.jsx      # Single habit row with toggle/remove
  hooks/
    useHabits.js       # State + localStorage persistence
  utils/
    dates.js           # Today/date-key helpers
    streaks.js         # Current/longest streak calculations
```

## Tech

React 18, Vite 5, plain CSS. No external state library — habit state lives in
`useHabits` and is persisted via a `useEffect` write to `localStorage`.
