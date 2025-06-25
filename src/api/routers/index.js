const express = require("express");
const router = express.Router();

const singerRouter = require("./singer");
const albumRouter = require("./album");
const songRouter = require("./song")

router.use("/singer", singerRouter);
router.use("/album", albumRouter);
router.use("/song", songRouter);

module.exports = router;
