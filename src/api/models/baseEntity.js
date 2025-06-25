const mongoose = require('mongoose');

const BaseMongoEntity = {
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date }
};

module.exports = BaseMongoEntity;
