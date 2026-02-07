# Fullstack Challenge -- React + Node.js + SQL Server

## 👨‍💻 Author

Fausto Chattas -- Fullstack Engineer Candidate

------------------------------------------------------------------------

## 📌 Project Description

This project is a fullstack web application built as a technical
challenge. It includes:

-   User authentication with JWT
-   Protected CRUD operations
-   SQL Server database
-   React frontend
-   Node.js + Express backend

The goal is to demonstrate clean architecture, secure authentication,
and good development practices.

------------------------------------------------------------------------

## 🧱 Tech Stack

### Frontend

-   React (TypeScript)
-   Vite
-   React Router
-   Fetch API

### Backend

-   Node.js
-   Express
-   TypeScript
-   JWT
-   bcrypt
-   cookie-parser

### Database

-   Microsoft SQL Server (Docker)

### DevOps

-   Docker
-   Docker Compose

------------------------------------------------------------------------

## ✅ Features Implemented

-   User registration
-   User login
-   JWT authentication (HttpOnly cookies)
-   Protected routes
-   Task CRUD (Create, Read, Update, Delete)
-   SQL Server integration
-   Input validation
-   Error handling
-   Modular architecture

------------------------------------------------------------------------

## 📁 Project Structure

    fullstack-challenge/
    │
    ├── backend/
    │   └── src/
    │       ├── modules/
    │       │   ├── auth/
    │       │   └── tasks/
    │       ├── middleware/
    │       ├── db/
    │       └── server.ts
    │
    ├── frontend/
    │   └── src/
    │       ├── pages/
    │       ├── components/
    │       ├── api/
    │       └── auth/
    │
    ├── db/
    │   └── init.sql
    │
    ├── docker-compose.yml
    └── README.md

------------------------------------------------------------------------

## 🚀 Run Locally

### 1️⃣ Requirements

-   Docker
-   Docker Compose
-   Node.js (optional, if not using Docker)

------------------------------------------------------------------------

### 2️⃣ Start Backend + Database

From project root:

``` bash
docker compose up -d --build
docker compose ps
```

Check:

``` bash
curl http://localhost:4000/health
curl http://localhost:4000/db-ping
```

------------------------------------------------------------------------

### 3️⃣ Start Frontend

``` bash
cd frontend
npm install
npm run dev
```

Open:

    http://localhost:5173

------------------------------------------------------------------------

## 🔐 Authentication Flow

1.  User registers
2.  Server hashes password (bcrypt)
3.  JWT is generated
4.  Token stored in HttpOnly cookie
5.  Cookie sent automatically on requests
6.  Middleware validates token
7.  Protected routes allowed

No tokens are stored in localStorage.

------------------------------------------------------------------------

## 📡 API Endpoints

### Auth

  Method   Endpoint         Description
  -------- ---------------- ------------------
  POST     /auth/register   Register user
  POST     /auth/login      Login user
  POST     /auth/logout     Logout user
  GET      /auth/me         Get session user

------------------------------------------------------------------------

### Tasks (Protected)

  Method   Endpoint     Description
  -------- ------------ -------------
  GET      /tasks       List tasks
  POST     /tasks       Create task
  PATCH    /tasks/:id   Update task
  DELETE   /tasks/:id   Delete task

------------------------------------------------------------------------

## 🗄️ Database Backup

Database initialization file:

    db/init.sql

It contains:

-   Database creation
-   Users table
-   Tasks table
-   Foreign keys

Import is handled automatically via Docker.

------------------------------------------------------------------------

## 🔑 Test Credentials

You can create users manually from UI.

Example:

    Email: test@example.com
    Password: Password123!

------------------------------------------------------------------------

## 🎥 Demo Video

A demo video (\~5 minutes) is included showing:

-   Registration
-   Login
-   Task CRUD
-   Code explanation

(Video link to be provided)

------------------------------------------------------------------------

## 📈 Evaluation Criteria Coverage

### ✔ System Functionality

-   Full auth + CRUD working

### ✔ Code Organization

-   Modular backend
-   Separated frontend layers

### ✔ Secure Authentication

-   JWT
-   HttpOnly cookies
-   Middleware protection

### ✔ Correct Stack

-   React + Express + SQL Server

### ✔ Best Practices

-   Validation
-   Error handling
-   Clean services

### ✔ Git Usage

-   Atomic commits
-   Clear history

### ✔ SOLID & Clean Code

-   Single responsibility
-   Service layers
-   Reusable components

------------------------------------------------------------------------

## 🛠️ Improvements (Future Work)

-   Refresh tokens
-   Role-based access
-   Pagination
-   Unit tests
-   CI pipeline
-   Deployment

------------------------------------------------------------------------

## 📬 Contact

Fausto Chattas\
Argentina 🇦🇷\
Information Systems Engineering Student

------------------------------------------------------------------------

Thank you for reviewing this project.
