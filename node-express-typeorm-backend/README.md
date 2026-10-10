 Backend API Project

A secure REST API built with Node.js, Express, TypeORM, and PostgreSQL, featuring JWT authentication and a relational note-taking system.

 Project Structure
- server.js
- db.js
- auth.middleware.js
- entities/user.js
- entities/note.js
- .env
- package.json
- README.md

 Setup and Installation
1. Install dependencies using `npm install`.
2. Configure your environment variables in a `.env` file (PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET).
3. Start the server using `node server.js`.

 API Endpoints
- POST /auth/register - Register a new user
- POST /auth/login - Authenticate user and return JWT token
- GET /auth/me - Get current user profile (Protected)
- POST /notes - Create a new note for the authenticated user (Protected)
- GET /notes - Retrieve all notes for the authenticated user (Protected)
- DELETE /notes/:id - Delete a specific note by ID (Protected) Express.js & TypeORM RESTful API

A secure, scalable RESTful Backend API built with Node.js, Express, TypeORM, and PostgreSQL, featuring JWT-based user authentication and relational notes management.

---

 Features

- **User Authentication:** Secure registration and login using hashed passwords (`bcryptjs`) and JSON Web Tokens (`JWT`).
- **Route Protection:** Custom middleware (`auth.middleware.js`) to secure API endpoints via Bearer tokens.
- **Relational Data Mapping:** One-to-Many relationship between Users and Notes using TypeORM and PostgreSQL.
- **Notes CRUD Operations:** Create, read, and delete notes specific to the authenticated user.
- **Data Isolation:** Ensures users can only access and manage their own resources.

---

 Project Structure

express-typeorm-api/
├── entities/
│   ├── user.js          # User database entity schema
│   └── note.js          # Note database entity schema
├── auth.middleware.js   # JWT token verification middleware
├── db.js                # TypeORM DataSource database configuration
├── server.js            # Main Express app and route handlers
├── .env                 # Environment variables configuration
├── package.json         # Project dependencies and metadata
└── README.md            # Project documentation

---

 Getting Started

 Prerequisites
Make sure you have Node.js and PostgreSQL installed on your system. Run `node -v` to verify.

 Installation & Execution

1. Clone the repository or open the project folder:
   ```bash
   cd express-typeorm-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your configurations:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   DB_NAME=your_database_name
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. Start the server:
   ```bash
   node server.js
   ```

*The server will start running on `http://localhost:5000`.*

---

  API Endpoints Summary

| Method | Endpoint | Description | Auth Required | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/auth/register` | Register a new user account | No | `201 Created` |
| **POST** | `/auth/login` | Authenticate user and get JWT token | No | `200 OK` |
| **GET** | `/auth/me` | Fetch current logged-in user profile | **Yes (Bearer Token)** | `200 OK` |
| **POST** | `/notes` | Create a new note for active user | **Yes (Bearer Token)** | `201 Created` |
| **GET** | `/notes` | Fetch all notes for active user | **Yes (Bearer Token)** | `200 OK` |
| **DELETE** | `/notes/:id` | Delete a specific note by ID | **Yes (Bearer Token)** | `200 OK` |

---

  Endpoint Details & Usage

 1. Register User
- **URL:** `POST /auth/register`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "username": "Bassem",
    "email": "bassem@example.com",
    "password": "securepassword123"
  }
  ```

 2. Login User
- **URL:** `POST /auth/login`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "bassem@example.com",
    "password": "securepassword123"
  }
  ```

 3. Get Current User Profile
- **URL:** `GET /auth/me`
- **Headers:** `Authorization: Bearer <your_jwt_token>`

 4. Create Note
- **URL:** `POST /notes`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <your_jwt_token>`
- **Body:**
  ```json
  {
    "title": "My First Note",
    "content": "This is the content of the task note."
  }
  ```
 5. Get All Notes
- **URL:** `GET /notes`
- **Headers:** `Authorization: Bearer <your_jwt_token>`

 6. Delete Note
- **URL:** `DELETE /notes/1`
- **Headers:** `Authorization: Bearer <your_jwt_token>`



 Testing the API

You can test all endpoints efficiently using **Thunder Client** or **Postman** by setting the appropriate HTTP methods, request headers (`Authorization: Bearer <token>`), and JSON body payloads.


  License
This project is open-source and developed for backend development assignment purposes.