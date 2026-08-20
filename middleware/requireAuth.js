const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const config = require('../config/config');

const requireAuth = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in. Please log in to get an access' , 401));
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }
        req.user = currentUser;
        next();
    } catch(err) {
        return next(new AppError('Invalid or expired token. Please log in again.', 401));
    }
});

module.exports = requireAuth;