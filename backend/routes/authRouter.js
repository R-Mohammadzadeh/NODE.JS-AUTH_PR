const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../middleware/auth'); 

// Import authentication controllers
const { register, login, deleteUser, forgotPassword, resetPassword , getMe } = require('../controllers/authController');

// Authentication routes
router.post('/register', register);
router.post('/login', login);
// router.post('/logout', logout);

router.delete('/user/:id', isAuth, isAdmin, deleteUser);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
// routes/authRouter.js
router.get('/me', isAuth, getMe);
module.exports = router;