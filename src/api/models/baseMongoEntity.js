
const BaseMongoEntity = {
  CreatedAt: { type: Date, default: () => new Date() },
  UpdatedAt: { type: Date }
};

module.exports = BaseMongoEntity;
