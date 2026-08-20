const Category = require('../models/Category.model');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');


exports.getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: categories
    });
});


exports.createCategory = asyncHandler(async (req, res, next) => {
    const { name, description } = req.body;

    const category = await Category.create({ name, description });

    res.status(201).json({
        status: 'success',
        data: category
    });
});