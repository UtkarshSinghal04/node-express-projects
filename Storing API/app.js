const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors'); // Required for async error handling in routes
const port = process.env.PORT || 5000;
const errorMiddleware = require('./middleware/errorHandler');
const notFoundMiddleware = require('./middleware/notFound');
const connectdb = require('./db/connect');
const products = require('./routes/products');

// Middleware setup
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.status(200).send('<h1>Store API</h1><a href="/api/v1/products">product list</a>');
});

app.use('/api/v1/products', products);

// Error and Not Found Middleware
app.use(notFoundMiddleware);  // For 404 errors
app.use(errorMiddleware);     // For other errors

// Start server
const start = async () => {
    try {
        await connectdb(process.env.Mongo_URL);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (err) {
        console.error(err);  // Make sure to log the error correctly
    }
};

start();