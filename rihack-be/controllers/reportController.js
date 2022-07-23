const catchAsync = require("../utils/catchAsync");
const Report = require("../models/reportModel");

exports.createNewReport = catchAsync(async (req, res, next) => {
  const report = await Report.create(req.body);

  res.status(201).json({
    status: "success",
    data: report,
  });
});

// RADI TATA
