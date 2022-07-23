const catchAsync = require("../utils/catchAsync");
const Report = require("../models/reportModel");
const User = require("../models/userModel");
const { getUserIdFromToken } = require("./authController");

const getIdFromHeaders = (headers) => {
  return headers.authorization.split(" ")[1];
};

exports.createNewReport = catchAsync(async (req, res, next) => {
  const userId = await getUserIdFromToken(getIdFromHeaders(req.headers));

  const report = await Report.create({ ...req.body, user: userId });

  res.status(201).json({
    status: "success",
    data: report,
  });
});

exports.getReportsByUser = catchAsync(async (req, res, next) => {
  const userId = await getUserIdFromToken(getIdFromHeaders(req.headers));

  const reports = await Report.find({ user: userId });

  res.status(200).json({
    status: "success",
    data: reports,
  });
});

exports.getAllReports = catchAsync(async (req, res, next) => {
  const reports = await Report.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    { $unset: "user.password" },
  ]);

  res.status(200).json({
    status: "success",
    data: reports,
  });
});

exports.changeStatus = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
    updatedAt: new Date().toISOString(),
  });

  res.status(301).json({
    status: "success",
  });
});
