const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');
const requireAuth = require('../middleware/requireAuth');
const { registrationValidator } = require('../middleware/validators');
const validate = require('../middleware/validate');

router.use(requireAuth);

router.post('/', registrationValidator, validate, registrationController.registerForEvent);
router.get('/my-registrations', registrationController.getMyRegistrations);
router.delete('/:id', registrationController.cancelRegistration);

module.exports = router;