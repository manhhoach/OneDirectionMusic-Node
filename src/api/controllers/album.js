const Album = require('../models/album');
const Song = require('../models/song');
const { responseSuccess, responseWithError } = require('./../helpers/response');

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().sort({ ReleaseDate: -1 }).lean();
    res.json(responseSuccess(albums));
  } catch (err) {
    res.status(500).json(responseWithError(err));
  }
};

exports.getAlbumPhotos = async (req, res) => {
  try {
    const slug = req.params.slug;

    const pipeline = [
      { $match: { slug } },
      {
        $lookup: {
          from: Song.collection.name,
          localField: '_id',
          foreignField: 'albumId',
          pipeline: [
            {
              $match: {
                $expr: { $gt: [{ $size: "$photos" }, 0] }
              }
            },
            {
              $project: {
                _id: 0,
                name: 1,
                slug: 1,
                count: { $size: "$photos" },
                firstImage: { $arrayElemAt: ["$photos", 0] }
              }
            }
          ],
          as: 'songs'
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          songs: 1
        }
      }
    ];

    const result = await Album.aggregate(pipeline).exec();

    if (!result || result.length === 0) {
      return res.status(404).json(responseWithError('Album not found'));
    }

    res.json(responseSuccess(result[0]));
  } catch (err) {
    res.status(500).json(responseWithError(err));
  }
};

exports.getAlbumDetail = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();

    const pipeline = [
      { $match: { slug } },
      {
        $lookup: {
          from: Song.collection.name, // tên collection của song
          localField: '_id',
          foreignField: 'albumId',
          as: 'songs',
        },
      },
      {
        $project: {
          name: 1,
          imageCover: 1,
          linksToBuy: 1,
          image: 1,
          mainColor: 1,
          fanVideos: 1,
          slug: 1,
          releaseDate: 1,
          songs: {
            $map: {
              input: { $sortArray: { input: '$songs', sortBy: { order: 1 } } },
              as: 'e',
              in: {
                slug: '$$e.slug',
                name: '$$e.name',
                order: '$$e.order',
                isBonus: '$$e.isBonus',
              },
            },
          },
        },
      },
    ];

    const data = await Album.aggregate(pipeline).exec();

    if (!data || data.length === 0) {
      return res.status(404).json(responseWithError('Album not found'));
    }

    // data là mảng, lấy phần tử đầu
    res.json(responseSuccess(data[0]));
  } catch (err) {
    res.status(500).json(responseWithError(err));
  }
};