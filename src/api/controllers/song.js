const Song = require("./../models/song");
const { responseSuccess, responseWithError } = require('./../helpers/response');

exports.getDetail = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const pipeline = [
      { $match: { Slug: slug } },
      {
        $lookup: {
          from: "Song",
          let: { currentOrder: "$Order", currentAlbumId: "$AlbumId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$Order", { $add: ["$$currentOrder", 1] }] },
                    { $eq: ["$AlbumId", "$$currentAlbumId"] },
                  ],
                },
              },
            },
            { $project: { slug: '$Slug', _id: 0 } },
          ],
          as: "nextSong",
        },
      },
      { $unwind: { path: "$nextSong", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "Song",
          let: { currentOrder: "$Order", currentAlbumId: "$AlbumId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$Order", { $subtract: ["$$currentOrder", 1] }] },
                    { $eq: ["$AlbumId", "$$currentAlbumId"] },
                  ],
                },
              },
            },
            { $project: { slug: '$Slug', _id: 0 } },
          ],
          as: "prevSong",
        },
      },
      { $unwind: { path: "$prevSong", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "Album",
          localField: "AlbumId",
          foreignField: "_id",
          as: "albumData",
        },
      },
      { $unwind: "$albumData" },

      {
        $project: {
          _id: 0,
          name: '$Name',
          order: '$Order',
          releaseDate: '$ReleaseDate',
          authors: '$Authors',
          lyrics: '$Lyrics',
          albumName: "$albumData.Name",
          albumImageCover: "$albumData.ImageCover",
          mainColor: "$albumData.MainColor",
          nextSongSlug: "$nextSong.slug",
          prevSongSlug: "$prevSong.slug",
        },
      },
    ];
    const result = await Song.aggregate(pipeline).exec();

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
    const slug = req.params.slug.toLowerCase();;

    const result = await Song.aggregate([
      { $match: { Slug: slug } },
      {
        $project: {
          photos: '$Photos',
          name: '$Name',
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