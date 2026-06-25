# 🔐 Authentication Service for Store Locator

A production-ready authentication and authorization service built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **JWT**.

This project serves as the authentication backend for a Store Locator application and implements modern authentication features used in real-world applications, including Email Verification, Google OAuth 2.0, JWT Authentication, Refresh Token Rotation, Password Recovery, and Two-Factor Authentication (TOTP) with Google Authenticator.

---

## ✨ Features

### Authentication

* User Registration
* User Login
* User Logout
* Secure Password Hashing
* Email Verification
* Forgot Password
* Password Reset

### JWT Authentication

* Access Tokens
* Refresh Tokens
* Refresh Token Rotation
* Token Versioning

### OAuth

* Google OAuth 2.0 Login
* Automatic Account Creation
* Verified Google Account Validation

### Two-Factor Authentication (2FA)

* TOTP-Based Authentication
* Google Authenticator Integration
* 2FA Setup & Verification
* Secret Generation and Validation

### Email Services

* Verification Emails
* Password Reset Emails
* SMTP Mail Transport Integration

### Security

* Password Hashing
* JWT Signing & Verification
* SHA-256 Reset Token Hashing
* Email Verification Enforcement
* HTTP-Only Refresh Token Cookies
* Input Validation using Zod
* Refresh Token Invalidation

---

## 🌍 Project Overview

This authentication service was developed as the backend authentication layer for a Store Locator application.

The service handles:

* User Registration
* Secure Login
* Email Verification
* Google Sign-In
* Password Recovery
* Two-Factor Authentication
* JWT-Based Session Management

The authentication module is designed as a standalone service and can be integrated into any web application requiring secure user management.

---

## 🏗️ Tech Stack

### Backend

* TypeScript
* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* Google OAuth 2.0
* TOTP (Google Authenticator)

### Validation

* Zod

### Security

* bcrypt
* crypto
* jsonwebtoken
* otplib

### Email

* Nodemailer

---

## 🔄 Authentication Flow

### Registration

1. User submits registration details.
2. Password is hashed before storage.
3. Verification token is generated.
4. Verification email is sent.
5. User verifies account through email link.

---

### Login

1. User submits credentials.
2. Password hash is verified.
3. Email verification status is checked.
4. If 2FA is enabled, TOTP code is validated.
5. Access and Refresh Tokens are generated.
6. Refresh Token is stored in an HTTP-only cookie.

---

### Refresh Token Flow

1. Refresh Token is read from cookies.
2. Token validity is verified.
3. Token version is checked.
4. New Access Token is issued.
5. New Refresh Token is generated.

---

### Password Recovery

1. User requests password reset.
2. Secure reset token is generated.
3. SHA-256 hash of token is stored.
4. Reset link is emailed to user.
5. User submits new password.
6. Password is updated.
7. Existing sessions are invalidated.

---

### Google OAuth Flow

1. User selects "Continue with Google".
2. Redirected to Google Consent Screen.
3. Google verifies identity.
4. Account is created if necessary.
5. JWT tokens are generated.
6. User is authenticated.

---

### Two-Factor Authentication Flow

#### Setup

1. Generate TOTP Secret.
2. Create Authenticator URI.
3. Scan QR code with Google Authenticator.
4. Store secret securely.

#### Verification

1. User enters TOTP code.
2. Code is validated.
3. 2FA is enabled for account.

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint                     | Description          |
| ------ | ---------------------------- | -------------------- |
| POST   | `/api/v1/auth/register`      | Register User        |
| GET    | `/api/v1/auth/verify-email`  | Verify Email         |
| POST   | `/api/v1/auth/login`         | Login                |
| POST   | `/api/v1/auth/logout`        | Logout               |
| POST   | `/api/v1/auth/refresh-token` | Refresh Access Token |

### Password Recovery

| Method | Endpoint                       | Description            |
| ------ | ------------------------------ | ---------------------- |
| POST   | `/api/v1/auth/forgot-password` | Request Password Reset |
| POST   | `/api/v1/auth/reset-password`  | Reset Password         |

### Google OAuth

| Method | Endpoint                       | Description           |
| ------ | ------------------------------ | --------------------- |
| GET    | `/api/v1/auth/google`          | Start Google OAuth    |
| GET    | `/api/v1/auth/google/callback` | Google OAuth Callback |

### Two-Factor Authentication

| Method | Endpoint                  | Description |
| ------ | ------------------------- | ----------- |
| POST   | `/api/v1/auth/2fa/setup`  | Setup 2FA   |
| POST   | `/api/v1/auth/2fa/verify` | Verify 2FA  |

---

## 🛠️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/auth-service.git
cd auth-service
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=2000

MONGO_URI=

APP_URL=http://localhost:2000

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_EMAIL_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

---

## 📁 Project Structure

```text
src/
│
├── controllers/
├── routes/
├── middleware/
├── models/
├── schemas/
├── utils/
│
├── auth/
│   ├── register
│   ├── login
│   ├── refresh-token
│   ├── google-oauth
│   ├── email-verification
│   ├── forgot-password
│   └── two-factor-auth
│
└── server.ts
```

---

## 🔒 Security Measures

* Passwords stored as hashes
* JWT-based authentication
* Refresh Token Rotation
* Token Versioning
* Email Verification Enforcement
* Secure Password Reset Workflow
* SHA-256 Token Hashing
* HTTP-Only Cookies
* TOTP-Based 2FA
* Input Validation with Zod

---

## 🚀 Future Enhancements

* Role-Based Access Control (RBAC)
* Account Lockout Protection
* Login Rate Limiting
* Session Management Dashboard
* Audit Logging
* QR Code Generation for 2FA
* WebAuthn / Passkeys Support

---


## 👨‍💻 Author

**Nischal Swami**

Backend Developer | Systems Programmer | Security Enthusiast

Built as part of a Store Locator application while exploring secure authentication systems and production-ready backend architecture.
