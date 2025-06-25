const mongoose = require('mongoose');
const networkSchema = require('./network');
const baseMongoEntity = require('./baseMongoEntity');


const AlbumSchema = new mongoose.Schema({
  ...baseMongoEntity,
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  imageCover: { type: String },
  image: { type: String },
  linksToBuy: [networkSchema],
  fanVideos: [{ type: String }],
  releaseDate: { type: Date },
  description: { type: String },
  mainColor: { type: String }
});

module.exports = mongoose.model('Album', AlbumSchema);
