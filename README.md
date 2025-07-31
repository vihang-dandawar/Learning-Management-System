# 🎓 Learning Management System (LMS)

A full-stack Learning Management System (LMS) built using **Spring Boot**, **React.js**, and **MySQL**. It includes robust security, role-based access control, OTP-based password reset, **Razorpay dummy payment integration**, and dynamic course management. The project follows an MVC architecture and separates frontend and backend cleanly.

---

## 🔧 Tech Stack

### Backend
- Java 23
- Spring Boot
- Spring Security 6 (JWT-based)
- Spring Data JPA + Hibernate
- MySQL Database
- RESTful APIs (GET, POST, PUT, DELETE)
- OTP-based password reset
- Razorpay dummy payment integration
- MVC Architecture

### Frontend
- React.js (Hooks + React Router)
- Axios (with JWT interceptor)
- Bootstrap / Tailwind CSS
- Role-protected routes

### Tools
- Postman (API Testing)
- Git & GitHub
- IntelliJ / VS Code
- npm

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based login
- Role-based access control (Admin/User)
- Secure REST APIs
- OTP-based password reset system

### 🎓 Course Management
- Admin:
  - Create, update, delete courses
  - Add YouTube video links
- User:
  - View course list
  - View detailed course content **only after purchase**
  - Access restricted to purchased courses

### 💳 Razorpay Integration
- Dummy Razorpay payment gateway for purchasing courses
- Checkout form initiates payment (test mode)
- After successful payment, course is unlocked for that user
- Backend enforces access control based on purchase status

### 🛡️ Security
- Spring Security 6 + JWT
- JWT stored in sessionStorage
- Axios interceptors automatically attach JWT to requests
- Protected React routes based on user roles

---

## 📁 Project Structure

### Backend (Spring Boot)
src/
├── controller/
├── model/
├── repository/
├── service/
├── config/
└── util/


### Frontend (React)
src/
├── components/
├── pages/
├── services/
├── routes/
└── App.js



---

## 📦 API Endpoints Overview

| Endpoint                         | Method | Description                         |
|----------------------------------|--------|-------------------------------------|
| /api/auth/login                  | POST   | Login and get JWT token             |
| /api/auth/register               | POST   | Register user                       |
| /api/auth/forgot-password        | POST   | Send OTP for password reset         |
| /api/auth/verify-otp             | POST   | Verify OTP and set new password     |
| /api/courses                     | GET    | List all courses                    |
| /api/courses/{id}                | GET    | Get course details                  |
| /api/courses                     | POST   | (Admin) Create course               |
| /api/course-purchase             | POST   | Purchase course (Razorpay)          |
| /isCoursePurchased?courseId=ID  | GET    | Check if user has purchased course  |

---

## 🚀 Running the Project

### ✅ Prerequisites
- Java 23+
- Node.js and npm
- MySQL
- Git

---

## 🔙 Backend Setup (Spring Boot)

```bash
git clone https://github.com/vihang-dandawar/Learning-Management-System.git
cd backend

# Update application.properties with the following:
# - Database URL, username, and password
# - JWT secret
# - Razorpay test key_id and key_secret

# Example properties (src/main/resources/application.properties)
spring.datasource.url=jdbc:mysql://localhost:3306/lms
spring.datasource.username=root
spring.datasource.password=your_password

jwt.secret=your_jwt_secret

razorpay.key_id=your_test_key
razorpay.key_secret=your_test_secret

# Run the application
./mvnw spring-boot:run



Future Enhancements
Real email OTP delivery (SMTP / SendGrid)
Upload video instead of just YouTube link
Course progress tracking
Certificate generation (PDF)
Instructor dashboard

