module.exports = (err, req, res, next) => {
    console.error("❌ Global Error Handler:", err.stack || err.message);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.name || "InternalServerError",
        message: err.message || "Something went wrong on the server",
    });
};