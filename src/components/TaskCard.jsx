import { useState, useEffect, useRef } from 'react'

const COLUMNS = ['To Do', 'In Progress', 'Done']

const PRIORITY = {
  High:   { border: '#ef4444', bg: 'rgba(239,68,68,0.07)',  badge: '#ef4444' },
  Medium: { border: '#f59e0b', bg: 'rgba(245,158,11,0.07)', badge: '#f59e0b' },
  Low:    { border: '#22c55e', bg: 'rgba(34,197,94,0.07)',  badge: '#22c55e' },
}

export default function TaskCard({
  task,
  colIndex,
  totalCols,
  onDelete,
  onMove,
  onEdit,
  onDragStart,
  onDragEnd,
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState(task.text || '')
  const inputRef              = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const p = PRIORITY[task.priority] || PRIORITY['Medium']

  function saveEdit() {
    const trimmed = draft.trim()
    if (!trimmed) {
      setDraft(task.text)
    } else if (trimmed !== task.text) {
      onEdit(task.id, trimmed)
    }
    setEditing(false)
  }

  return (
    <div
      draggable={!editing}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move'
        e.currentTarget.classList.add('dragging')
        onDragStart(task.id, colIndex)
      }}
      onDragEnd={(e) => {
        e.currentTarget.classList.remove('dragging')
        onDragEnd?.()
      }}
      className="task-card"
      style={{
        background: p.bg,
        border: `2px solid ${p.border}`,
        boxShadow: `0 2px 8px ${p.border}33`,
      }}
    >
      <span
        className="priority-badge"
        style={{
          color: p.badge,
          background: `${p.badge}18`,
          border: `1px solid ${p.badge}55`,
        }}
      >
        {task.priority || 'Medium'}
      </span>

      {editing ? (
        <input
          ref={inputRef}
          className="task-edit-input"
          value={draft}
          style={{ borderBottomColor: p.border }}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit()
            if (e.key === 'Escape') {
              setDraft(task.text)
              setEditing(false)
            }
          }}
        />
      ) : (
        <p
          className="task-text"
          tabIndex={0}
          onClick={() => {
            setDraft(task.text)
            setEditing(true)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setDraft(task.text)
              setEditing(true)
            }
          }}
        >
          {task.text}
        </p>
      )}

      <div className="task-actions">
        {colIndex > 0 && (
          <button
            className="task-btn"
            onClick={() => onMove(task.id, colIndex, colIndex - 1)}
          >
            ← {COLUMNS[colIndex - 1]}
          </button>
        )}

        {colIndex < totalCols - 1 && (
          <button
            className="task-btn"
            onClick={() => onMove(task.id, colIndex, colIndex + 1)}
          >
            {COLUMNS[colIndex + 1]} →
          </button>
        )}

        <button
          className="task-btn delete"
          onClick={() => onDelete(task.id, colIndex)}
        >
          ✕ Delete
        </button>
      </div>
    </div>
  )
}
