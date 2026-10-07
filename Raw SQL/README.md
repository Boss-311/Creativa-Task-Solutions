# Express PostgreSQL Raw SQL Notes API

A RESTful API built with Node.js, Express, and PostgreSQL using raw SQL queries via TypeORM's DataSource.

## Features

- Create notes using raw SQL INSERT statements
- Fetch all notes using raw SQL SELECT
- Search notes by title or content using SQL ILIKE pattern matching

## Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL
- Driver / Connector: pg, typeorm (DataSource query interface)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database server
- DBeaver or any PostgreSQL client

## Database Setup

Run the following SQL script in your database to create the required table:

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

## Installation & Setup

1. Install project dependencies:

   npm init -y
   npm install express typeorm pg

2. Configure database connection settings in db.js:

   host: "localhost",
   port: 5432,
   username: "postgres",
   password: "YOUR_PASSWORD",
   database: "postgres"

3. Start the server:

   node server.js

The server should run on http://localhost:3005.

## API Documentation

### 1. Create a Note

- URL: /notes
- Method: POST
- Headers: Content-Type: application/json
- Body:

{
  "title": "Raw SQL Test",
  "content": "Working with direct queries without ORM"
}

- Response: 201 Created

---

### 2. Get All Notes

- URL: /notes
- Method: GET
- Response: 200 OK (Array of note objects)

---

### 3. Search Notes

- URL: /notes/search?q=query
- Method: GET
- Query Params: q (search term)
- Example: /notes/search?q=SQL
- Response: 200 OK (Array of matching notes)