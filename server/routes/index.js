const express = require('express');
const router = express.Router();

router.use('/api/v1/item', require('./item'));

module.exports = router;