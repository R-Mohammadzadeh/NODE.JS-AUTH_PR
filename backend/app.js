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

// Connect to Database
connectDB();

// 1. Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(cookieParser());
app.use(morgan("dev"));

// 2. Static Files Configuration
const frontendPath = path.resolve(__dirname, '..', 'frontend');

if (fs.existsSync(frontendPath)) {
    console.log("SUCCESS: Frontend folder found at:", frontendPath);
} else {
    console.log("ERROR: Frontend folder NOT found at:", frontendPath);
}

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, '..', 'frontend')));


// 3. API Routes
app.use('/auth', authRouter);
app.use('/api', userRouter);

// 4. Frontend View Routes
// Root path redirects to login
app.get('/', (req, res) => {
  const loginPage = path.join(__dirname, '..', 'frontend', 'login.html');
    res.sendFile(loginPage);
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(frontendPath, 'login.html'));
});

// Dashboard route with Authentication check
app.get('/dashboard', isAuth, (req, res) => {
    // Note: You can check role here to send different dashboards if needed
    res.sendFile(path.join(frontendPath, 'user-dashboard.html'));
});

app.get('/profile', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'profile.html'));
});

app.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.join(frontendPath, 'reset-password.html'));
});



// User Dashboard Route
app.get('/user-dashboard', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'user-dashboard.html'));
});

// Admin Dashboard Route (Ensure this matches your filename)
app.get('/admin-dashboard', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'admin-dashboard.html'));
});

app.get('/auth/logout', (req, res) => {
    res.clearCookie('token'); 
    res.redirect('/login');    
});


app.get('/admin/all-users', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'admin-users.html'));
});



app.use(errorHandler);


app.use((req, res) => {
    // Look for 404 inside frontend folder first
    const errorPage = path.join(frontendPath, '404.html');
    if (fs.existsSync(errorPage)) {
        res.status(404).sendFile(errorPage);
    } else {
        res.status(404).send("Page Not Found");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});