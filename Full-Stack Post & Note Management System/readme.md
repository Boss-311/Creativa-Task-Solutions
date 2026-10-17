# Full-Stack Post & Note Management System

A robust full-stack RESTful application built with **Node.js**, **Express**, **TypeORM**, and **PostgreSQL**, structured using a clean **Layered Architecture**. The application includes JWT-based user authentication, schema-based request validation, and an integrated, lightweight frontend dashboard served directly by Express.

---

## 🛠️ Tech Stack

* **Backend Framework:** Node.js & Express.js
* **Database & ORM:** PostgreSQL & TypeORM
* **Authentication & Security:** JSON Web Tokens (JWT) & bcrypt
* **Data Validation:** Zod
* **Frontend:** HTML5 & Tailwind CSS (served via `express.static`)

---

## 📁 Architecture & Folder Structure

The project strictly follows a **Layered Architecture** pattern to enforce separation of concerns, maintainability, and scalability:

```text
src/
├── controllers/        # Express request handlers (HTTP logic)
│   ├── auth.controller.js
│   └── note.controller.js
├── entities/           # TypeORM database entities/models
│   ├── Note.js
│   └── User.js
├── middleware/         # Custom Express middlewares (Auth, Validation, Errors)
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── validate.js
├── public/             # Integrated static frontend dashboard
│   └── index.html
├── repositories/       # Data Access Layer (TypeORM queries)
│   └── note.repository.js
├── routes/             # Express API routes
│   ├── auth.routes.js
│   └── note.routes.js
├── services/           # Business logic layer
│   └── note.service.js
├── validators/         # Zod schemas for request validation
│   └── note.validator.js
├── app.js              # Express app initialization and global middlewares
├── db.js               # TypeORM DataSource setup & DB connection
└── server.js           # Server entry point
```

---

## ✨ Features

1. **Authentication & Authorization:**
   * User registration with password hashing using `bcrypt`.
   * User login with secure JWT generation.
   * Protected endpoints requiring Bearer tokens (`authMiddleware`).

2. **Data Validation & Error Handling:**
   * Strict request body validation via `Zod`.
   * Centralized global error handling middleware for unified error responses.

3. **Database Relationships:**
   * One-to-Many relational mapping between `User` and `Note` entities using TypeORM.

4. **Built-in Interactive Dashboard:**
   * Modern single-page UI built with Tailwind CSS.
   * Allows real-time registration, login, auto-binding of JWT authorization tokens, post creation, and post deletion directly in the browser.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **PostgreSQL** installed and running locally

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory and specify your configuration parameters:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_NAME=your_db_name
   ```

3. **Start the Server:**
   ```bash
   node src/server.js
   ```

4. **Access the Dashboard:**
   Open your browser and navigate to:
   ```text
   http://localhost:5000
   ```

---

## 🔑 API Endpoints

### Auth Routes (`/auth`)
* `POST /auth/register` — Register a new user
* `POST /auth/login` — Login and receive a JWT token

### Post Routes (`/posts`)
* `GET /posts` — Retrieve all posts (public)
* `POST /posts` — Create a new post (requires `Authorization: Bearer <TOKEN>`)
* `DELETE /posts/:id` — Delete a post by ID (requires `Authorization: Bearer <TOKEN>`)