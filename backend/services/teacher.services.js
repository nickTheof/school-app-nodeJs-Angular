const factory = require("./factory.services");
const Teacher = require("../models/teacher.model");
const logger = require("../utils/logger");
const AppError = require("../utils/AppError");

const MODEL_NAME = "Teacher";

exports.getAll = factory.getAll(Teacher);
exports.getOneById = (id) => factory.getOneById(Teacher, MODEL_NAME, id);
exports.createOne = (data) => factory.createOne(Teacher, MODEL_NAME, data);
exports.updateOne = (id, data) =>
  factory.updateOneById(Teacher, MODEL_NAME, id, data);
exports.deleteOneById = (id) => factory.deleteOneById(Teacher, MODEL_NAME, id);

exports.getOneByUuid = (uuid) => {
  return async () => {
    const doc = await Teacher.findOne({ uuid: uuid });
    if (!doc) throw new AppError(`${MODEL_NAME} with uuid ${uuid} not found`);
    return doc;
  };
};

exports.updateOneByUuid = (uuid, data) => {
  return async () => {
    const doc = await Teacher.findOneAndUpdate({ uuid: uuid }, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new AppError(`${MODEL_NAME} with uuid ${uuid} not found`);

    logger.info(`${MODEL_NAME} updated`, doc._doc);
    return doc;
  };
};

exports.deleteOneByUuid = (uuid) => {
  return async () => {
    const doc = await Teacher.findOneAndDelete({ uuid });
    if (!doc) throw new AppError(`${MODEL_NAME} with uuid ${uuid} not found`);
    logger.info(`${MODEL_NAME} deleted`, doc._doc);
    return doc;
  };
};
