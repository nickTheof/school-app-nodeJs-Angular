const AppError = require("../utils/AppError");
const logger = require("../utils/logger");

exports.getAll = (Model) => {
  return async () => {
    const results = await Model.find();
    return results;
  };
};

exports.getFiltered = (Model, filterObj) => {
  return async () => {
    const filter = {};

    Object.keys(filterObj).forEach((key) => {
      if (filterObj[key]) {
        filter[key] = new RegExp("^" + filterObj[key], "i");
      }
    });
    const results = await Model.find(filter);
    return results;
  };
};

exports.getAllPaginated = (Model, query) => {
  return async () => {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [totalDocs, docs] = await Promise.all([
      Model.countDocuments(),
      Model.find().skip(skip).limit(limit),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);

    return {
      totalDocs,
      totalPages,
      currentPage: page,
      limit,
      data: docs,
    };
  };
};

exports.getOneByField = (Model, modelName, field, value) => {
  return async () => {
    const query = {};
    query[field] = value;

    const doc = await Model.findOne(query);
    if (!doc)
      throw new AppError(`${modelName} with ${field} ${value} not found`);
    return doc;
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
