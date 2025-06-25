const Singer = require('../models/singer');
const { responseSuccess, responseWithError } = require('../utils/responseHelpers');

exports.getAllSingers = async (req, res) => {
  try {
    const singers = await Singer.find();
    res.json(responseSuccess(singers));
  } catch (err) {
    res.status(500).json(responseWithError(err));
  }
};
