const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Statistics data
 */
router.get('/', requireAuth, requireRole('admin'), statsController.getAdminStats);

module.exports = router;