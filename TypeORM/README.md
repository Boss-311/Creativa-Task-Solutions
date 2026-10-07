# Express PostgreSQL Notes API (TypeORM)

A simple CRUD Notes API built with Express, PostgreSQL, and TypeORM using the Repository pattern and EntitySchema.

## Requirements

- Node.js (v18+)
- PostgreSQL server

## Project Structure

- `db.js`: TypeORM DataSource configuration & DB connection
- `note.js`: Note EntitySchema definition
- `server.js`: Express routes and server setup

## Setup & Running

1. Install dependencies:

   npm init -y
   npm install express typeorm pg

2. Update PostgreSQL connection credentials in `db.js`:

   host: "localhost",
   port: 5432,
   username: "postgres",
   password: "YOUR_PASSWORD",
   database: "postgres"

3. Start the application:

   node server.js

The server will sync database schemas automatically (`synchronize: true`) and start listening on `http://localhost:3005`.

## API Endpoints

### Create Note
- **POST** `/notes`
- **Headers:** `Content-Type: application/json`
- **Body:**
  {
    "title": "TypeORM Test",
    "content": "Testing Task 2 using Repository Pattern"
  }

### Get All Notes
- **GET** `/notes`

### Search Notes
- **GET** `/notes/search?q=term`
- **Example:** `/notes/search?q=Repository`