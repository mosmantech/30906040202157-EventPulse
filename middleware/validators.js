const { body, param } = require('express-validator');


exports.registerValidator = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.loginValidator = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];


exports.eventValidator = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('date').isISO8601().withMessage('Please provide a valid date'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer')
];


exports.categoryValidator = [
    body('name').trim().notEmpty().withMessage('Category name is required')
];


exports.registrationValidator = [
    body('eventId').isMongoId().withMessage('Valid eventId is required')
];


exports.messageValidator = [
    body('eventId').isMongoId().withMessage('Valid eventId is required'),
    body('text').trim().notEmpty().withMessage('Message text is required')
];