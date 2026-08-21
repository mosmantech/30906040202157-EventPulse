const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { categoryValidator } = require('../middleware/validators');
const validate = require('../middleware/validate');

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.get('/', categoryController.getAllCategories);
router.post('/', requireAuth, requireRole('admin'), categoryValidator, validate, categoryController.createCategory);

module.exports = router;