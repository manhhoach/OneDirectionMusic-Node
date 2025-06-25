const express = require('express');
const router = express.Router();
const albumController = require('./../controllers/album');

router.get('/', albumController.getAllAlbums);
router.get('/get-photos/:slug', albumController.getAlbumPhotos);
router.get('/:slug', albumController.getAlbumDetail);

module.exports = router;
