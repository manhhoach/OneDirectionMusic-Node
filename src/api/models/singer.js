const mongoose = require('mongoose');
const NetworkSchema = require('./network');
const baseMongoEntity = require('./baseMongoEntity');

const singerSchema = new mongoose.Schema({
  ...baseMongoEntity,
  Name: { type: String, required: true },
  Description: { type: String },
  Images: [{ type: String }],
  Networks: [NetworkSchema],
  Order: { type: Number }
}, {
  collection: 'Singer'
});


module.exports = mongoose.model('Singer', singerSchema);
