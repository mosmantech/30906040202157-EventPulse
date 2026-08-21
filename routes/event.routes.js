const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { eventValidator } = require('../middleware/validators');
const validate = require('../middleware/validate');

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *   post:
 *     summary: Create a new event (Admin only)
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, date]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created
 */
router.get('/', eventController.getAllEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *   patch:
 *     summary: Update an event (Admin only)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event updated
 *   delete:
 *     summary: Delete an event (Admin only)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted
 */
router.get('/:id', eventController.getEventById);
router.post('/', requireAuth, requireRole('admin'), eventValidator, validate, eventController.createEvent);
router.patch('/:id', requireAuth, requireRole('admin'), eventValidator, validate, eventController.updateEvent);
router.delete('/:id', requireAuth, requireRole('admin'), eventController.deleteEvent);

module.exports = router;