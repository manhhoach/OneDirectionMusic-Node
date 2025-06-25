const mongoose = require('mongoose');
const NetworkSchema = require('./network');
const baseMongoEntity = require('./baseMongoEntity');

const SingerSchema = new mongoose.Schema({
  ...baseMongoEntity,
  name: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  networks: [NetworkSchema],
  order: { type: Number }
});


module.exports = mongoose.model('Singer', SingerSchema);
