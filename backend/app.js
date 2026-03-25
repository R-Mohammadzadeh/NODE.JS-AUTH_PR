const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const path = require('path');

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

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/auth', authRouter);
app.use('/api', userRouter);

// Frontend Routes (View Controllers)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/profile', isAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/profile.html'));
});


app.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/reset-password.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/dashboard', isAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

// Global Error Handling Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});