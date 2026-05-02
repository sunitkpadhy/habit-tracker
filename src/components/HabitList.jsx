import HabitItem from './HabitItem.jsx'

export default function HabitList({ habits, onToggle, onRemove }) {
  if (habits.length === 0) {
    return (
      <div className="empty">
        <p>No habits yet. Add your first one above to get started.</p>
      </div>
    )
  }

  return (
    <ul className="habit-list">
      {habits.map((h) => (
        <HabitItem
          key={h.id}
          habit={h}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}
