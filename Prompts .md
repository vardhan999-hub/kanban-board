Prompts.md

Project: Kanban Task Board
Week: 5 | Level: Intermediate + Advanced Partial (Level 2 + Level 3)
Intern: Tadigadapa Harshavardhan


Overview

This document captures the key prompts I used while building this project, along with the reasoning, improvements, and concepts I learned at each stage.

The goal was not just to generate code, but to understand decisions, test edge cases, and refine implementation quality.


Prompt 1 — Planning the project structure

«"How should I structure a React Kanban board project using Vite? What files and folders do I need?"»

I designed the app using a component-based architecture:

- "App.jsx" → manages global state
- "Column.jsx" → handles each column
- "TaskCard.jsx" → handles individual tasks
- "TaskInput.jsx" → handles task creation

This separation improved readability, scalability, and debugging.


Prompt 2 — Managing state across columns

«"How do I manage tasks across multiple columns in React using useState?"»

I structured the state as:

[[], [], []]

Each array represents a column.

Key learnings:

- Avoid direct mutation
- Use spread operators and ".map()"
- Add safety checks ("idx === -1") to prevent crashes


Prompt 3 — Optimising re-renders with useCallback

«"When should I use useCallback in React?"»

I wrapped all handlers:

- addTask
- deleteTask
- moveTask
- editTask
- drag handlers

This reduced unnecessary re-renders in child components and improved performance.


Prompt 4 — Persisting data with localStorage

«"How do I persist React state using localStorage?"»

Implementation:

- Lazy initialization inside "useState"
- "useEffect" for syncing state

Improvements:

- Added "try/catch" for safety
- Validated structure using:
  Array.isArray(saved) && saved.length === 3

This prevents corrupted data from breaking the app.


Prompt 5 — Inline editing

«"How do I toggle between text and input in React?"»

Solution:

- "editing" state inside "TaskCard"
- "useRef" for auto-focus
- Controlled input

Handled:

- Enter → save
- Escape → cancel
- Blur → auto-save

Also prevented empty updates.


Prompt 6 — Priority system

«"How do I style components dynamically based on props?"»

Created a "PRIORITY" config object:

- High → Red
- Medium → Yellow
- Low → Green

Used fallback:

PRIORITY[task.priority] || PRIORITY['Medium']

This prevents runtime errors from invalid data.


Prompt 7 — Drag and drop (no library)

«"How to implement drag and drop using native APIs?"»

Used:

- "onDragStart"
- "onDragOver"
- "onDragLeave"
- "onDrop"

Key decisions:

- Stored drag state in "useRef" (no re-renders)
- Disabled drag during editing
- Fixed flickering using:
  e.currentTarget.contains(e.relatedTarget)


Prompt 8 — Accessibility improvements

«"How to make React components keyboard accessible?"»

Added:

- "tabIndex={0}"
- "onKeyDown" for Enter actions
- "role="region"" for columns
- "role="article"" for cards
- "aria-label" for inputs

This improves usability for keyboard and screen reader users.


Independent Improvements

Without prompting, I implemented:

- Validation for localStorage data
- Use of "??" instead of "||" where appropriate
- Disabled empty task submission
- "preventDefault()" on Enter key
- "useRef" for drag state (performance optimization)
- Dark mode optimization using "color-scheme"
- Added project metadata ("keywords", "homepage")
- Ensured correct deployment with "base: '/'"
- Added drag cleanup ("handleDragEnd")

Key Learnings

- Component-based architecture in React
- Importance of immutable state updates
- Performance optimization using hooks
- Working with browser APIs (Drag & Drop)
- Defensive programming for real-world apps
- Accessibility fundamentals in UI design


Final Reflection

This project was built with a strong focus on understanding over memorization.

Every feature was:

- Tested manually
- Improved iteratively
- Validated against edge cases

Rather than copying solutions, I focused on why each approach works, which helped me build confidence in writing scalable and maintainable React code.
