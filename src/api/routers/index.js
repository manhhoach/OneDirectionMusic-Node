const express = require("express");
const router = express.Router();

const singerRouter = require("./singer");
const albumRouter = require("./album");

router.use("/singer", singerRouter);
router.use("/album", albumRouter);

module.exports = router;
