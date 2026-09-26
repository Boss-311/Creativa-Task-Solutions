# Pure Node.js HTTP Server API

A lightweight, zero-dependency RESTful Backend API built purely using Node.js's native `http` module without any external frameworks like Express.

---

## 🚀 Features

- **Zero External Dependencies:** Built entirely using Node.js built-in modules.
- **Stream Processing:** Handles incoming request body chunks manually via `req.on('data')` and `req.on('end')`.
- **RESTful Architecture:** Supports `GET`, `POST` and  HTTP methods.
- **In-Memory Data Store:** Performs CRUD operations on Javascript arrays.
- **Error Handling:** Manages `404 Not Found` routes and handles `400 Bad Request` for invalid JSON payloads.

---

## 📁 Project Structure

pure-node-http-api/
├── http.js          # Core server logic & routing
├── package.json     # Node.js configuration
└── README.md        # Project documentation

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have Node.js installed on your system. Run `node -v` to verify.

### Installation & Execution

1. Clone the repository:
    git clone https://github.com/YOUR_USERNAME/pure-node-http-api.git
    cd pure-node-http-api

2. Start the server:
    node http.js

*The server will start running on `http://localhost:3555` (or port `3000`).*

---

## 📌 API Endpoints Summary

| Method | Endpoint | Description | Request Body | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Home route | None | `200 OK` |
| **GET** | `/user` | Fetch list of users | None | `200 OK` |
| **GET** | `/product` | Fetch list of products | None | `200 OK` |
| **POST** | `/product` | Add a new product | JSON Object | `201 Created` |
| **DELETE** | `/product` | Delete a product by ID | JSON Object | `200 OK` |

---

## 📖 Endpoint Details & Usage

### 1. Home Route
- **URL:** `GET /`
- **Response:** `Hello here Boss`

### 2. Get Users
- **URL:** `GET /user`
- **Response Example:**
    {
      "message": "(User Route)",
      "users": [
        { "id": 1, "name": "Boss" },
        { "id": 2, "name": "Moamen" }
      ]
    }

### 3. Get Products
- **URL:** `GET /product`
- **Response Example:**
    {
      "message": "(Product Route)",
      "products": [
        { "id": 101, "name": "labtop", "price": 15000 },
        { "id": 102, "name": "phone", "price": 8000 },
        { "id": 103, "name": "tablet", "price": 5000 }
      ]
    }

### 4. Add Product
- **URL:** `POST /product`
- **Headers:** `Content-Type: application/json`
- **Body:**
    {
      "id": 104,
      "name": "headphone",
      "price": 1200
    }
- **Response Example (`201 Created`):**
    {
      "message": "The data has been successfully received and stored.!",
      "storedProduct": { "id": 104, "name": "headphone", "price": 1200 },
      "allProducts": [...]
    }


---

## 🧪 Testing the API

### Via Browser Console (Fetch)
    fetch('http://localhost:3555/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 104, name: 'headphone', price: 1200 })
    })
    .then(res => res.json())
    .then(data => console.log(data));

### Via cURL
    curl -X POST http://localhost:3555/product -H "Content-Type: application/json" -d "{\"id\": 104, \"name\": \"headphone\", \"price\": 1200}"

---

## 📝 License
This project is open source and available under the MIT License.
