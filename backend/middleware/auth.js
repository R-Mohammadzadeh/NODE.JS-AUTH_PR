const jwt = require('jsonwebtoken');

/**
 * Middleware to check if the user is authenticated via JWT cookie
 */
exports.isAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // Redirect to login if no token is found in cookies
        return res.redirect('/login');
    }

    try {
        // Verify the token using the secret key
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        
        // Attach the user payload (id, role, email) to the request object
        req.user = payload;
        next();
    } catch (error) {
        // Clear invalid cookie and redirect to login
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

/**
 * Middleware to restrict access to admin users only
 */
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};