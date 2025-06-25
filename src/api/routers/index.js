const express = require("express");
const router = express.Router();

const singerRouter = require("./singer");
const userRouter = require("./user");

router.use("/users", userRouter);
router.use("/singer", singerRouter);

module.exports = router;
