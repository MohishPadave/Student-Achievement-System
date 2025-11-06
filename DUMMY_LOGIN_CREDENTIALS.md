# Dummy Login Credentials

The VES login system has been removed and replaced with simple dummy authentication for testing purposes.

## Available Test Accounts

### Admin Account
- **Email:** `admin@test.com`
- **Password:** `admin123`
- **Role:** admin

### Student Account
- **Email:** `student@test.com`
- **Password:** `student123`
- **Role:** student

### Faculty Account
- **Email:** `faculty@test.com`
- **Password:** `faculty123`
- **Role:** faculty

## How to Login

### API Endpoint
```
POST /auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "admin123"
}
```

### Response
```json
{
  "success": true,
  "user": {
    "email": "admin@test.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "admin",
    "pic": "https://via.placeholder.com/150"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Get Available Test Accounts
```
GET /auth/test-accounts
```

This will return all available test accounts with their credentials.

## Authentication
After login, include the JWT token in the Authorization header for protected routes:
```
Authorization: Bearer <your-jwt-token>
```

## Notes
- Tokens expire in 1 hour
- All Google OAuth functionality has been removed
- This is for testing purposes only - implement proper authentication for production