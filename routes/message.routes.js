const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { messageValidator } = require('../middleware/validators');
const validate = require('../middleware/validate');

router.post(
    '/',
    requireAuth,
    requireRole('admin'),
    messageValidator,
    validate,
    messageController.sendAnnouncement
);

router.get('/:eventId', messageController.getAnnouncementsByEvent);

module.exports = router;