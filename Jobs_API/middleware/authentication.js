const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present and properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Provide valid authorization');
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    try {
        // Verify the token using the correct order of arguments
        const payload = jwt.verify(token, process.env.JwtSecret);
        
        // Attach user details to the request object
        req.user = { userId: payload.userId, userName: payload.userName };
        
        next(); // Pass control to the next middleware
    } catch (error) {
        // Handle invalid token cases
        throw new UnauthenticatedError('Not verified account');
    }
};

module.exports = authMiddleware;
