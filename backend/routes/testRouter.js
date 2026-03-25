const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../middleware/auth');
const { UserModel } = require('../models/UserModel');

/**
 * Get current user profile data
 * Access: Private
 */
router.get('/user', isAuth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password').lean();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: "User profile data", user });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * List all users (Admin only)
 * Access: Private/Admin
 */
// Changed path to avoid conflict with /user
router.get('/admin/all-users', isAuth, isAdmin, async (req, res) => {
    try {
        const users = await UserModel.find().select('-password').sort({ createdAt: -1 });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
});

/**
 * Public Info Page
 * Access: Public
 */
router.get('/about', async (req, res) => {
    res.json({ message: 'This website is free for all' });
});

/**
 * Update user profile
 * Access: Private
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


router.delete('/user/:id' , isAuth , isAdmin , async (req , res , next) => {
    const {deleteUser} = require('../controllers/authController') 
    return deleteUser(req,res,next)
})




module.exports = router;