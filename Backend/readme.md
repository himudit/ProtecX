# ProtecX Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using a JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### 1. Sign Up

Create a new user account.

**Endpoint:** `POST /auth/signup`

**URL:** `http://localhost:5000/api/auth/signup`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "admin@123",
  "name": "John Doe"
}
```

**Request Fields:**
- `email` (string, required): Valid email address
- `password` (string, required): Minimum 8 characters
- `name` (string, required): User's full name

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "jwt-token-string"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Missing required fields or validation failed
  ```json
  {
    "success": false,
    "message": "Email, password, and name are required"
  }
  ```

- **400 Bad Request** - Invalid email format
  ```json
  {
    "success": false,
    "message": "Invalid email format"
  }
  ```

- **400 Bad Request** - Password too short
  ```json
  {
    "success": false,
    "message": "Password must be at least 8 characters long"
  }
  ```

- **409 Conflict** - Email already exists
  ```json
  {
    "success": false,
    "message": "User with this email already exists"
  }
  ```

---

### 2. Login

Authenticate an existing user and receive a JWT token.

**Endpoint:** `POST /auth/login`

**URL:** `http://localhost:5000/api/auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Request Fields:**
- `email` (string, required): User's email address
- `password` (string, required): User's password

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "jwt-token-string"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Missing required fields
  ```json
  {
    "success": false,
    "message": "Email and password are required"
  }
  ```

- **400 Bad Request** - Invalid email format
  ```json
  {
    "success": false,
    "message": "Invalid email format"
  }
  ```

- **401 Unauthorized** - Invalid credentials
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

---

### 3. Get Profile

Get the current authenticated user's profile information.

**Endpoint:** `GET /auth/profile`

**URL:** `http://localhost:5000/api/auth/profile`

**Authentication:** Required (JWT token)

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:** None

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "uuid-string",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- **401 Unauthorized** - Missing or invalid token
  ```json
  {
    "success": false,
    "message": "Authorization header is missing"
  }
  ```

- **401 Unauthorized** - Invalid token format
  ```json
  {
    "success": false,
    "message": "Invalid authorization header format. Expected: Bearer <token>"
  }
  ```

- **401 Unauthorized** - Token expired or invalid
  ```json
  {
    "success": false,
    "message": "Token has expired"
  }
  ```

- **404 Not Found** - User not found
  ```json
  {
    "success": false,
    "message": "User not found"
  }
  ```

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message description"
}
```

In development mode, the error response may also include a `stack` field with the error stack trace.

---

## User Roles

- `USER` - Regular user (default)
- `ADMIN` - Administrator

---

## Notes for Frontend Developers

1. **Token Storage:** After successful signup or login, store the `token` from the response. You'll need it for authenticated requests.

2. **Token Usage:** Include the token in the `Authorization` header for all protected endpoints:
   ```
   Authorization: Bearer <token>
   ```

3. **Token Expiration:** JWT tokens expire after a set time (default: 1 hour). Handle token expiration by redirecting users to login.

4. **Password Requirements:** 
   - Minimum 8 characters
   - Passwords are hashed and never returned in responses

5. **Email Validation:** Email must be in valid format (e.g., `user@example.com`)

6. **Error Handling:** Always check the `success` field in responses. If `success` is `false`, display the `message` to the user.

---

## Example Frontend Usage

### Sign Up
```javascript
const response = await fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe'
  })
});

const data = await response.json();
if (data.success) {
  // Store token
  localStorage.setItem('token', data.data.token);
  // Store user data
  localStorage.setItem('user', JSON.stringify(data.data.user));
}
```

### Login
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
if (data.success) {
  // Store token
  localStorage.setItem('token', data.data.token);
  // Store user data
  localStorage.setItem('user', JSON.stringify(data.data.user));
}
```

### Get Profile
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:5000/api/auth/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});

const data = await response.json();
if (data.success) {
  // Use profile data
  console.log(data.data);
}
```

