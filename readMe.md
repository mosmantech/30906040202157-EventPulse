# EventPulse - Real-Time Event Management API

EventPulse is a scalable Node.js & Express RESTful API with real-time capabilities powered by Socket.io for dynamic event management, registration, and live broadcast announcements.

---

## 🚀 Key Features

- **Authentication & Authorization**: Secure JWT-based registration and login with Role-Based Access Control (`user`, `admin`).
- **Event Management**: Comprehensive CRUD operations for events with filtering, pagination, search, and category assignment.
- **Event Registration**: Booking system with automatic capacity tracking and prevention of double registrations.
- **Real-Time Announcements**: Instant WebSocket messaging using Socket.io to notify users in specific event rooms.
- **Input Validation & Security**: Request body and parameter sanitization using `express-validator` returning HTTP `422 Unprocessable Entity` on validation failures.
- **Robust Error Handling**: Centralized global error handling middleware using custom `AppError` class and asynchronous wrapper (`asyncHandler`).
- **Automated Testing**: Comprehensive unit tests for core utilities and integration tests for API endpoints using Jest and Supertest.

---

## 🛠️ Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-Time Engine**: Socket.io
- **Data Validation**: express-validator
- **Testing Framework**: Jest & Supertest
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs

---

## 📂 Project Structure

```text
.
├── controllers/       # Request handlers & business logic
├── middleware/        # Authentication, Authorization, Validation, Error Handling
├── models/            # Mongoose schemas (User, Event, Category, Registration, Message)
├── routes/            # Express route declarations
├── tests/             # Unit and integration test suites
│   ├── unit.test.js
│   └── event.test.js
├── utils/             # Helper modules (AppError, asyncHandler)
├── postman/           # Postman Collections and Environment JSON files
├── .env.example       # Example environment configuration
├── app.js             # Express app setup & middleware mounting
├── server.js          # HTTP server & Socket.io initialization
└── README.md          # Project documentation
```

## Installation & Local Setup
### 1. Prerequisites
Ensure you have the following installed locally:

- Node.js (v16.x or higher)

- MongoDB (Local instance or MongoDB Atlas account)

### 2. Clone the Repository
```code
git clone https://github.com/mosmantech/30906040202157-EventPulse.git
cd food-delivery-api
```
### 3. Install Dependencies
```code
npm install
```
### 4. Configure Environment Variables
Create a .env file in the root directory and populate it with your environment configuration:
```code
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://mohammed_db_user:mohammed123@cluster0.wixp5b1.mongodb.net/eventPulse?appName=Cluster0
JWT_SECRET=MQxdue0oiAtp2NHjnfuKOyzYOBeiBjXiwS2Ugytn/aE=
```

### 5. Start the Application
```
# Development Mode (with nodemon)
npm run dev

# Production Mode
npm start
```

Running Automated Tests
The repository includes both unit tests (testing core utilities) and integration tests (testing route responses).

To execute the test suite:
```npm test```

Expected Output:
```
PASS  tests/unit.test.js
PASS  tests/event.test.js

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Time:        ~3.5 s
```

📡 API Endpoints Reference
🔐 Authentication
POST /api/auth/register - Public - Register a new user

POST /api/auth/login - Public - Authenticate user & return JWT

📅 Events
GET /api/events - Public - List all events (Supports filter, search, page, limit)

GET /api/events/:id - Public - Get single event details by ID

POST /api/events - Admin - Create a new event

PATCH /api/events/:id - Admin - Update an existing event

DELETE /api/events/:id - Admin - Delete an event

🏷️ Categories
GET /api/categories - Public - Get all event categories

POST /api/categories - Admin - Create a new category

🎟️ Event Registrations
POST /api/registrations - User - Register logged-in user for an event

GET /api/registrations/my-registrations - User - Get current user's registered events

DELETE /api/registrations/:id - User - Cancel an active event registration

📢 Messages & Real-Time Announcements
POST /api/messages - Admin - Save announcement & broadcast via Socket.io

GET /api/messages/:eventId - User - Retrieve historical announcements for an event

📂 Postman Collection & Testing
All HTTP and Socket.io Postman Collections along with environment configurations are available inside the /postman directory.