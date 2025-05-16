const catchAsync = require("../utils/catchAsync");
const cityService = require("../services/city.services");

exports.getAllCities = catchAsync(async (req, res, next) => {
  const result = await cityService.getAll();
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getCityById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await cityService.getOneById(id)();
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.createCity = catchAsync(async (req, res, next) => {
  const cityData = req.body;
  const result = await cityService.createOne(cityData)();
  res.status(201).json({
    status: "success",
    data: result,
  });
});

exports.updateCityById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedCity = req.body;
  const result = await cityService.updateOne(id, updatedCity)();
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.deleteCityById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await cityService.deleteOneById(id)();
  res.status(200).json({
    status: "success",
    data: result,
  });
});
