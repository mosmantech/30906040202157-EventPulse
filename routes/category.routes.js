const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { categoryValidator } = require('../middleware/validators');
const validate = require('../middleware/validate');

router.get('/', categoryController.getAllCategories);
router.post('/', requireAuth, requireRole('admin'), categoryValidator, validate, categoryController.createCategory);

module.exports = router;