const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const code = err.code || "INTERNAL_ERROR";

    res.status(status).json({
        error: message,
        error_code: code
    });
};

module.exports = errorHandler;
