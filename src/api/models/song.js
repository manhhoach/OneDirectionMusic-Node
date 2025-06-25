const mongoose = require('mongoose');
const baseMongoEntity = require('./baseMongoEntity');


const songSchema = new mongoose.Schema({
  ...baseMongoEntity,
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  authors: { type: String },
  lyrics: { type: String },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }, // ref tới Album
  photos: [{ type: String }],
  youtubeUrl: { type: String },
  releaseDate: { type: Date },
  order: { type: Number, default: 0 },
  isBonus: { type: Boolean, default: false }
},{
  collection: 'Song' // ⚠️ Rất quan trọng: tên chính xác của collection bạn đã có
});

module.exports = mongoose.model('Song', songSchema);
