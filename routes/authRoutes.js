const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../middleware/validators');
const validate = require('../middleware/validate');

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);

module.exports = router;