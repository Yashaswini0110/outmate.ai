const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per `window` (here, per 1 minute)
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests",
            error_code: "RATE_LIMIT_EXCEEDED"
        });
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;
