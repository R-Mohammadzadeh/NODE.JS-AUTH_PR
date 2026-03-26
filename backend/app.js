const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const fs = require('fs');
const morgan = require("morgan");
const cors = require('cors'); 
const cookieParser = require('cookie-parser');

dotenv.config();
const connectDB = require("./config/connectDB");
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/testRouter');
const errorHandler = require("./middleware/errorHandling");
const { isAuth } = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 7000;

connectDB();

// 1. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(morgan("dev"));

// 2. Paths
const frontendPath = path.join(process.cwd(), 'frontend');
app.use(express.static(frontendPath));

// 3. API Routes
app.use('/auth', authRouter);
app.use('/api', userRouter);

// 4. Frontend View Routes
app.get('/', (req, res) => res.sendFile(path.join(frontendPath, 'login.html')));
app.get('/login', (req, res) => res.sendFile(path.join(frontendPath, 'login.html')));

app.get('/dashboard', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'user-dashboard.html'));
});

app.get('/admin-dashboard', isAuth, (req, res) => {
    res.sendFile(path.join(frontendPath, 'admin-dashboard.html'));
});

// 5. Logout
app.get('/auth/logout', (req, res) => {
    res.clearCookie('token'); 
    res.redirect('/login');    
});

// 6. ERROR HANDLER 
app.use(errorHandler);

// 7. 404 HANDLER 
app.use((req, res) => {
    const errorPage = path.join(frontendPath, '404.html');
    if (fs.existsSync(errorPage)) {
        res.status(404).sendFile(errorPage);
    } else {
        res.status(404).send("<h1>404</h1><p>Page Not Found</p><a href='/'>Go Home</a>");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});