const mongoose = require('mongoose');

const NetworkSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  link: { type: String, required: true }
});

module.exports = NetworkSchema;