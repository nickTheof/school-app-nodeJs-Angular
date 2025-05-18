const factory = require("./factory.services");
const Student = require("../models/student.model");
const logger = require("../utils/logger");
const AppError = require("../utils/AppError");

const MODEL_NAME = "Student";

exports.getAll = factory.getAll(Student);
exports.getAllFiltered = (filterObj) => factory.getFiltered(Student, filterObj);
exports.getAllPaginated = (paginationObj) =>
  factory.getAllPaginated(Student, paginationObj);
exports.getOneById = (id) => factory.getOneById(Student, MODEL_NAME, id);
exports.createOne = (data) => factory.createOne(Student, MODEL_NAME, data);
exports.updateOne = (id, data) =>
  factory.updateOneById(Student, MODEL_NAME, id, data);
exports.deleteOneById = (id) => factory.deleteOneById(Student, MODEL_NAME, id);

exports.getOneByUuid = (uuid) => {
  return async () => {
    const doc = await Student.findOne({ uuid: uuid });
    if (!doc)
      throw new AppError(`${MODEL_NAME} with uuid ${uuid} not found`, 404);
    return doc;
  };
};

exports.updateOneByUuid = (uuid, data) => {
  return async () => {
    const doc = await Student.findOneAndUpdate({ uuid: uuid }, data, {
      new: true,
      runValidators: true,
    });

    if (!doc)
      throw new AppError(`${MODEL_NAME} with uuid ${uuid} not found`, 404);

    logger.info(`${MODEL_NAME} updated`, doc._doc);
    return doc;
  };
};

exports.deleteOneByUuid = (uuid) => {
  return async () => {
    const doc = await Student.findOneAndDelete({ uuid });
    if (!doc)
      throw new AppError(`${MODEL_NAME} with uuid ${uuid} not found`, 404);
    logger.info(`${MODEL_NAME} deleted`, doc._doc);
    return doc;
  };
};
