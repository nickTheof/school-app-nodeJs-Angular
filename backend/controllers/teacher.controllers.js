const catchAsync = require("../utils/catchAsync");
const teacherService = require("../services/teacher.services");

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const result = await teacherService.getAll();
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getAllFilteredTeachers = catchAsync(async (req, res, next) => {
  const filterObj = req.query;
  const result = await teacherService.getAllFiltered(filterObj);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getAllTeachersPaginated = catchAsync(async (req, res, next) => {
  const paginationObj = req.query;
  const result = await teacherService.getAllPaginated(paginationObj);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getTeacherById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await teacherService.getOneById(id);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.createTeacher = catchAsync(async (req, res, next) => {
  const teacherData = req.body;
  const result = await teacherService.createOne(teacherData);
  res.status(201).json({
    status: "success",
    data: result,
  });
});

exports.updateTeacherById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedTeacher = req.body;
  const result = await teacherService.updateOne(id, updatedTeacher);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.deleteTeacherById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await teacherService.deleteOneById(id);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getTeacherByUuid = catchAsync(async (req, res, next) => {
  const uuid = req.params.uuid;
  const result = await teacherService.getOneByUuid(uuid);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.updateTeacherByUuid = catchAsync(async (req, res, next) => {
  const uuid = req.params.uuid;
  const updatedTeacher = req.body;
  const result = await teacherService.updateOneByUuid(uuid, updatedTeacher);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.deleteTeacherByUuid = catchAsync(async (req, res, next) => {
  const uuid = req.params.uuid;
  const result = await teacherService.deleteOneByUuid(uuid);
  res.status(200).json({
    status: "success",
    data: result,
  });
});
