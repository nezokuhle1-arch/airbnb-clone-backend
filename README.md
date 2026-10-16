# Airbnb Clone: Backend API

REST API for an Airbnb-style accommodation booking app, built with Node.js, Express and MongoDB (Mongoose). It serves two frontends: a guest site and an admin dashboard.

## Live demo

| Part | URL |
|---|---|
| Backend API | https://airbnb-clone-backend-hkkv.onrender.com |
| Guest site | https://airbnb-clone-guest.onrender.com |
| Admin site | https://airbnb-clone-admin-mhm2.onrender.com |

> **Note:** The API runs on Render's free tier, which sleeps after about 15 minutes of inactivity. The first request after a quiet period can take up to a minute while the server wakes up. Later requests are fast.

## Repositories

- Backend: `airbnb-clone-backend` (this repo)
- Admin frontend: `airbnb-clone-admin`
- Guest frontend: `airbnb-clone-guest`

## Tech stack

Node.js, Express 5, MongoDB Atlas, Mongoose, JSON Web Tokens (`jsonwebtoken`), `bcryptjs` for password hashing, `cors`, `dotenv`.

## Getting started

```bash
git clone https://github.com/nezokuhle1-arch/airbnb-clone-backend.git
cd airbnb-clone-backend
npm install
```

Create a `.env` file in the project root:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
PORT=5000
```

Run the server:

```bash
npm run dev     # development, restarts on file changes (nodemon)
npm start       # production
```

### Environment variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string, with your database user's password filled in |
| `JWT_SECRET` | Secret used to sign and verify tokens |
| `PORT` | Port to listen on. Render sets this automatically in production |

The `.env` file is git-ignored and must never be committed.

### Seeding data

- `node seed.js` creates two demo accounts. **It deletes all existing users first**, so use it only on a database you can wipe.
- `node addAdmin.js` adds a single admin account without touching existing users.

### Demo accounts

| Role | Email | Password |
|---|---|---|
| user (guest) | nezira@example.com | password123 |
| host | max@example.com | password321 |
| admin | bruno@example.com | password456 |

## Authentication and roles

Log in or register to receive a JWT, then send it on protected requests:

```
Authorization: Bearer <token>
```

Tokens expire after 7 days. The token payload contains `userId` and `role`.

| Role | Can do |
|---|---|
| `user` | Browse listings, make and cancel their own reservations |
| `host` | Everything a user can do, plus create listings, edit and delete their own listings, and view reservations for their listings |
| `admin` | Everything a host can do, on any listing |

New accounts created through `/api/users/register` always receive the `user` role. A role sent in the request body is ignored.

## API endpoints

Base URL: `https://airbnb-clone-backend-hkkv.onrender.com/api`

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users/register` | none | Create an account. Body: `username`, `email`, `password` (min 8 characters). Returns `token`, `username`, `role` |
| POST | `/users/login` | none | Log in. Body: `email`, `password`. Returns `token`, `username`, `role` |

### Accommodations

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/accommodations` | none | List all accommodations |
| GET | `/accommodations/:id` | none | Get one accommodation |
| POST | `/accommodations` | host or admin | Create an accommodation. The host is taken from the token |
| PUT | `/accommodations/:id` | host (owner) or admin | Update an accommodation |
| DELETE | `/accommodations/:id` | host (owner) or admin | Delete an accommodation |

Required fields when creating: `title`, `location`, `type`, `price`. Optional fields: `description`, `guests`, `bedrooms`, `bathrooms`, `amenities`, `images`, `weeklyDiscount`, `cleaningFee`, `serviceFee`, `occupancyTaxes`, `enhancedCleaning`, `selfCheckin`.

### Reservations

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/reservations` | any logged-in user | Create a reservation. Body: `accommodation`, `checkIn`, `checkOut`, `guests`, `totalCost`. The user is taken from the token |
| GET | `/reservations/user` | any logged-in user | List the logged-in user's reservations |
| GET | `/reservations/host` | host or admin | List reservations for the logged-in host's listings | |
| DELETE | `/reservations/:id` | owner of the reservation | Cancel a reservation |

### Example

```bash
curl -X POST https://airbnb-clone-backend-hkkv.onrender.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nezira@example.com","password":"password123"}'
```

```json
{ "token": "eyJhbGciOi...", "username": "Nezira", "role": "user" }
```

## Status codes

| Code | Meaning in this API |
|---|---|
| 200 | Request succeeded |
| 201 | Resource created |
| 400 | Missing or invalid data in the request |
| 401 | No token, an invalid token, or wrong login credentials |
| 403 | Logged in, but your role or ownership does not allow this action |
| 404 | Resource not found |
| 409 | Username or email already in use |
| 500 | Unexpected server error |

## Data models

- **User**: `username` (unique), `email` (unique), `password` (bcrypt hash), `role` (`user`, `host` or `admin`)
- **Accommodation**: listing details, pricing and fees, amenities, images, ratings, and `host` (reference to a User)
- **Reservation**: `accommodation` and `user` references, `checkIn`, `checkOut`, `guests`, `totalCost`

## Project structure

```
server.js        Express app, middleware, MongoDB connection
seed.js          Seeds demo users (wipes existing users)
addAdmin.js      Creates a single admin account
models/          Mongoose schemas
controllers/     Request handlers
routes/          Route definitions
middleware/      auth.js (verifies the JWT), roleCheck.js (role guard)
```

## Deployment

Hosted on Render as a Node web service (`npm start`), connected to MongoDB Atlas. Set `MONGODB_URI` and `JWT_SECRET` under the service's Environment settings. In Atlas, allow Render to connect by adding `0.0.0.0/0` under Network Access.

built by Nezokuhle Tshukulwana