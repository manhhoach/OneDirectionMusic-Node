const express = require('express');
const router = express.Router();
const songController = require('../controllers/song');


router.get('/get-photos/:slug', songController.getPhotos);
router.get('/:slug', songController.getDetail);

module.exports = router;