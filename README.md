# OrthoCare
A digital platform for orthopedic patients to receive guided physical therapy exercises, monitor their recovery progress, and consult with orthopedic specialists remotely.

## Table of Contents
- Introduction
- Project Setup
- Prerequisites
- Installation Instructions
- Authentication & Authorization
- User Authentication
- User Authorization
- API Endpoints
- Appointment Routes
- Auth Routes
- Consultation Routes
- Doctor Routes
- Exercise Routes
- Message Routes
- Patient Routes
- Patient Exercise Routes
- User Routes
- Middleware
- Authentication Middleware
- File Upload
- Environment Configuration
- Running the Project
- Error Handling
- Testing
- Contribution
- License


## Introduction
OrthoCare is a platform designed to provide orthopedic patients with guided physical therapy exercises, remote consultations with doctors, and the ability to track their recovery progress. The system enables users to book appointments, communicate with their doctors, and monitor their exercise performance.

# Project Setup
- Prerequisites
Node.js (v14 or higher)
MongoDB (local or cloud instance)
Postman for API testing
JWT (JSON Web Tokens) for secure API requests
Nodemailer for email notifications
Multer for file uploads (optional, for profile pictures)


## Installation Instructions

Clone the repository:
git clone https://github.com/opiziepazzle/OrthoCare.git

Navigate to the project directory:
cd OrthoCare

Install dependencies:
npm install

Set up environment variables (create a .env file in the root directory):
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
JWT_KEY=your-jwt-secret
SESSION_SECRET=your-secret

Start the server:
npm start


## Authentication & Authorization

- User Authentication

Signup: Allows users to register by providing their email, password, and profile details.
POST /signup: Registe@rs a new user.
Login: Users can authenticate using email and password to receive a JWT token for secure access.
POST /login: Logs in a user and returns a JWT token.
User Authorization
JWT: The application uses JWT to protect routes. All sensitive routes require authentication via JWT. The checkAuth middleware is used to ensure that the request includes a valid token.


## API Endpoints

# Appointment Routes
POST /appointments: Create a new appointment (requires authentication).
POST /appointments/check-slot: Check appointment availability (requires authentication).
GET /appointments/:appointmentId: Get an appointment by ID (requires authentication).
PATCH /appointments/:appointmentId/status: Update appointment status (requires authentication).
GET /appointments: List all appointments (requires authentication).

# Auth Routes
GET /users/verify-email: Verify email address (via link).
POST /users/resend-verification-email: Resend the verification email.
POST /users/request-reset-password: Request password reset (via OTP).
POST /users/reset-password: Reset the user password with OTP.

# Consultation Routes
POST /consultations: Create a consultation (requires authentication).
GET /consultations/:consultationId: Get consultation by ID (requires authentication).
PATCH /consultations/:consultationId: Update consultation (requires authentication).
DELETE /consultations/:consultationId: Delete consultation (requires authentication).
GET /consultations: List consultations (requires authentication).

# Doctor Routes
POST /doctors: Create a doctor profile (requires authentication).
GET /doctors/me: Get the doctor profile (requires authentication).
PATCH /doctors/me: Update the doctor profile (requires authentication).
DELETE /doctors/me: Delete the doctor profile (requires authentication).

# Exercise Routes
POST /exercises: Create a new exercise (requires authentication).
GET /exercises/:exerciseId: Get exercise by ID (requires authentication).
PATCH /exercises/:exerciseId: Update exercise (requires authentication).
DELETE /exercises/:exerciseId: Delete exercise (requires authentication).
GET /exercises: List all exercises (requires authentication).

# Message Routes
POST /messages: Create a message (requires authentication).
GET /messages/:messageId: Get message by ID (requires authentication).
GET /messages: List messages (requires authentication).
PATCH /messages/:messageId: Update message (requires authentication).
DELETE /messages/:messageId: Delete message (requires authentication).

# Patient Routes
POST /patients: Create a patient (requires authentication).
GET /patients/assigned-doctor: Get the assigned doctor for the authenticated patient (requires authentication).
PATCH /patients: Update patient details (requires authentication).
DELETE /patients: Delete patient profile (requires authentication).
POST /patients/assign-doctor: Assign a doctor to the patient (requires authentication).
GET /patients/doctor-patients: List patients assigned to a doctor (requires authentication).
GET /patients: List all patients (requires authentication).

# Patient Exercise Routes
POST /patient-exercises: Create a new patient exercise (requires authentication).
GET /patient-exercises/:patient_exerciseId: Get patient exercise by ID (requires authentication).
PATCH /patient-exercises/:patient_exerciseId/status: Update exercise status (requires authentication).
PATCH /patient-exercises/:patient_exerciseId/progress: Update exercise progress (requires authentication).
GET /patient-exercises: List all patient exercises (requires authentication).

# User Routes
POST /users/signup: User signup (with profile picture upload).
POST /users/login: User login.
PATCH /users/updateProfile: Update user profile (with profile picture upload).
POST /users/logout: User logout.

# Middleware
Authentication Middleware
The checkAuth middleware checks for the presence of a valid JWT token in the request header. It ensures that only authenticated users can access protected routes.

# File Upload
Profile pictures can be uploaded using Multer. The system allows users to upload images with .jpg or .png format, with a size limit of 5MB.

# Environment Configuration
Make sure to configure the following environment variables in the .env file:
EMAIL: Email address for sending verification and password reset emails.
EMAIL_PASSWORD: Password for the email account.
JWT_SECRET: Secret key for generating JWT tokens.
Running the Project
Clone the repository and install dependencies.
Set up the .env file with necessary configuration.

Start the server using:
npm start

The server will run on http://localhost:3007.


# Error Handling
All errors are returned as JSON responses with a descriptive message. Common error responses include:

400 Bad Request: Validation errors.
401 Unauthorized: Invalid or missing authentication token.
404 Not Found: Resource not found.
500 Internal Server Error: Server-side issues.

# Testing
You can test the API using Postman or cURL. Ensure you provide the necessary JWT token in the headers when making requests to protected routes.

# Contribution
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure that your code is well-tested and follows the project's coding conventions.

# License
This project is licensed under the MIT License - see the LICENSE file for details.