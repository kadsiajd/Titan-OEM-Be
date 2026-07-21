# Titan OEM Backend

Node.js backend API built with Fastify, TypeScript, Prisma, PostgreSQL, and JWT authentication.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Fastify
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT (@fastify/jwt + bcrypt)
- **API Docs:** Swagger (@fastify/swagger)
- **Testing:** Vitest (unit tests)
- **Linting:** ESLint + Prettier

## Project Structure

```
src/
├── app.ts                  # Build Fastify app, register plugins + autoload APIs
├── server.ts               # Start server
├── config/                 # Environment & constants
├── plugins/                # Fastify plugins (helmet, cors, rate-limit, jwt, swagger, prisma)
├── api/                    # Feature APIs (autoloaded)
│   └── auth/
│       ├── auth.routes.ts
│       ├── auth.controller.ts
│       ├── auth.dao.ts
│       └── index.ts
└── shared/                 # Shared utilities, errors, middleware
```

New API folders under `src/api/` are loaded automatically via `@fastify/autoload` — no manual registration in `app.ts` needed.
The auth module currently contains an empty skeleton; no authentication endpoints have been implemented.

API folders can contain:
- `{name}.routes.ts` — Route definitions
- `{name}.controller.ts` — Request/response handling
- `{name}.dao.ts` — Database access (Prisma)
- `{name}.schema.ts` — Validation + Swagger schemas, when needed
- `{name}.interface.ts` — TypeScript types, when needed
- `index.ts` — Registers routes for that API

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL (installed locally)

### Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update DATABASE_URL in .env with your local PostgreSQL credentials

# Create database (run once in psql or pgAdmin)
# CREATE DATABASE titan_oem;

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Start dev server
npm run dev
```

### Local PostgreSQL

Update `.env` with your local credentials:

```env
DATABASE_URL=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/titan_oem?schema=public
```

Example if your local Postgres user is `postgres`:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/titan_oem?schema=public
```

Create the database before running migrations:

```sql
CREATE DATABASE titan_oem;
```

Server runs at `http://localhost:3000`
Swagger docs at `http://localhost:3000/docs`

Swagger is always disabled when `NODE_ENV=production`, regardless of the
`SWAGGER_ENABLED` value.

## API Endpoints

No application endpoints have been added yet.

## Response Format

### Success

```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": { },
  "meta": {
    "timestamp": "2026-07-20T10:00:00.000Z"
  }
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [{ "field": "email", "message": "Invalid email format" }]
  },
  "meta": {
    "timestamp": "2026-07-20T10:00:00.000Z"
  }
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm test` | Run unit tests (watch mode) |
| `npm run test:run` | Run unit tests once |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio |

## Security

- **Helmet** — Security headers (CSP in production, HSTS, XSS protection)
- **CORS** — Configurable allowed origins via `CORS_ORIGIN` env
- **Rate Limiting** — Global limit + stricter limits on auth routes
- **JWT** — Token-based authentication for protected routes
