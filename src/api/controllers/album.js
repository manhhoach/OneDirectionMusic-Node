const Album = require('../models/album');
const Song = require('../models/song');
const { responseSuccess, responseWithError } = require('./../helpers/response');

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().sort({ ReleaseDate: -1 }).lean();
    const data = albums.map(album => {
      return {
        id: album._id,
        name: album.Name,
        slug: album.Slug,
        imageCover: album.ImageCover,
        image: album.Image,
        mainColor: album.MainColor,
        releaseDate: album.ReleaseDate,
        linksToBuy: album.LinksToBuy.map(link => {
          return {
            icon: link.Icon,
            link: link.Link,
          }
        }),
        fanVideos: album.FanVideos,
        description: album.Description,
      };
    })
    res.json(responseSuccess(data));
  } catch (err) {
    res.status(500).json(responseWithError(err));
  }
};

exports.getAlbumPhotos = async (req, res) => {
  try {
    const slug = req.params.slug;
    const pipeline = [
      { $match: { Slug: slug } },
      {
        $lookup: {
          from: Song.collection.name,
          localField: '_id',
          foreignField: 'AlbumId',
          pipeline: [
            {
              $match: {
                $expr: { $gt: [{ $size: "$Photos" }, 0] }
              }
            },
            {
              $project: {
                _id: 0,
                name: 1,
                slug: 1,
                count: { $size: "$Photos" },
                firstImage: { $arrayElemAt: ["$Photos", 0] }
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
      { $match: { Slug: slug } },
      {
        $lookup: {
          from: Song.collection.name, // tên collection của song
          localField: '_id',
          foreignField: 'AlbumId',
          as: 'songs',
        },
      },
      {
        $project: {
          name: '$Name',
          imageCover: '$ImageCover',
          linksToBuy: '$LinksToBuy',
          image: '$Image',
          mainColor: '$MainColor',
          fanVideos: '$FanVideos',
          slug: '$Slug',
          releaseDate: '$ReleaseDate',
          songs: {
            $map: {
              input: {
                $sortArray: {
                  input: '$songs',
                  sortBy: { Order: 1 },
                },
              },
              as: 'e',
              in: {
                slug: '$$e.Slug',
                name: '$$e.Name',
                order: '$$e.Order',
                isBonus: '$$e.IsBonus',
              },
            },
          },
        }
      },
    ];

    const data = await Album.aggregate(pipeline).exec();

    if (!data || data.length === 0) {
      return res.status(404).json(responseWithError('Album not found'));
    }
    var response = data[0];

    response.id = response._id;
    delete response._id;
    response.linksToBuy = response.linksToBuy.map(link => {
      return {
        icon: link.Icon,
        link: link.Link,
      };
    });

    res.json(responseSuccess(response));
  } catch (err) {
    res.status(500).json(responseWithError(err));
  }
};