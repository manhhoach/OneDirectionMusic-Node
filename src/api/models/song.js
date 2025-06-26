const mongoose = require('mongoose');
const baseMongoEntity = require('./baseMongoEntity');


const songSchema = new mongoose.Schema({
  ...baseMongoEntity,
  Name: { type: String, required: true },
  Slug: { type: String, required: true, unique: true },
  Authors: { type: String },
  Lyrics: { type: String },
  AlbumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }, // ref tới Album
  Photos: [{ type: String }],
  YoutubeUrl: { type: String },
  ReleaseDate: { type: Date },
  Order: { type: Number, default: 0 },
  IsBonus: { type: Boolean, default: false }
},{
  collection: 'Song' 
});



module.exports = mongoose.model('Song', songSchema);
