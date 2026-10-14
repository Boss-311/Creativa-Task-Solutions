# 🚀 Blog System REST API with Role-Based Access Control (RBAC)

A robust, secure, and scalable backend REST API for a modern blogging platform built with **Node.js**, **Express.js**, **TypeORM**, and **PostgreSQL**. The application features JWT-based authentication, custom validation with **Zod**, and strict Role-Based Access Control (RBAC).

---

## 🛠️ Tech Stack & Tools

* **Backend Framework:** Node.js & Express.js
* **Database & ORM:** PostgreSQL & TypeORM
* **Authentication & Security:** JSON Web Tokens (JWT) & Bcrypt.js
* **Data Validation:** Zod
* **Database Management Tool:** DBeaver
* **API Testing Tool:** Thunder Client / Postman

---

## ✨ Features & Functionalities

* 🔑 **Authentication & Authorization:**
  * Secure user registration with password hashing (`bcryptjs`).
  * JWT login emitting authorization tokens with embedded role payloads (`user` / `admin`).
* 🛡️ **Role-Based Access Control (RBAC):**
  * Custom `requireRole` middleware protecting admin-only routes.
  * Granular ownership checks ensuring regular users only modify or delete their own posts.
  * Administrative privileges allowing admins to manage any post or user.
* 📝 **CRUD Operations & Relations:**
  * Complete management of blog posts (`Create`, `Read`, `Update`, `Delete`).
  * `One-to-Many` relational database mapping between `Users` and `Posts`.

---

## 📁 Project Structure

```text
├── entities/
│   ├── user.js             # TypeORM User entity schema & relations
│   └── post.js             # TypeORM Post entity schema & relations
├── middleware/
│   ├── auth.middleware.js  # JWT authentication verification
│   └── requireRole.js      # RBAC middleware for role checking
├── .env                    # Environment variables configuration
├── db.js                   # TypeORM database connection setup
├── server.js               # Application entry point & route handlers
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js** (v18+ recommended)
* **PostgreSQL** installed and running locally.

### 2. Environment Setup
Create a `.env` file in the root directory and add your configuration:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=course_creativa

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

### 3. Installation & Running

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Install dependencies
npm install

# Start the server
node server.js
```

---

## 📡 API Endpoints & Testing Guide

### 🔑 Authentication Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user (`role` defaults to `user`) | Public |
| `POST` | `/auth/login` | Login and obtain JWT token | Public |

#### Example Register Body:
```json
{
  "username": "ahmed",
  "email": "ahmed@test.com",
  "password": "password123"
}
```

---

### 📝 Posts Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/posts` | Get all blog posts with author details | Public / User |
| `POST` | `/posts` | Create a new blog post | Authenticated User |
| `DELETE` | `/posts/:id` | Delete a post (Owner or Admin) | Authenticated User / Admin |

#### Example Header for Protected Routes:
```text
Authorization: Bearer <YOUR_JWT_TOKEN>
```

#### Example Create Post Body:
```json
{
  "title": "My First Blog Post",
  "content": "Exploring Node.js and TypeORM RBAC implementation."
}
```

---

### 🛡️ Administrative Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `DELETE` | `/users/:id` | Delete a user account from system | **Admin Only** |

---

### 🧪 Verification & Manual Testing Flow
1. **User Registration:** Register two users via `POST /auth/register`.
2. **Elevate Role:** Access DBeaver, toggle to the `Data` tab of the `users` table, and manually change one user's `role` to `admin`.
3. **Login & Token:** Perform `POST /auth/login` for both users to retrieve their respective JWT tokens.
4. **Post Creation:** Send `POST /posts` with the regular user token; verify record insertion in the `posts` table.
5. **RBAC Testing:**
   * Attempt `DELETE /users/:id` using the **User token** -> Expected Response: `403 Forbidden`.
   * Attempt `DELETE /users/:id` using the **Admin token** -> Expected Response: `200 OK` (User deleted).