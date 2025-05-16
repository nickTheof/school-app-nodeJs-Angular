const factory = require("./factory.services");
const City = require("../models/city.model");

const MODEL_NAME = "City";

exports.getAll = factory.getAll(City);
exports.getOneById = (id) => factory.getOneById(City, MODEL_NAME, id);
exports.createOne = (data) => factory.createOne(City, MODEL_NAME, data);
exports.updateOne = (id, data) =>
  factory.updateOneById(City, MODEL_NAME, id, data);
exports.deleteOneById = (id) => factory.deleteOneById(City, MODEL_NAME, id);
