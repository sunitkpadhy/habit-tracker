import { lastNDays, shortLabel } from '../utils/dates.js'
import { currentStreak, isCompletedToday } from '../utils/streaks.js'

export default function HabitItem({ habit, onToggle, onRemove }) {
  const completedToday = isCompletedToday(habit.completions)
  const streak = currentStreak(habit.completions)
  const completionSet = new Set(habit.completions)
  const days = lastNDays(7)

  return (
    <li className={`habit ${completedToday ? 'habit--done' : ''}`}>
      <button
        type="button"
        className={`habit__check ${completedToday ? 'habit__check--on' : ''}`}
        onClick={() => onToggle(habit.id)}
        aria-label={completedToday ? 'Mark incomplete' : 'Mark complete'}
      >
        {completedToday ? '✓' : ''}
      </button>

      <div className="habit__body">
        <div className="habit__name">{habit.name}</div>
        <div className="habit__meta">
          <span className="habit__streak">
            {streak === 0
              ? 'No active streak'
              : `${streak} day${streak === 1 ? '' : 's'} streak`}
          </span>
          <div className="habit__week" aria-label="Last 7 days">
            {days.map((d) => (
              <span
                key={d}
                className={`habit__day ${
                  completionSet.has(d) ? 'habit__day--on' : ''
                }`}
                title={d}
              >
                <span className="habit__day-label">{shortLabel(d)[0]}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="habit__remove"
        onClick={() => onRemove(habit.id)}
        aria-label={`Delete ${habit.name}`}
        title="Delete habit"
      >
        ×
      </button>
    </li>
  )
}
