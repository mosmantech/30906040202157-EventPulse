const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');
const requireAuth = require('../middleware/requireAuth');
const { registrationValidator } = require('../middleware/validators');
const validate = require('../middleware/validate');

router.use(requireAuth);

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Register for an event
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventId]
 *             properties:
 *               eventId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registered successfully
 */
router.post('/', registrationValidator, validate, registrationController.registerForEvent);

/**
 * @swagger
 * /api/registrations/my-registrations:
 *   get:
 *     summary: Get user registrations
 *     tags: [Registrations]
 *     responses:
 *       200:
 *         description: List of user registrations
 */
router.get('/my-registrations', registrationController.getMyRegistrations);

/**
 * @swagger
 * /api/registrations/{id}:
 *   delete:
 *     summary: Cancel a registration
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration cancelled
 */
router.delete('/:id', registrationController.cancelRegistration);

module.exports = router;