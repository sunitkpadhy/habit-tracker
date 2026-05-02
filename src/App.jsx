import { useState } from 'react'
import { useHabits } from './hooks/useHabits.js'
import HabitForm from './components/HabitForm.jsx'
import HabitList from './components/HabitList.jsx'
import Dashboard from './components/Dashboard.jsx'
import './App.css'

export default function App() {
  const { habits, addHabit, removeHabit, toggleToday } = useHabits()
  const [tab, setTab] = useState('today')

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Habit Tracker</h1>
        <nav className="tabs">
          <button
            className={`tab ${tab === 'today' ? 'tab--active' : ''}`}
            onClick={() => setTab('today')}
          >
            Today
          </button>
          <button
            className={`tab ${tab === 'dashboard' ? 'tab--active' : ''}`}
            onClick={() => setTab('dashboard')}
          >
            Dashboard
          </button>
        </nav>
      </header>

      <main className="app__main">
        {tab === 'today' ? (
          <>
            <HabitForm onAdd={addHabit} />
            <HabitList
              habits={habits}
              onToggle={toggleToday}
              onRemove={removeHabit}
            />
          </>
        ) : (
          <Dashboard habits={habits} />
        )}
      </main>
    </div>
  )
}
