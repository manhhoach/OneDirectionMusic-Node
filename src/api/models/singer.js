const mongoose = require('mongoose');
const NetworkSchema = require('./network');
const baseMongoEntity = require('./baseMongoEntity');

const singerSchema = new mongoose.Schema({
  ...baseMongoEntity,
  name: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  networks: [NetworkSchema],
  order: { type: Number }
}, {
  collection: 'Singer'
});


module.exports = mongoose.model('Singer', singerSchema);
