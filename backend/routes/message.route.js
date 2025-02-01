const express = require('express');
const { getMsg, delMsg } = require('../controller/message.controller.js');

const router = express.Router();

router.get('/:id', getMsg);
router.delete('/:id', delMsg);

module.exports = router;