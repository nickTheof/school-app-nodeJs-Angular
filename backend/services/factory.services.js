const AppError = require("../utils/AppError");
const logger = require("../utils/logger");

exports.getAll = (Model) => {
  return async () => {
    const results = await Model.find();
    return results;
  };
};

exports.getOneById = (Model, modelName, id) => {
  return async () => {
    const doc = await Model.findById(id);
    if (!doc) throw new AppError(`${modelName} with id ${id} not found`);
    return doc;
  };
};

exports.deleteOneById = (Model, modelName, id) => {
  return async () => {
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) throw new AppError(`${modelName} with id ${id} not found`);
    logger.info(`${modelName} deleted`, doc._doc);
    return doc;
  };
};

exports.createOne = (Model, modelName, data) => {
  return async () => {
    const newDoc = new Model(data);
    const result = await newDoc.save();
    logger.info(`${modelName} created successfully`, result._doc);
    return result;
  };
};

exports.updateOneById = (Model, modelName, id, updatedData) => {
  return async () => {
    const doc = await Model.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw new AppError(`${modelName} with id ${id} not found`);
    logger.info(`${modelName} updated`, doc._doc);
    return doc;
  };
};
