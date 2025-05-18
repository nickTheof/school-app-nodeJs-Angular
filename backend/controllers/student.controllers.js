const catchAsync = require("../utils/catchAsync");
const studentService = require("../services/student.services");

exports.getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentService.getAll();
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getStudentById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await studentService.getOneById(id);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  const studentData = req.body;
  const result = await studentService.createOne(studentData);
  res.status(201).json({
    status: "success",
    data: result,
  });
});

exports.updateStudentById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedStudent = req.body;
  const result = await studentService.updateOne(id, updatedStudent);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.deleteStudentById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await studentService.deleteOneById(id);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getStudentByUuid = catchAsync(async (req, res, next) => {
  const uuid = req.params.uuid;
  const result = await studentService.getOneByUuid(uuid);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.updateStudentByUuid = catchAsync(async (req, res, next) => {
  const uuid = req.params.uuid;
  const updatedStudent = req.body;
  const result = await studentService.updateOneByUuid(uuid, updatedStudent);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.deleteStudentByUuid = catchAsync(async (req, res, next) => {
  const uuid = req.params.uuid;
  const result = await studentService.deleteOneByUuid(uuid);
  res.status(200).json({
    status: "success",
    data: result,
  });
});
