const mongoose = require('mongoose');

const NetworkSchema = new mongoose.Schema({
  Icon: { type: String, required: true },
  Link: { type: String, required: true }
});

module.exports = NetworkSchema;