# Ticket Management System (Milestone 1 Prototype)

## Project Overview
This project is a web-based Ticket Management System developed using React (Vite) and Supabase. The main objective of the system is to provide a role-based platform where users can log in securely and access different dashboards depending on their assigned role. The target audience includes administrators who manage the system, suppliers/staff who handle ticket operations, and students/users who submit and track support requests. This repository represents the Milestone 1 prototype version, focusing on technical functionality rather than final UI design.

---

## Features (Milestone 1 Requirements)
- Authentication System (Login / Logout)
- Role-Based Access Control (RBAC) with 3 distinct roles:
  - Admin
  - Supplier (Staff role)
  - Student (User role)
- Role-Based Dashboard Redirection
- Protected Routes (Unauthorized access is blocked)
- Supabase Integration (Cloud backend connection)
  - Fetch user profile and role from database
  - Store and manage user-related data
- Global State Management using Zustand

---

## Technologies Used
- React (Vite)
- JavaScript
- Supabase (Authentication + Database)
- Zustand (State Management)
- React Router DOM

---

## User Roles & Redirect Pages
| Role     | Redirect Page |
|----------|--------------|
| Admin    | `/admin-panel` |
| Supplier | `/supplier-panel` |
| Student  | `/student-panel` |

---

## Installation & Setup






## 👥 Team Members and Responsibilities
- Ozan Erdem Tunçer → Both side mostly Backend development
- Mehmet Emre Göl  → Both side mostly Frontend development
- Hacı Emir Yılmaz  → Both side mostly Database management
- Arda Aslanbaba   → Both side mostly Frontend /Testing 


## 🚀 Installation
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

## 🔗 GitHub Link
https://github.com/...