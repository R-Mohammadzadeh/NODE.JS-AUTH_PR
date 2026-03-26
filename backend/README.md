# 🔐 Secure Node.js Authentication System

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=flat&logo=vercel)](https://node-js-auth-pr.vercel.app)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.x-blue.svg)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-green?style=flat&logo=mongodb)](https://www.mongodb.com/cloud/atlas)

A robust, production-ready authentication system built with **Node.js** and **Express**. This project implements a secure login/registration flow with role-based access control, advanced security headers, and cloud-native deployment.

---

## 🚀 Key Features

* **JWT-based Authentication:** Secure sessions using JSON Web Tokens.
* **HttpOnly Cookies:** Protection against XSS attacks by storing tokens in secure, server-side cookies.
* **RBAC (Role-Based Access Control):** Dedicated routes and dashboards for `Standard Users` and `Admins`.
* **Security First:** * Password hashing with **Bcrypt**.
    * Secure HTTP headers with **Helmet**.
    * CORS configuration for controlled cross-origin access.
* **Serverless Optimized:** Custom MongoDB connection logic to handle "Cold Starts" and prevent "Error 500" on Vercel.
* **Input Validation:** High-performance schema validation via **Fastest-Validator**.
* **Analytics Integrated:** Support for Google Analytics to track user engagement.
* **Clean Architecture:** Separated concerns with Models, Controllers, Middleware, and Routes.

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Security:** JWT, Bcrypt, Helmet, Cookie-Parser
* **Monitoring:** Google Analytics, Morgan (Logger)
* **Deployment:** Vercel (Serverless Functions)

---

## ⚙️ Installation & Local Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/R-Mohammadzadeh/NODE.JS-AUTH_PR.git](https://github.com/R-Mohammadzadeh/NODE.JS-AUTH_PR.git)
cd NODE.JS-AUTH_PR


Markdown
# 🔐 Secure Node.js Authentication System

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=flat&logo=vercel)](https://node-js-auth-pr.vercel.app)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.x-blue.svg)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-green?style=flat&logo=mongodb)](https://www.mongodb.com/cloud/atlas)

A robust, production-ready authentication system built with **Node.js** and **Express**. This project implements a secure login/registration flow with role-based access control, advanced security headers, and cloud-native deployment.

---

## 🚀 Key Features

* **JWT-based Authentication:** Secure sessions using JSON Web Tokens.
* **HttpOnly Cookies:** Protection against XSS attacks by storing tokens in secure, server-side cookies.
* **RBAC (Role-Based Access Control):** Dedicated routes and dashboards for `Standard Users` and `Admins`.
* **Security First:** * Password hashing with **Bcrypt**.
    * Secure HTTP headers with **Helmet**.
    * CORS configuration for controlled cross-origin access.
* **Serverless Optimized:** Custom MongoDB connection logic to handle "Cold Starts" and prevent "Error 500" on Vercel.
* **Input Validation:** High-performance schema validation via **Fastest-Validator**.
* **Analytics Integrated:** Support for Google Analytics to track user engagement.
* **Clean Architecture:** Separated concerns with Models, Controllers, Middleware, and Routes.

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Security:** JWT, Bcrypt, Helmet, Cookie-Parser
* **Monitoring:** Google Analytics, Morgan (Logger)
* **Deployment:** Vercel (Serverless Functions)

---

## ⚙️ Installation & Local Setup

### 1. Clone the Repository
```bash
git (https://github.com/R-Mohammadzadeh/NODE.JS-AUTH_PR.git)
cd NODE.JS-AUTH_PR
2. Install Dependencies
Bash
npm install
3. Environment Setup
Create a .env file in the root directory and fill in your credentials:

Code-Snippet
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
4. Run the App
Bash
# Development (with nodemon)
npm run dev

# Production
npm start
🔌 API Endpoints & Routes
Authentication
Method	Endpoint	Description
POST	/auth/register	Create a new account
POST	/auth/login	Authenticate & get HttpOnly cookie
GET	/auth/logout	Clear session and redirect to login
Protected Views
Route	Access	Description
/dashboard	User/Admin	General user overview
/admin-dashboard	Admin Only	Administrative control panel
🌐 Deployment & Reliability
This project is optimized for Vercel.

Database Resilience: The connection logic includes a serverSelectionTimeoutMS and readyState checks to handle the "Sleep/Wake" cycle of free-tier MongoDB clusters.

Network Security: Database access is restricted via IP Whitelisting (0.0.0.0/0 for Vercel dynamic IPs).

🔗 Live Demo
Check out the live version here:

👉 https://node-js-auth-pr.vercel.app

📝 Next Steps for this Project:
[ ] Add Email Verification (Nodemailer).

[ ] Implement "Forgot Password" with OTP.

[ ] Add Social Login (Google/GitHub).
