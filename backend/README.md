🔐 Secure Node.js Authentication System
A robust and production-ready authentication system featuring Role-Based Access Control (RBAC), secure cookie handling, and modern validation techniques.

🚀 Features
JWT-based Auth: Secure authentication using JSON Web Tokens.

HttpOnly Cookies: Protection against XSS by storing tokens in secure cookies.

RBAC: Role-Based Access Control (Standard User & Admin roles).

Security First: Password hashing with Bcrypt and secure headers with Helmet.

Fast Validation: High-performance input validation via Fastest-Validator.

Clean Architecture: Separated Concerns (Models, Controllers, Routes, Middleware).

🛠 Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose ODM)

Security: JWT, Bcrypt, Helmet, CORS, Cookie-Parser

Logger: Morgan

Deployment: Vercel

⚙️ Installation & Setup
Clone the repository:

Bash
git clone https://github.com/R-Mohammadzadeh/NODE.JS-AUTH_PR.git
cd NODE.JS-AUTH_PR
Install dependencies:

Bash
npm install
Environment Variables:
Create a .env file in the root directory and add the following:

Code-Snippet
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the application:

Bash
# Development mode
npm run dev

# Production mode
npm start
🌐 Live Demo
You can access the live application here:

https://node-js-auth-pr.vercel.app