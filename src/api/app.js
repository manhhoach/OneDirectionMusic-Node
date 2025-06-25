const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const { responseWithError } = require("./helpers/response");
const routers = require("./routers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routers);
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(responseWithError(err));
});

module.exports = app;
