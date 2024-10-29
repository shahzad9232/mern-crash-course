// middlewares/errorMiddleware.js

// Handle 404 Not Found
export const notFound = (req, res, next) => {
    res.status(404);
    res.json({ message: 'Not Found' });
};

// General error handler
export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
