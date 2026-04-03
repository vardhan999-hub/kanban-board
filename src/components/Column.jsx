import { useState } from 'react'
import TaskCard from './TaskCard'

const ACCENT = ['#6366f1', '#f59e0b', '#22c55e']

export default function Column({
  title,
  colIndex,
  tasks = [],
  totalCols,
  onDelete,
  onMove,
  onEdit,
  onDragStart,
  onDragEnd,
  onDrop,
}) {
  const [over, setOver] = useState(false)
  const accent = ACCENT[colIndex]

  return (
    <div
      role="region"
      aria-label={`${title} column`}
      className={`column${over ? ' drag-over' : ''}`}
      style={{ borderColor: over ? accent : 'rgba(255,255,255,0.08)' }}
      onDragOver={(e) => {
        e.preventDefault()
        if (!over) setOver(true)
      }}
      onDragLeave={(e) => {
        const related = e.relatedTarget
        if (!related || !e.currentTarget.contains(related)) {
          setOver(false)
        }
      }}
      onDrop={(e) => {
        e.preventDefault()
        setOver(false)
        onDrop(colIndex)
      }}
    >
      <div className="column-header">
        <div className="column-dot" style={{ background: accent }} />
        <h3>{title}</h3>
        <span
          className="column-count"
          style={{
            background: `${accent}22`,
            color: accent,
            border: `1px solid ${accent}55`,
          }}
        >
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 && (
        <div className="column-empty">Drop tasks here</div>
      )}

      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          colIndex={colIndex}
          totalCols={totalCols}
          onDelete={onDelete}
          onMove={onMove}
          onEdit={onEdit}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  )
}
