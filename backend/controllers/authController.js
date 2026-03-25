const  UserModel  = require('../models/UserModel');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 


// --- Register ---
exports.register = async (req, res, next) => {
    const { email, password, name, family } = req.body;
    try {
        const userCount = await UserModel.countDocuments();
        const role = userCount === 0 ? 'admin' : 'user';

        const existUser = await UserModel.findOne({ email }).lean();
        if (existUser) return res.status(409).json({ message: "Email already exists" });

        const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 12;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await UserModel.create({ email, password: hashedPassword, role, name, family });
        const userSafe = user.toObject();
        delete userSafe.password;

        return res.status(201).json({ message: "User registered successfully", user: userSafe });
    } catch (error) { next(error); }
};

// --- Login ---
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.SECRET_KEY, { expiresIn: '24h' });
        const isProduction = process.env.NODE_ENV === 'production';

        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        });

        return res.status(200).json({ message: "Login successful", user: { email: user.email, role: user.role } });
    } catch (error) { next(error); }
};

// --- Delete 
exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id === req.user.id) return res.status(400).json({ message: "You cannot delete your own account." });

        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) { next(error); }
};


// --- Forgot Password ---
exports.forgotPassword = async (req, res, next) => {
    let user; 
    try {
        const { email } = req.body;
        user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found with this email." });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; 
        await user.save({ validateBeforeSave: false });

        const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

      
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });

        const mailOptions = {
            from: `Auth System <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Password Reset Link (Valid for 10 min)',
            html: `
                <div style="font-family: sans-serif; text-align: center;">
                    <h3>Reset Your Password</h3>
                    <p>Click the button below to set a new password:</p>
                    <a href="${resetURL}" style="display:inline-block; padding:10px 20px; background:#e8716d; color:#fff; text-decoration:none; border-radius:5px;">Reset Password</a>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Reset link sent to your email!" });

    } catch (error) {
        if (user) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
        }
        next(error);
    }
};

// --- Reset Password ---
exports.resetPassword = async (req, res, next) => {
    try {
        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest('hex'); // FIXED: added dot before digest

        const user = await UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: "Token is invalid or has expired" });

        const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 12;
        user.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();
        res.status(200).json({ message: "Password reset successful!" });
    } catch (error) { next(error); }
};


// Get current user profile info
exports.getMe = async (req , res , next) => {
    try{
const user = await UserModel.findById(req.user.id) ;

if(!user){
    return res.status(404).json({ message: "User not found" })
}

res.status(200).json({
    status :'success' ,
    data : {
        name : user.name ,
        family : user.family,
        email:user.email
    }
})

    }
    catch(error){
next(error)
    }
}
