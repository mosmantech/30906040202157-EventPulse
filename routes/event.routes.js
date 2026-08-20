const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { eventValidator } = require('../middleware/validators');
const validate = require('../middleware/validate');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

router.post('/', requireAuth, requireRole('admin'), eventValidator, validate, eventController.createEvent);
router.patch('/:id', requireAuth, requireRole('admin'), eventValidator, validate, eventController.updateEvent);
router.delete('/:id', requireAuth, requireRole('admin'), eventController.deleteEvent);

module.exports = router;