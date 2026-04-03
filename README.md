🧩 Kanban Task Board

A modern and interactive Kanban Task Management App built using React + Vite.
This application helps users organize tasks visually and efficiently using a drag-and-drop workflow.

---

🚀 Live Demo

👉 https://kanban-board-six-liard.vercel.app/

📂 Source Code

👉 https://github.com/vardhan999-hub/kanban-board

---

✨ Features

- 📝 Add tasks with priority (High / Medium / Low)
- ✏️ Inline editing (click on task to edit)
- 🗂️ Organize tasks into:
  - To Do
  - In Progress
  - Done
- 🔄 Drag & Drop between columns (native HTML5 API)
- ❌ Delete tasks instantly
- 💾 Auto-save using localStorage (persists after refresh)
- 🎯 Priority-based visual styling
- ⌨️ Keyboard accessibility support
- 📱 Fully responsive design

---

🧠 Tech Stack

- Frontend: React (Hooks-based architecture)
- Build Tool: Vite
- Styling: Custom CSS
- State Management: useState, useEffect, useCallback
- Storage: Browser localStorage

---

📁 Project Structure

kanban-board/
│
├── src/
│   ├── components/
│   │   ├── Column.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskInput.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md

---

⚙️ Installation & Setup

Clone the repository:

git clone https://github.com/vardhan999-hub/kanban-board.git
cd kanban-board

Install dependencies:

npm install

Run the development server:

npm run dev

Open in browser:

http://localhost:5173

---

🧩 How It Works

A Kanban board is a visual workflow management tool where tasks move across stages like:

To Do → In Progress → Done

- Tasks are stored as "[[], [], []]"
- Each array represents one column
- Drag-and-drop moves tasks between columns
- State updates follow immutable patterns
- Data is persisted using localStorage

---

💡 Key Learnings

- Component-based architecture in React
- Managing complex state across multiple components
- Implementing drag-and-drop without external libraries
- Optimizing performance using React hooks
- Handling edge cases and data validation
- Improving accessibility with keyboard support

---

🔥 Highlights

- No external drag-and-drop library used
- Clean UI with smooth interactions
- Real-world task workflow simulation
- Strong focus on performance and UX
- Interview-ready project

---

📌 Future Improvements

- 🔍 Search & filter tasks
- 📅 Add due dates
- 🌙 Dark / Light mode toggle
- ☁️ Backend integration (MongoDB / Firebase)
- 🔐 User authentication

---

👨‍💻 Author

Tadigadapa Harshavardhan


Frontend Developer | React Enthusiast

---

📄 License

This project is open-source and free to use.

---
