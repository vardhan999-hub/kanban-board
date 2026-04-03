import { useState } from 'react'

const PRIORITY_COLORS = {
  High:   '#ef4444',
  Medium: '#f59e0b',
  Low:    '#22c55e',
}

export default function TaskInput({ onAdd }) {
  const [text, setText]         = useState('')
  const [priority, setPriority] = useState('Medium')

  function handleAdd() {
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, priority)
    setText('')
    setPriority('Medium')
  }

  return (
    <div className="task-input-bar">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleAdd()
          }
        }}
        placeholder="Type a task and press Enter…"
        aria-label="Task input"
      />

      <select
        className="priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ color: PRIORITY_COLORS[priority] }}
        aria-label="Select priority"
      >
        <option value="High"   style={{ color: '#ef4444', background: '#1e1e2e' }}>🔴 High</option>
        <option value="Medium" style={{ color: '#f59e0b', background: '#1e1e2e' }}>🟡 Medium</option>
        <option value="Low"    style={{ color: '#22c55e', background: '#1e1e2e' }}>🟢 Low</option>
      </select>

      <button
        className="add-btn"
        onClick={handleAdd}
        disabled={!text.trim()}
      >
        + Add Task
      </button>
    </div>
  )
}
