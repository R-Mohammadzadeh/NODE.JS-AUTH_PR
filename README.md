# 🔐 Secure Node.js Authentication System

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=flat&logo=vercel)](https://node-js-auth-pr.vercel.app)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.x-blue.svg)](https://nodejs.org)

A robust, production-ready authentication system built with **Node.js** and **Express**.

---

## 🚀 Key Features
* **JWT-based Authentication:** Secure sessions using JSON Web Tokens.
* **HttpOnly Cookies:** Protection against XSS attacks.
* **RBAC:** Roles for `Standard Users` and `Admins`.
* **Security:** Password hashing with **Bcrypt** and **Helmet** headers.

## 🛠 Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Deployment:** Vercel

## ⚙️ Installation
```bash
git clone [https://github.com/R-Mohammadzadeh/NODE.JS-AUTH_PR.git](https://github.com/R-Mohammadzadeh/NODE.JS-AUTH_PR.git)
cd NODE.JS-AUTH_PR
npm install
npm start
``` 

🌐 Live Demo
Live Demo: [https://node-js-auth-pr.vercel.app](https://node-js-auth-pr.vercel.app)
## 📂 Project Structure
```backend/
├── config/ 
│   └── connectDB.js
├── controllers/
├── middleware/
├── models/
├── routes/
└── utils/
```
## 🔒 Security Measures 
* **Password Hashing:** Using Bcrypt for secure password storage.
* **Helmet:** Setting secure HTTP headers.  
* **Input Validation:** Preventing injection attacks.
* **CORS:** Configured to allow only trusted origins.
## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
## 🙏 Acknowledgments
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [Vercel](https://vercel.com/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Helmet](https://www.npmjs.com/package/helmet)
* [JSON Web Tokens](https://jwt.io/)
## 📧 Contact
For any inquiries, please contact [your-email@example.com](mailto:your-email@example.com)
## 🌟 Star the Repository
If you find this project useful, consider giving it a star on GitHub!   
[![GitHub Stars](https://img.shields.io/github/stars/R-Mohammadzadeh/NODE.JS-AUTH_PR?style=social)](https://github.com/R-Mohammadzadeh/NODE.JS-AUTH_PR/stargazers)
