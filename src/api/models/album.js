const mongoose = require('mongoose');
const networkSchema = require('./network');
const baseMongoEntity = require('./baseMongoEntity');


const albumSchema = new mongoose.Schema({
  ...baseMongoEntity,
  Name: { type: String, required: true },
  Slug: { type: String, required: true, unique: true },
  ImageCover: { type: String },
  Image: { type: String },
  LinksToBuy: [networkSchema],
  FanVideos: [{ type: String }],
  ReleaseDate: { type: Date },
  Description: { type: String },
  MainColor: { type: String }
}, {
  collection: 'Album'
});

module.exports = mongoose.model('Album', albumSchema);
