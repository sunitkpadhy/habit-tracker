# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (default http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally

There is no test runner, linter, or formatter configured in this repo. Don't invent `npm test` or `npm run lint`.

## Architecture

Single-page React 18 + Vite app for tracking daily habits. Entirely client-side — no backend, no router, no state library.

**State flow.** `src/hooks/useHabits.js` is the single source of truth. `App.jsx` calls `useHabits()` once and threads `habits`, `addHabit`, `removeHabit`, `toggleToday` down to the form/list/dashboard components. There is no context, redux, or prop-drilling helper — keep new state in this hook unless there's a reason not to.

**Persistence.** `useHabits` reads `localStorage['habits.v1']` lazily on mount and writes the full habits array on every change via `useEffect`. The `.v1` suffix is intentional — if the habit shape changes incompatibly, bump to `habits.v2` and migrate, don't silently break existing users' data. Each habit is `{ id, name, createdAt, completions: string[] }` where completions are date keys.

**Date handling.** All dates are stored and compared as `YYYY-MM-DD` strings (`utils/dates.js`), never as `Date` objects or timestamps. This is deliberate: it sidesteps timezone/DST bugs that bite when comparing "is this completion from today?" across midnight. When adding date logic, go through `dateKey`, `todayKey`, and `addDays` rather than constructing `Date`s directly. Streak math in `utils/streaks.js` walks day-by-day using `addDays(key, -1)` and string equality on a `Set` — preserve this pattern.

**Tabs.** `App.jsx` switches between "Today" (form + list) and "Dashboard" (stats) via local `useState`. No URL routing.

## Conventions

- ES modules with `.jsx` for components, `.js` for hooks/utils. Imports include explicit extensions (`./useHabits.js`) — Vite is configured to require this; don't strip them.
- Plain CSS in `src/App.css` using BEM-ish class names (`app__header`, `card__label`, `tab--active`). No CSS modules or Tailwind.
- IDs come from `crypto.randomUUID()` with a `Date.now()`-based fallback in `useHabits.js`.

## Platform note

Primary dev environment is Windows + PowerShell. `npm` scripts work the same; just be aware that shell-piping examples written for bash may need PowerShell-equivalent syntax.
