const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth'); 
const { register, login, forgotPassword, resetPassword, getMe } = require('../controllers/authController');

// All these routes will be prefixed with /auth in app.js
router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/me', isAuth, getMe);

// Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    return res.redirect('/login');
});

module.exports = router;