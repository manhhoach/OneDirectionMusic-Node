const Singer = require('../models/singer');
const { responseSuccess, responseWithError } = require('./../helpers/response');

exports.getAllSingers = async (req, res) => {
  try {
    const singers = await Singer.find().lean();
    const reponse = singers.map(singer => {
      return {
        id: singer._id,
        name: singer.Name,
        description: singer.Description,
        images: singer.Images,
        networks: singer.Networks.map(network => {
          return {
            icon: network.Icon,
            link: network.Link,
          }
        }),
        order: singer.Order,
      }
    });
    res.json(responseSuccess(reponse));
  } catch (err) {
    res.status(500).json(responseWithError(err));
  }
};
