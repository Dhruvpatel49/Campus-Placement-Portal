# Placify - Campus Placement Portal - Backend API

Production-ready modular Express.js REST API for Placify - Campus Placement Portal platform.

## Architecture

This project follows a **Layered MVC + Service Layer** architecture with strict separation of concerns.

```
src/
├── app.js               # Express application initialization & middleware stack
├── server.js            # Server entrypoint & graceful shutdown handlers
├── config/              # Centralized environment & database configuration
├── controllers/         # HTTP Request parsing & Response formatting
├── services/            # Core business logic & workflows
├── models/              # Mongoose database models & indexes
├── routes/              # Express API endpoint definitions
├── middlewares/         # Security, authentication, & global error handling
├── validators/          # Input schema validation logic
├── docs/                # OpenAPI 3.0 / Swagger API specification
└── utils/               # ApiError, ApiResponse, logger, asyncHandler, constants
```

## Security & Production Features

- **JWT Authentication**: Double-token architecture (Short-lived Access Tokens + HttpOnly Refresh Tokens).
- **Role-Based Access Control (RBAC)**: Enforced via `authorizeRoles('student', 'recruiter', 'admin')`.
- **Security Headers & Sanitization**: Helmet, CORS, Express Mongo Sanitize (NoSQL injection defense), HPP (parameter pollution defense).
- **Rate Limiting**: IP rate limiting via `express-rate-limit`.
- **API Documentation**: Interactive Swagger UI served at `/api/v1/docs`.

## Interactive API Documentation

Start the server and navigate to:
```
http://localhost:5000/api/v1/docs
```
Interactive Swagger UI enables testing and exploring all available endpoints (`/auth`, `/student`, `/company`, `/job`, `/application`, `/admin`, `/notification`).

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or MongoDB Atlas)
- Cloudinary Account (for file & logo storage)

### Setup & Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Verify server health & API docs:
   - Healthcheck: `http://localhost:5000/api/v1/health`
   - Swagger Docs: `http://localhost:5000/api/v1/docs`

## Available Scripts

- `npm run dev` - Run development server with auto-reload (Nodemon)
- `npm start` - Run production server
- `npm run lint` - Run ESLint code checks
- `npm run lint:fix` - Automatically fix linting issues
- `npm run format` - Format codebase with Prettier
