const express = require('express');
const router = express.Router();
const singerController = require('../controllers/singer');

router.get('/', singerController.getAllSingers);

module.exports = router;
