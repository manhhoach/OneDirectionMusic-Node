const Song = require("./../models/song");
const Album = require("./../models/album");
const { responseSuccess, responseWithError } = require('./../helpers/response');
const mongoose = require("mongoose");

exports.getDetail = async (req, res) => {
  try {
    const slug = req.params.slug;

    const result = await Song.aggregate([
      { $match: { slug } },

      {
        $lookup: {
          from: "songs",
          let: { currentOrder: "$order", currentAlbumId: "$albumId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$order", { $add: ["$$currentOrder", 1] }] },
                    { $eq: ["$albumId", "$$currentAlbumId"] },
                  ],
                },
              },
            },
            { $project: { slug: 1, _id: 0 } },
          ],
          as: "nextSong",
        },
      },
      { $unwind: { path: "$nextSong", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "songs",
          let: { currentOrder: "$order", currentAlbumId: "$albumId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$order", { $subtract: ["$$currentOrder", 1] }] },
                    { $eq: ["$albumId", "$$currentAlbumId"] },
                  ],
                },
              },
            },
            { $project: { slug: 1, _id: 0 } },
          ],
          as: "prevSong",
        },
      },
      { $unwind: { path: "$prevSong", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "albums",
          localField: "albumId",
          foreignField: "_id",
          as: "albumData",
        },
      },
      { $unwind: "$albumData" },

      {
        $project: {
          _id: 0,
          name: 1,
          order: 1,
          releaseDate: 1,
          authors: 1,
          lyrics: 1,
          albumName: "$albumData.name",
          albumImageCover: "$albumData.imageCover",
          mainColor: "$albumData.mainColor",
          nextSongSlug: "$nextSong.slug",
          prevSongSlug: "$prevSong.slug",
        },
      },
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json(responseWithError("Song not found"));
    }

    res.json(responseSuccess(result[0]));
  } catch (err) {
    res.status(500).json(responseWithError(err));
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const slug = req.params.slug;

    const result = await Song.aggregate([
      { $match: { slug } },
      {
        $project: {
          photos: 1,
          name: 1,
          _id: 0,
        },
      },
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json(responseWithError("Song not found"));
    }

    res.json(responseSuccess(result[0]));
  } catch (err) {
    res.status(500).json(responseWithError(err));
  }
};