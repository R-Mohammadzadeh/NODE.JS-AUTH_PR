const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../middleware/auth');
const { UserModel } = require('../models/UserModel');
const { deleteUser } = require('../controllers/authController');

// All these routes will be prefixed with /api in app.js

// Get current user profile -> /api/user
router.get('/user', isAuth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password').lean();
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: "User profile data retrieved", user });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Admin: Get all users -> /api/admin/all-users
router.get('/admin/all-users', isAuth, isAdmin, async (req, res) => {
    try {
        const users = await UserModel.find().select('-password').sort({ createdAt: -1 });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
});

// Update profile -> /api/profile/update
router.put('/profile/update', isAuth, async (req, res) => {
    try {
        const { name, family } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user.id,
            { name, family },
            { new: true, runValidators: true }
        ).select('-password');
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
});

// Admin: Delete user -> /api/user/:id
router.delete('/user/:id', isAuth, isAdmin, deleteUser);

module.exports = router;