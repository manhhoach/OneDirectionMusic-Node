const mongoose = require('mongoose');
const NetworkSchema = require('./network');
const BaseMongoEntity = require('./baseEntity');

const SingerSchema = new mongoose.Schema({
  ...BaseMongoEntity,
  name: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  networks: [NetworkSchema],
  order: { type: Number }
});


module.exports = mongoose.model('Singer', SingerSchema);
