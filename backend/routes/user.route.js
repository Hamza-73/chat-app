const express = require('express');
const { registerUser, loginUser } = require('../controller/user.controller');

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/login', loginUser);

module.exports = router;