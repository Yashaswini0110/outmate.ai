require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const enrichRoute = require('./routes/enrich');

// Middleware
const limiter = require('./middleware/rateLimiter');
app.use(limiter);
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/enrich', enrichRoute);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
