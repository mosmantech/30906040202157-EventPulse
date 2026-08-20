const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const config = require('../config/config');

const generateToken = (id) => {
    return jwt.sign({ id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
    });
};

exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError('Email already exists', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'attendee'
    });

    const token = generateToken(user._id);

    res.status(201).json({
        status: 'success',
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        }
    });
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid email or password', 401));
    }

    const token = generateToken(user._id);

    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        }
    });
});