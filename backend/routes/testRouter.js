const express = require('express');
const router = express.Router();
const { isAuth, isAdmin, isUser } = require('../middleware/auth');
const { UserModel } = require('../models/UserModel');
const { deleteUser } = require('../controllers/authController'); // Imported at the top for cleaner code

/**
 * @route   GET /auth/logout
 * @desc    Log out the user by clearing the authentication cookie
 * @access  Private
 */
router.get('/logout', (req, res) => {
    res.clearCookie('token', {
        path: '/',
        // Ensure settings (secure, sameSite) match your login configuration
    });
    return res.status(200).json({ message: "Logged out successfully" });
});

/**
 * @route   GET /api/user
 * @desc    Fetch the current logged-in user's profile data
 * @access  Private
 */
router.get('/user', isAuth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password').lean();
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        return res.status(200).json({ message: "User profile data retrieved", user });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * @route   GET /api/admin/all-users
 * @desc    Retrieve a list of all registered users
 * @access  Private/Admin
 */
router.get('/admin/all-users', isAuth, isAdmin, async (req, res) => {
    try {
        const users = await UserModel.find().select('-password').sort({ createdAt: -1 });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
});

/**
 * @route   PUT /api/profile/update
 * @desc    Update the current user's name and family name
 * @access  Private
 */
router.put('/profile/update', isAuth, async (req, res) => {
    try {
        const { name, family } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user.id,
            { name, family },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
});

/**
 * @route   DELETE /api/user/:id
 * @desc    Delete a specific user by ID
 * @access  Private/Admin
 */
router.delete('/user/:id', isAuth, isAdmin, deleteUser);

/**
 * @route   GET /api/about
 * @desc    Provide public information about the service
 * @access  Public
 */
router.get('/about', async (req, res) => {
    res.json({ message: 'This website is free for all' });
});

module.exports = router;