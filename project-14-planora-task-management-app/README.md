## developed by mohamed fayed

# Planora – Advanced Task Management App

## 1. Project Overview

**Planora** is a professional, advanced task management web application designed to help individuals and teams plan, organize, prioritize, and track tasks efficiently.

**Goals:**

* Improve productivity through smart planning
* Provide clean, professional UX (white-first UI)
* Be portfolio-ready and scalable (SaaS-ready architecture)

---

## 2. Target Users

* Individuals (students, freelancers)
* Professionals (developers, designers)
* Small teams

---

## 3. Functional Requirements (Features)

### 3.1 Authentication & User Management

* User registration (Email & Password)
* User login / logout
* Persistent sessions
* Protected routes
* User profile (name, avatar)

---

### 3.2 Task Management (Core)

Each task includes:

* Title
* Description
* Status (Pending / Completed)
* Priority (Low / Medium / High)
* Due date
* Labels (multiple)
* Category 
* privacy ==> privet - global
* role-based access
* linked project
* Subtasks
* Created & updated timestamps

**Features:**

* Create / Edit / Delete tasks
* Mark task as completed
* Bulk actions (delete / complete multiple)

---

### 3.3 Categories / Projects

* Create, edit, delete categories
* Assign tasks to categories
* Filter tasks by category
* add tasks to this project

---

### 3.4 Labels / Tags

* Create custom labels
* Assign multiple labels to a task
* Filter tasks by labels

---

### 3.5 Due Dates & Reminders

* Assign due date to tasks
* Highlight overdue tasks
* Upcoming tasks (Today / This Week)
* Optional reminders (future phase)

---

### 3.6 Views & Task Visualization

* List View (default)
* Calendar View (monthly / weekly)
* Kanban Board View
* Toggle between views

---

### 3.7 Search, Filter & Sort

* Search by task title
* Filter by:

  * Status
  * Priority
  * Category
  * Label
* Sort by:

  * Due date
  * Priority
  * Created date

---

### 3.8 UI & UX

* Light Mode (default – white theme)
* Dark Mode
* Responsive design
* Smooth animations
* Loading & empty states

---

## 4. Pages & Routes

### Public Pages

* Landing Page
* Login Page
* Register Page
* forgotPassword page 

### Protected Pages

* Dashboard/ home
* Tasks Page
* tasks management page
* projects / Categories page
* projects / Categories management page
* Statistics page
* Calendar Page
* Profile Page

---

## 5. Non‑Functional Requirements

### Performance

* Fast rendering
* Optimized re-renders

### Security

* Protected routes
* Secure authentication

### Accessibility

* Keyboard navigation
* Proper contrast

---

## 6. Technical Requirements (Tech Stack)

### Frontend

* React (Vite)
* React Router
* Redux tool kit
* code splitting & lazy loading 
* axios 
* react router form
* and other packages you can see in deps 

### Backend (Phase 2)

* Firebase Authentication
* Firestore Database

### Utilities

* date-fns (date handling)
* uuid (IDs)

---

## 7. State Management Architecture

redux:

* AuthSlice
* TasksSlice
* CategoriesSlice
* UI / ThemeSlice
* and more

---

## 8. Data Models (Simplified)

### User

* id ==> default
* name
* email

### Task

* id ==> default
* UserId  ==> default
* role-based access ==> for users  ==> optional
* title
* description
* isCompleted  ==> default == f
* priority  ==> default == low
* dueDate  ==> default == today
* categories
* labels[]
* created date  ==> default
* comments  ==> default == []
* privacy ==> [privet - global]  ==> default == privet

### project 

* id ==> default
* UserId ==> owner ==> default
* role-based access ==> for users ==> optional
* title
* description
* isCompleted ==> default == f
* priority ==> default == low
* dueDate ==> default == today
* linked tasks ==> default == []
* created date ==> default
* progress bar ==> default 

### categories 

* id ==> default
* title
* description
* related tasks ==> default
* stars
* created date ==> default

---

## 9. Folder Structure

```
src/
│── components/
│── ui/ 
│── firebase/
│── router/
│── pages/
│── redux/
│── hooks/
│── utils/
│── services/
│── App.jsx
```

---

## 10. Future Enhancements

* AI task prioritization
* Offline mode

## system flow

* when open the website user will see landing page that explore app services and features with nav and footer components
  * this landing contain [home - features - about - our message]

* in nav bar user can signUp or login 
  * user can login with email and email 
  * user can create new account with [id - name - email ]

* if user login with correct email and password, he see the main dashboard home, it contain welcome message and get started button

* user go to tasks page, it contain title and table with all tasks, and below of the table user can create new task , this page only contain tasks over view and can make it done or not

* user can write in task [title -  Description - Status - Priority - due data - labels - category - privacy - role-based access - subtasks], user can set privacy if global all users can show this task to make comments or not on this task, subtasks will contain only title and description

* for managing the tasks he van go to tasks management page, user can  create new one or edit or remove task, make it complete or not

* user can go to projects page that contains, grid cards with all projects, user can make it done or not, project is the big task that contain some of related or small tasks

* project contain [title - description - linked tasks - isCompleted - priority  - due date - role-based access]

* projects page contain categories section that can from it manage all categories in all tasks, user can create new category with [title - description - stars]

* in project user can link other users to his project and give them access to edit or view only, you can remove or add

* user can add his own categories but if no cats and he need to add one to task he must create one first 

* EX: edit==> userIdOne, view ==> userIdTwo....

* Statistics pages, that contain all Statistics of the tasks and projects, can be in below of each page

* user can go to calender page to see in easy way his upcoming and soon tasks in calender

* Profile page,Where the user can edit gis profile image and other data

* can enhance to add file section to tasks and projects 

* the website wil contain notifications 