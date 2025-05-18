# 🏫 School Management System

A full-stack web application designed for managing school personnel such as Teachers and Students. Built with Angular 16+ (standalone components & signals) and Node.js (Express, MongoDB). Supports role-based authentication and modern reactive state management.

## 📦 Tech Stack

### Frontend (Angular)

- Angular 16+
- Standalone Components & Signals
- Reactive Forms
- Role-based Routing with Guards
- Tailwind CSS for styling
- RxJS for UI state handling
- Signal-based caching with auto-refresh

### Backend (Node.js)

- Express.js REST API
- MongoDB with Mongoose
- JWT Authentication with Role Verification
- Generic Factory Service for CRUD operations
- Zod validation on request payloads and query params
- Environment-aware error handling

---

## 🚀 Features

### ✅ Authentication

- JWT-based login/register
- Role-based access (ADMIN, EDITOR, READER)
- Guarded routes & nested routing in Angular

### 📚 Entities

- **Teachers**: Create, View, Update, Delete
- **Students**: Create, View, Update, Delete
- **Cities**: Shared reference entity (used for Teacher/Student)

### 📊 State Management (Angular)

- Signal-based cache for Teachers, Students, Cities
- TTL expiration and auto-refresh support
- Shared UI service for error/success/loading state

