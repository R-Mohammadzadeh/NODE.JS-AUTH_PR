const errorHandler = (error, req, res, next) => {
    // Log the error for the developer
    console.error('Error:', error.message);

    const statusCode = error.status || 500;
    const isProduction = process.env.NODE_ENV === 'production';

    res.status(statusCode).json({
        message: error.message || 'Internal server error',
        // Only show stack trace if NOT in production
        stack: isProduction ? null : error.stack
    });
};

module.exports = errorHandler;