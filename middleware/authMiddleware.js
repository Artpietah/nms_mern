const jwt = require('jsonwebtoken');
const User = require('../models/userModel');



// Protect routes
const verifyToken = async (req, res, next) => {
    let token;


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];    

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);   

            // Get user from the token
            const user = await User.findById(decoded.id).select('-password'); // Exclude password from the user object
            if (!user) {
                res.status(401).json({ message: 'Not authorized, user not found' });
                return;
            }
            req.user = user; // Attach user to the request object

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
            return;
        }
    }

    if (!token) {
        res.sendStatus(401).json({ message: 'Not authorized, no token' });
        return;
    }
};

module.exports = {
    verifyToken 
    }