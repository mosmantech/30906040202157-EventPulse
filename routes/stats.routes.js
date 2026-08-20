const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

router.get('/', requireAuth, requireRole('admin'), statsController.getAdminStats);

module.exports = router;