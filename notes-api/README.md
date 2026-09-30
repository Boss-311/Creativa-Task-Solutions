# Notes REST API

A clean and simple Express.js REST API for managing notes with local JSON file persistence (`notes.json`). Built with Node.js and standard file system (`fs`) operations to handle full CRUD functionality without needing an external database setup.

## Features

- **Full CRUD Support**: Create, Read, Update, and Delete notes.
- **JSON File Persistence**: Uses Node.js native `fs` module to save all notes directly into `notes.json`.
- **Flexible Updates**: Supports both full entity replacement (`PUT`) and field-level updates (`PATCH`).
- **Standardized Responses**: Clear JSON responses with appropriate HTTP status codes (`200`, `201`, `400`, `404`).

---

## Project Structure

```text
notes-api/
├── notes.js        # Main Express server and CRUD route handlers
├── notes.json      # Local JSON file storing note records
├── package.json    # Project metadata and dependencies
├── .gitignore      # Ignores node_modules from Git tracking
└── README.md       # Project documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher) installed on your machine.

### Installation

1. Clone or download this project repository.
2. Open your terminal inside the project directory and install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the server using Node.js:
```bash
node notes.js
```
The server will start listening at `http://localhost:3580`.

---

## API Reference

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/notes` | Retrieve all notes | `200 OK` |
| `GET` | `/notes/:id` | Retrieve a single note by ID | `200 OK` / `404 Not Found` |
| `POST` | `/notes` | Create a new note | `201 Created` / `400 Bad Request` |
| `PUT` | `/notes/:id` | Fully replace an existing note | `200 OK` / `404 Not Found` |
| `PATCH` | `/notes/:id` | Partially update an existing note | `200 OK` / `404 Not Found` |
| `DELETE` | `/notes/:id` | Delete a note by ID | `200 OK` / `404 Not Found` |

---

## Request & Response Examples

### 1. Get All Notes
- **Endpoint**: `GET http://localhost:3580/notes`
- **Response** (`200 OK`):
  ```json
  [
    {
      "id": 1,
      "title": "First Note",
      "content": "This is stored inside notes.json"
    }
  ]
  ```

### 2. Create Note
- **Endpoint**: `POST http://localhost:3580/notes`
- **Request Body**:
  ```json
  {
    "title": "Study Express.js",
    "content": "Master route handlers and middleware."
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "message": "Note created successfully",
    "note": {
      "id": 2,
      "title": "Study Express.js",
      "content": "Master route handlers and middleware."
    }
  }
  ```

### 3. Partial Update Note
- **Endpoint**: `PATCH http://localhost:3580/notes/1`
- **Request Body**:
  ```json
  {
    "title": "Updated Note Title"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "Note updated successfully",
    "note": {
      "id": 1,
      "title": "Updated Note Title",
      "content": "This is stored inside notes.json"
    }
  }
  ```

### 4. Delete Note
- **Endpoint**: `DELETE http://localhost:3580/notes/1`
- **Response** (`200 OK`):
  ```json
  {
    "message": "Note deleted successfully"
  }
  ```

---

## Testing

You can test these endpoints using tools like **Postman**, **Thunder Client** (VS Code Extension), or via terminal using **cURL**:

```bash
# Get all notes
curl http://localhost:3580/notes

# Create a new note
curl -X POST http://localhost:3580/notes \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Terminal Note\", \"content\":\"Created via cURL\"}"
```