# 🎓 Learning Management System (LMS)

A full-stack Learning Management System (LMS) built using **Spring Boot**, **React.js**, and **MySQL**. It includes robust security, role-based access control, OTP-based password reset, and dynamic course management. The project follows an MVC architecture and separates frontend and backend cleanly.

## 🔧 Tech Stack

### Backend
- Java 23
- Spring Boot
- Spring Security 6 (JWT-based)
- Spring Data JPA + Hibernate
- MySQL database
- RESTful APIs using HTTP methods (GET, POST, PUT, DELETE)
- OTP-based password reset
- MVC Architecture

### Frontend
- React.js (with Hooks, React Router)
- Axios (custom instance for API communication)
- Bootstrap / Tailwind CSS
- Protected routes using role-based auth

### Tools
- Postman (API Testing)
- Git & GitHub
- VS Code / IntelliJ
- npm

---

## ✨ Features

- JWT-based login and secure APIs
- Role-based access (Admin/User)
- Admin manages courses (CRUD)
- YouTube video links for course content
- OTP-based password reset
- Spring MVC Architecture
- Protected routes with React
- Axios instance with JWT token interceptors
- .gitignore configured
- MySQL with JPA Repositories

---

## 🚀 Running the Project

### Prerequisites
- Java 23
- Node.js and npm
- MySQL
- Git

### Backend
```bash
git clone https://github.com/vihang-dandawar/Learning-Management-System.git
cd backend
# Update application.properties with your DB details
# Run the Spring Boot app
