# Copilot Instructions for SmartMetroCard-Backend

## Project Overview
This is a Node.js backend for a Smart Metro Card system, using Express, Mongoose, and MongoDB. It manages users, stations, journeys, transactions, subscriptions, and virtual cards. The codebase is modular, with clear separation of concerns via models, controllers, and routes.

## Architecture & Key Patterns
- **Entry Point:** `src/server.js` initializes Express, connects to MongoDB, and starts the server.
- **App Logic:** `src/app.js` configures middleware and routes. All API endpoints are registered here.
- **Models:** Located in `src/models/`, each file defines a Mongoose schema for a domain entity (e.g., `User.js`, `Station.js`).
- **Controllers:** In `src/controllers/`, each controller handles business logic for a resource. Controllers are imported by routes.
- **Routes:** In `src/routes/`, each file maps HTTP endpoints to controller methods. Route files are imported in `app.js`.
- **Enums:** `src/enums/` contains constants for types (e.g., notification, transaction, user roles) to avoid magic strings.

## Developer Workflows
- **Start Server:**
  ```powershell
  node src/server.js
  ```
  or use `npm start` if defined in `package.json`.
- **Environment Variables:**
  - Set `MONGO_URI` and `PORT` in a `.env` file.
- **Seed Data:**
  - Uncomment and use the `seedTestData` function in `server.js` after DB connection for initial test data.
- **Add Models/Controllers/Routes:**
  - Follow existing patterns: create a model, controller, and route file for each new resource.

## Conventions & Patterns
- **ES Modules:** All imports use ES module syntax (`import ... from ...`).
- **Error Handling:** DB connection errors log and exit the process. Controller errors should send appropriate HTTP responses.
- **Data Flow:**
  - Request → Route → Controller → Model (DB) → Response
- **Cross-Component Communication:**
  - Controllers interact with models directly. No service layer is present.
- **Testing:** No explicit test setup found; add tests in a `tests/` folder if needed.

## External Integrations
- **MongoDB:** Main data store, configured via `MONGO_URI`.
- **CORS:** Enabled globally for all routes.
- **dotenv:** Used for environment variable management.

## Examples
- **Add a new resource:**
  1. Create a Mongoose model in `src/models/`.
  2. Create a controller in `src/controllers/`.
  3. Create a route file in `src/routes/` and register it in `app.js`.

## Key Files
- `src/server.js` (entry point)
- `src/app.js` (Express app setup)
- `src/models/` (Mongoose schemas)
- `src/controllers/` (business logic)
- `src/routes/` (API endpoints)
- `src/enums/` (constants)

---
**Feedback:** Please review and suggest improvements or clarify any missing conventions, workflows, or integration details.
