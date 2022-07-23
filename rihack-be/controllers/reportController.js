const catchAsync = require("../utils/catchAsync");
const Report = require("../models/reportModel");
const { getUserIdFromToken } = require("./authController");

exports.createNewReport = catchAsync(async (req, res, next) => {
  const userId = await getUserIdFromToken(
    req.headers.authorization.split(" ")[1]
  );

  const report = await Report.create({ ...req.body, user: userId });

  res.status(201).json({
    status: "success",
    data: report,
  });
});
