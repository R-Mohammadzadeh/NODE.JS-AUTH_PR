const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Database connection
const connectDB = require("./config/connectDB");

// Routes and Middlewares
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/testRouter');
const errorHandler = require("./middleware/errorHandling");
const { isAuth } = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 7000;

// Connect to MongoDB
connectDB();

/* ------------------------------------
    1. Global Middlewares
------------------------------------ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(morgan("dev"));

/* ------------------------------------
    2. Static Files & Path Configuration
------------------------------------ */
// Using process.cwd() ensures paths work correctly on Vercel deployment
const frontendPath = path.join(process.cwd(), 'frontend');

// Debugging: Log if the frontend directory is found
if (fs.existsSync(frontendPath)) {
    console.log("SUCCESS: Frontend folder located at:", frontendPath);
} else {
    console.error("ERROR: Frontend folder NOT found at:", frontendPath);
}

// Serve static assets (CSS, JS, Images) from the frontend folder
app.use(express.static(frontendPath));

/* ------------------------------------
    3. API Routes
------------------------------------ */
app.use('/auth', authRouter);
app.use('/api', userRouter);

/* ------------------------------------
    4. Frontend View Routes
------------------------------------ */

// Root path - Sends the main login page
app.get('/', (req, res) => {
    // Note: Ensure login.html exists directly inside the /frontend folder
    res.sendFile(path.join(frontendPath, 'login.html'));
});

// Login alias
app.get('/login', (req, res) => {
    res.sendFile(path.join(frontendPath, 'login.html'));
});

// Protected Dashboard Route
app.get('/dashboard', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'user-dashboard.html'));
});

// Profile Route
app.get('/profile', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'profile.html'));
});

// Password Reset Route
app.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.join(frontendPath, 'reset-password.html'));
});

// Admin Dashboard Route
app.get('/admin-dashboard', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'admin-dashboard.html'));
});

// Admin Users Management Route
app.get('/admin/all-users', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'admin-users.html'));
});

// Logout Route
app.get('/auth/logout', (req, res) => {
    res.clearCookie('token'); 
    res.redirect('/login');    
});

/* ------------------------------------
    5. Error Handling
------------------------------------ */

// Centralized error handler middleware
app.use(errorHandler);

// 404 Not Found Handler (Fallback for undefined routes)
app.use((req, res) => {
    const errorPage = path.join(frontendPath, '404.html');
    if (fs.existsSync(errorPage)) {
        res.status(404).sendFile(errorPage);
    } else {
        res.status(404).send("Page Not Found");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});