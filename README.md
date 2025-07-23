# 🏥 Clinically - Doctor-Patient Clinic Platform

Welcome to **Clinically**, a responsive web platform that connects patients with nearby clinics and allows doctors to create and manage their clinic profiles.

🌐 **Live Demo**: [https://clinically-viraj.vercel.app/](https://clinically-viraj.vercel.app/)

---

## ✨ Features

- 👨‍⚕️ **Doctor Login/Signup**
- 🏥 **Add and Manage Clinics** with location
- 📍 **Map Integration** to display clinic locations using Leaflet
- 🔐 **Authentication**
  - JWT-based
  - Email verification
  - Forgot/Reset password functionality
- 🧑‍⚕️ **Patient Side**
  - Search and view clinics
- 🎯 **Responsive Design** for all screen sizes
- 💡 **Role-Based Routing**

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Redux Toolkit** (state management)
- **React Router DOM**
- **Axios** (API handling)
- **Tailwind CSS** (styling)
- **React Leaflet** (map integration)

### Backend (deployed separately)
- **Node.js + Express.js**
- **MongoDB Atlas** with Mongoose
- **JWT Authentication**
- **GeoSpatial Queries** (for nearby clinic search)
- **CORS & Cookie-based Sessions**

---

## 🔗 API Routes Overview

- `/api/v1/signup`
- `/api/v1/login`
- `/api/v1/send-otp`
- `/api/v1/verify-email`
- `/api/v1/forgot-password`
- `/api/v1/reset-password/:token`
- `/api/v1/add-clinic`
- `/api/v1/showClinics` (supports geo queries)

---
