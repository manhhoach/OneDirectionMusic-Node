const express = require('express');
const router = express.Router();
const singerController = require('../controllers/singerController');

router.get('/', singerController.getAllSingers);

module.exports = router;
