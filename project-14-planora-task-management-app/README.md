<div align="center">

<img src="./public/dark-logo.png" alt="Planora Logo" width="80" />

# Planora

## Built by Mohamed Fayed

### Advanced Task & Project Management Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Planora** is a full-stack, real-time task and project management web application. It enables individuals and teams to plan, prioritize, collaborate, and track work with granular access control, insightful statistics, and a beautiful, fully responsive UI.

[🚀 Live Demo](https://planora-fayed.netlify.app/) · [🐛 Report Bug](https://github.com/Fayed12/planora-task-management-app/issues) · [💡 Request Feature](https://github.com/Fayed12/planora-task-management-app/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Data Models](#-data-models)
- [State Management](#-state-management)
- [Routing Architecture](#-routing-architecture)
- [Responsive Design](#-responsive-design)
- [Firebase Integration](#-firebase-integration)
- [Available Scripts](#-available-scripts)
- [Author](#-author)

---

## 🧭 Overview

Planora is a SaaS-ready task management platform built to handle the full complexity of collaborative work. Users can create and manage tasks and projects, invite collaborators with granular role-based access (Owner, Editor, Viewer), organize work by category, and track progress through rich statistical dashboards and an interactive calendar view.

All data is **real-time** — changes made by collaborators instantly propagate to all active sessions via Firebase `onSnapshot` listeners, making Planora suitable for team environments.

---

## ✨ Features

### 🔐 Authentication & User Management
- **Email/Password** sign-up and sign-in via **Firebase Authentication**
- Persistent user sessions managed by Firebase
- Protected routes — unauthenticated users are redirected to the landing page
- Global user profile with editable name and email
- Slide-in profile side-panel accessible from any page

### ✅ Task Management
- **Full CRUD** — Create, read, update, and delete tasks
- **Rich task fields:**
  - Title, Description
  - Priority (`low`, `medium`, `high`, `critical`)
  - Due Date with a date picker
  - Category (user-defined)
  - Privacy (`public` / `private`)
  - Completion status (auto-toggled when due date passes)
- **Role-based access control (RBAC):**
  - `Owner` — full control including delete
  - `Editor` — can edit task details
  - `Viewer` — read-only access
- Invite collaborators by email address
- **Smart sorting** — incomplete tasks sorted by due date (soonest first); completed tasks move to the bottom automatically
- **Auto-completion** — tasks past their due date are automatically marked complete
- **Privacy enforcement** — private tasks automatically have their shared-access list cleared

### 📁 Project Management
- **Full CRUD** for projects with the same rich field set as tasks
- Link multiple tasks to a project via multi-select
- **Progress tracking** — projects have a manual progress percentage that triggers auto-completion at 100%
- Role-based access control matching the task model
- **Radial progress chart** per project
- Auto-mark complete when due date is exceeded

### 🗓️ Interactive Calendar
- Full **monthly calendar grid** view
- All tasks and projects visualised on their due date
- Color-coded priority indicators (flag icon per item)
- Completion status icon per item
- Click any day to open a full detail modal
- **Mobile-optimised "heat map" view** on small screens — text hides, only priority/status icons remain

### 📊 Statistics Dashboard
- **Task statistics page** — Pie chart (completion ratio), Bar chart (priority distribution), Horizontal bar chart (by category), Line chart (tasks over time)
- **Project statistics page** — Pie chart (completion ratio), Bar chart (progress distribution), Radial chart (average completion)
- **KPI overview cards** — total, completed, overdue, active counts
- **Recharts**-powered charts with themed tooltips

### 🗂️ Category Management
- Create, view, update, and delete custom task categories
- Star-rating system per category (1–5 stars)
- Custom search and star-filter bar
- Categories available as a dropdown field when creating tasks

### 🎨 Theming
- **Dark / Light mode** toggle persisted in Redux state
- All colors driven by **CSS custom properties** (root variables)
- Smooth theme transition — no flash on page reload

### 📡 Offline Detection
- Dedicated **Offline page** rendered when network connectivity is lost
- Seamlessly restores the app when the connection is re-established

### 🌐 Responsive Design
- Fully optimised for all screen sizes:
  - `≤ 1200px` — columns condense, chart grids collapse
  - `≤ 992px` — padding reduced, modals adjust width, filterBar wraps
  - `≤ 768px` — headers stack vertically, grid cards go single column
  - `≤ 500px` — full-width buttons, full-screen modals, heat-map calendar

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19 |
| **Build Tool** | Vite 7 |
| **State Management** | Redux Toolkit 2 + React-Redux 9 |
| **Routing** | React Router 7 |
| **Backend / Database** | Firebase Firestore (NoSQL, real-time) |
| **Authentication** | Firebase Authentication |
| **Charts** | Recharts 3 |
| **UI Components** | Material UI (MUI) 7 |
| **Forms** | React Hook Form 7 |
| **Date Utilities** | date-fns 4 |
| **Notifications** | React Hot Toast + SweetAlert2 |
| **Icons** | React Icons 5 |
| **Select Inputs** | React Select 5 |
| **Styling** | Vanilla CSS Modules + CSS Custom Properties |
| **HTTP Client** | Axios |
| **Utilities** | Lodash |

---

## 📁 Project Structure

```
src/
├── App.jsx                   # Root component: auth listener, data subscriptions, theme, offline detection
├── main.jsx                  # Entry point — wraps app in Redux Provider + Router
├── index.css                 # Global CSS variables (design tokens), reset, dark/light themes
│
├── Redux/                    # Global state management
│   ├── store.js              # Redux store configuration
│   ├── authUserSlice.js      # User authentication state
│   ├── tasksSlice.js         # Tasks data state
│   ├── projectsSlice.js      # Projects data state
│   ├── categoriesSlice.js    # Categories data state
│   └── themeSlice.js         # Light/Dark theme state
│
├── firebase/                 # Firebase utilities
│   ├── firebaseConfig.js     # Firebase initialisation & exports (auth, db)
│   ├── addNewData.js         # Generic Firestore add document helper
│   ├── updateExistingData.js # Generic Firestore update document helper
│   ├── deleteDocument.js     # Generic Firestore delete document helper
│   └── auth/                 # Authentication service functions (login, register, logout)
│
├── pages/
│   ├── Landing-Page/         # Public marketing/hero landing page
│   ├── authentication/       # Login & Register pages
│   ├── Home-Page/            # Dashboard home with summary widgets
│   ├── Tasks-Page/           # Tasks overview with charts
│   ├── TaskManagement-Page/  # Full task CRUD management (grid/list view)
│   ├── Projects-Page/        # Projects overview with charts
│   ├── ProjectsManagement-Page/ # Full project CRUD management (grid/list view)
│   ├── Statistics-Page/      # Aggregated KPI cards and charts
│   ├── Calendar-Page/        # Monthly calendar view
│   ├── categories-page/      # Category management
│   ├── offline-page/         # Network offline fallback
│   ├── Loading-Page/         # Auth loading skeleton
│   └── Error-Page/           # 404 / Route error fallback
│
├── components/
│   ├── header/               # App top navigation bar
│   ├── sideBar/              # Sidebar navigation
│   ├── footer/               # App footer
│   ├── task-card/            # Reusable task card (grid/list)
│   ├── task-details/         # Task detail modal (view/edit)
│   ├── projects/
│   │   ├── project-card/     # Reusable project card
│   │   └── project-details/  # Project detail modal (view/edit)
│   ├── create-edit-new-item/ # Shared create/edit modal form (Tasks & Projects)
│   ├── charts/               # All Recharts chart components
│   ├── filterBar/            # Search + filter bar component
│   ├── Pagination-footer/    # Pagination controls
│   ├── empty-box/            # Empty state placeholder
│   ├── actions-buttons/      # Info / Edit / Delete action button group
│   ├── categories/           # Category card and detail components
│   ├── use-profile/          # Profile side popup
│   ├── Date-Time-Picker/     # Wrapped react-datepicker
│   └── select-meu/           # Wrapped react-select
│
├── hooks/                    # Custom React hooks
│   ├── confirm.js            # SweetAlert2 confirmation dialog hook
│   └── userUserRole.js       # Hook to derive the current user's role on a resource
│
├── layouts/                  # Route layout wrappers (with/without sidebar)
├── router/                   # Route definitions
├── services/statistics/      # Statistics computation helpers
└── ui/button/                # MainButton reusable UI component
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** `>= 18.x` — [Download](https://nodejs.org)
- **npm** `>= 9.x` (bundled with Node.js)
- A **Firebase** project — [Create one](https://console.firebase.google.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Fayed12/react-mastery-lab-55-projects.git

# 2. Navigate to the project directory
cd project-14-planora-task-management-app

# 3. Install dependencies
npm install
```

### Environment Variables

This project requires a Firebase project. Create a `.env` file in the root directory based on the provided `.env.example`:

```bash
cp .env.example .env
```

Then fill in your Firebase credentials from the [Firebase Console](https://console.firebase.google.com) → Project Settings → Your Apps:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

> **⚠️ Never commit your `.env` file.** It is already listed in `.gitignore`.

#### Firebase Setup Checklist

1. **Authentication** — Enable *Email/Password* sign-in provider in Firebase Console → Authentication → Sign-in method
2. **Firestore** — Create a Firestore database in **production mode** and configure the following security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection — any authenticated user can read; only owner can write
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Tasks — owner full access; editors/viewers via access array
    match /tasks/{taskId} {
      allow read, write: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         request.auth.uid in resource.data.access.editors[*].id ||
         request.auth.uid in resource.data.access.viewers[*].id);
    }

    // Projects — same pattern as tasks
    match /projects/{projectId} {
      allow read, write: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         request.auth.uid in resource.data.access.editors[*].id ||
         request.auth.uid in resource.data.access.viewers[*].id);
    }

    // Categories — private per user
    match /categories/{categoryId} {
      allow read, write: if request.auth != null &&
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### Running the App

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Data Models

### Task

```typescript
{
  id: string;                 // Auto-generated Firestore document ID
  userId: string;             // Owner's Firebase UID
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "critical";
  dueDate: string;            // ISO date string
  category?: {id: string; name: string};          // Category name
  privacy: "public" | "private";
  isCompleted: boolean;
  createdAt: string;          // ISO date string
  access: {
    owner: string;
    editors: Array<{ id: string; email: string }>;
    viewers: Array<{ id: string; email: string }>;
  };
}
```

### Project

```typescript
{
  id: string;
  userId: string;             // Owner's Firebase UID
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "critical";
  dueDate: string;
  privacy: "public" | "private";
  isCompleted: boolean;
  progress: string;           // "0" – "100"
  linkedTasks: string[];      // Array of task IDs
  createdAt: string;
  access: {
    editors: Array<{ id: string; email: string }>;
    viewers: Array<{ id: string; email: string }>;
  };
}
```

### Category

```typescript
{
  id: string;
  userId: string;
  name: string;
  stars: number;              // 1 – 5
  createdAt: string;
}
```

---

## 🧠 State Management

Planora uses **Redux Toolkit** with five slices:

| Slice | State | Purpose |
|---|---|---|
| `authUserSlice` | `user`, `allUsers`, `loading`, `error` | Firebase auth state, all registered users |
| `tasksSlice` | `tasks` | Real-time task array from Firestore |
| `projectsSlice` | `projects` | Real-time project array from Firestore |
| `categoriesSlice` | `categories` | User-specific categories |
| `themeSlice` | `theme` | `"light"` or `"dark"` |

All Firestore reads use `onSnapshot` listeners (set up in `App.jsx`), so the Redux store is always in sync with the database without manual refresh.

---

## 🗺️ Routing Architecture

```
/                         → Landing Page (public)
/login                    → Login Page (public)
/register                 → Register Page (public)
/dashboard                → App root (protected, requires auth)
  /dashboard/home         → Home / Summary Dashboard
  /dashboard/tasks        → Tasks Overview + Charts
  /dashboard/taskManagement → Task CRUD Management
  /dashboard/projects     → Projects Overview + Charts
  /dashboard/projectsManagement → Project CRUD Management
  /dashboard/statistics   → Statistics Dashboard
  /dashboard/calendar     → Calendar View
  /dashboard/categories   → Category Management
*                         → Error / 404 Page
```

Protected routes redirect unauthenticated users to `/` via `useEffect` + `navigate` in `App.jsx`.

---

## 📱 Responsive Design

Planora is built **mobile-first** using CSS Modules and four standard breakpoints:

| Breakpoint | Behaviour |
|---|---|
| `≤ 1200px` | Grid columns shrink; charts transition to fewer columns |
| `≤ 992px` | Padding reduced; modals become 90% width; filter bar wraps |
| `≤ 768px` | Page headers stack vertically; card grids go single column |
| `≤ 500px` | Full-width tap targets; full-screen modals; calendar "heat map" mode |

**Calendar mobile strategy** — On screens below 500px, task text inside the 7-column calendar grid is hidden. Only colour-coded priority flags and completion icons remain, turning the calendar into a visual "heat map." Tapping a day opens a full-screen modal with the complete day view.

---

## 🔥 Firebase Integration

| Firebase Service | Usage |
|---|---|
| **Firebase Auth** | `onAuthStateChanged` listener in `App.jsx` keeps session alive |
| **Firestore** | All data (tasks, projects, categories, users) stored as collections |
| **Real-time Listeners** | `onSnapshot` queries with `where` clauses — separate listeners for owned, editor-access, and viewer-access documents |
| **Automatic Merging** | Multiple `onSnapshot` results are merged and de-duplicated client-side using `Map` keyed by document ID |

---

## 📜 Available Scripts

```bash
npm run dev        # Start local development server (Vite HMR)
npm run build      # Build production bundle → dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

---

## 👤 Author

**Mohamed Fayed**

- GitHub: [@Fayed12](https://github.com/Fayed12)

---

<div align="center">

Made with ❤️ using React, Firebase, and Redux Toolkit.

</div>