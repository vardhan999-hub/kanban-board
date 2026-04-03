import { useState, useEffect, useRef, useCallback } from 'react'
import Column from './components/Column'
import TaskInput from './components/TaskInput'

export const COLUMNS = ['To Do', 'In Progress', 'Done']

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export default function App() {
  const [columns, setColumns] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('kanban_v2'))
      return Array.isArray(saved) && saved.length === 3 ? saved : [[], [], []]
    } catch {
      return [[], [], []]
    }
  })

  const dragRef = useRef({ taskId: null, fromCol: null })

  useEffect(() => {
    try {
      localStorage.setItem('kanban_v2', JSON.stringify(columns))
    } catch (err) {
      console.warn('localStorage failed:', err)
    }
  }, [columns])

  const addTask = useCallback((text, priority) => {
    if (!text?.trim()) return
    const task = { id: uid(), text: text.trim(), priority }
    setColumns(cols => {
      const next = [...cols]
      next[0] = [task, ...cols[0]]
      return next
    })
  }, [])

  const deleteTask = useCallback((taskId, colIndex) => {
    setColumns(cols => {
      const filtered = cols[colIndex].filter(t => t.id !== taskId)
      if (filtered.length === cols[colIndex].length) return cols
      const next = [...cols]
      next[colIndex] = filtered
      return next
    })
  }, [])

  const moveTask = useCallback((taskId, fromCol, toCol) => {
    if (fromCol === toCol) return
    setColumns(cols => {
      const fromList = cols[fromCol]
      const idx = fromList.findIndex(t => t.id === taskId)
      if (idx === -1) return cols
      const task = fromList[idx]
      const next = [...cols]
      next[fromCol] = [...fromList.slice(0, idx), ...fromList.slice(idx + 1)]
      next[toCol] = [task, ...cols[toCol]]
      return next
    })
  }, [])

  const editTask = useCallback((taskId, newText) => {
    const trimmed = newText?.trim()
    if (!trimmed) return
    setColumns(cols => {
      let changed = false
      const next = cols.map(col =>
        col.map(t => {
          if (t.id !== taskId) return t
          changed = true
          return { ...t, text: trimmed }
        })
      )
      return changed ? next : cols
    })
  }, [])

  const handleDragStart = useCallback((taskId, fromCol) => {
    dragRef.current = { taskId, fromCol }
  }, [])

  const handleDrop = useCallback((toCol) => {
    const { taskId, fromCol } = dragRef.current
    if (taskId == null || fromCol == null) return
    moveTask(taskId, fromCol, toCol)
    dragRef.current = { taskId: null, fromCol: null }
  }, [moveTask])

  const handleDragEnd = useCallback(() => {
    dragRef.current = { taskId: null, fromCol: null }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban Board</h1>
        <p>Drag cards · Click text to edit · Auto-saved on refresh</p>
      </header>

      <TaskInput onAdd={addTask} />

      <div className="board">
        {COLUMNS.map((title, i) => (
          <Column
            key={title}
            title={title}
            colIndex={i}
            tasks={columns[i] ?? []}
            totalCols={COLUMNS.length}
            onDelete={deleteTask}
            onMove={moveTask}
            onEdit={editTask}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  )
}
