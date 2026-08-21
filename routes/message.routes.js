const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { messageValidator } = require('../middleware/validators');
const validate = require('../middleware/validate');

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send announcement (Admin only)
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventId, message]
 *             properties:
 *               eventId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Announcement sent
 */
router.post(
    '/',
    requireAuth,
    requireRole('admin'),
    messageValidator,
    validate,
    messageController.sendAnnouncement
);

/**
 * @swagger
 * /api/messages/{eventId}:
 *   get:
 *     summary: Get announcements for an event
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of announcements
 */
router.get('/:eventId', messageController.getAnnouncementsByEvent);

module.exports = router;