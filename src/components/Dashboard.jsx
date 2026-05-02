import {
  currentStreak,
  longestStreak,
  isCompletedToday,
} from '../utils/streaks.js'

export default function Dashboard({ habits }) {
  const total = habits.length
  const completedToday = habits.filter((h) =>
    isCompletedToday(h.completions),
  ).length
  const percent = total === 0 ? 0 : Math.round((completedToday / total) * 100)
  const longestActive = habits.reduce(
    (max, h) => Math.max(max, currentStreak(h.completions)),
    0,
  )

  if (total === 0) {
    return (
      <div className="empty">
        <p>No habits yet. Add habits on the Today tab to see your dashboard.</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="cards">
        <div className="card">
          <div className="card__label">Total habits</div>
          <div className="card__value">{total}</div>
        </div>
        <div className="card">
          <div className="card__label">Completed today</div>
          <div className="card__value">
            {completedToday} <span className="card__sub">/ {total}</span>
          </div>
        </div>
        <div className="card">
          <div className="card__label">Longest active streak</div>
          <div className="card__value">
            {longestActive} <span className="card__sub">days</span>
          </div>
        </div>
      </div>

      <div className="progress">
        <div className="progress__label">
          Today's progress · {percent}%
        </div>
        <div className="progress__bar">
          <div
            className="progress__fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <table className="summary">
        <thead>
          <tr>
            <th>Habit</th>
            <th>Today</th>
            <th>Current</th>
            <th>Longest</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((h) => {
            const done = isCompletedToday(h.completions)
            return (
              <tr key={h.id}>
                <td>{h.name}</td>
                <td className={done ? 'cell--done' : 'cell--pending'}>
                  {done ? '✓' : '—'}
                </td>
                <td>{currentStreak(h.completions)}</td>
                <td>{longestStreak(h.completions)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
