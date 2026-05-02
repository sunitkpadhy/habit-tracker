import { useState } from 'react'

export default function HabitForm({ onAdd }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        className="habit-form__input"
        type="text"
        placeholder="Add a new habit (e.g. Drink water)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={80}
      />
      <button className="habit-form__btn" type="submit" disabled={!value.trim()}>
        Add
      </button>
    </form>
  )
}
