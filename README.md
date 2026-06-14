# ⚡ EventManage API

A College Event Registration REST API built with **Node.js** and **Express**.  
Handles event creation, student registrations, input validation, and proper HTTP status codes.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/eventmanage-api.git

# 2. Go into the folder
cd eventmanage-api

# 3. Install dependencies
npm install

# 4. Start the server (development mode)
npm run dev
```

Server runs on **http://localhost:3000**

---

## 📁 Project Structure

```
eventmanage-api/
├── data/
│   └── store.js          # In-memory data storage
├── middleware/
│   └── validate.js       # Input validation
├── routes/
│   └── events.js         # All API endpoints
├── server.js             # Entry point
├── test.http             # API test file (VS Code REST Client)
└── package.json
```

---

## 🛣️ API Endpoints

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get single event |
| POST | `/api/events` | Create new event |

### Registrations

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/events/register/new` | Register for an event |
| GET | `/api/events/registrations/all` | Get all registrations |
| GET | `/api/events/registrations/:rollNumber` | Get by roll number |

---

## 📨 Sample Requests

### Create an Event
```json
POST /api/events
{
  "eventName": "AI Workshop",
  "date": "2026-08-01",
  "venue": "Seminar Hall B",
  "maxSeats": 30
}
```

### Register a Student
```json
POST /api/events/register/new
{
  "studentName": "Ravi Kumar",
  "email": "ravi@college.com",
  "rollNumber": "CS2024001",
  "phone": "9876543210",
  "eventId": 1
}
```

---

## ✅ Features

- RESTful API design
- GET and POST endpoints
- Input validation with proper error messages
- Duplicate registration check
- Seat availability check
- Correct HTTP status codes (200, 201, 400, 404, 500)
- JSON responses

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Storage:** In-memory (no database)

