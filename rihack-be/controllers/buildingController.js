const catchAsync = require("../utils/catchAsync");
const Building = require("../models/buildingModel");
const { getUserIdFromToken, getIdFromHeaders } = require("./authController");

exports.createBuilding = catchAsync(async (req, res, next) => {
  const building = await Building.create(req.body);

  res.status(201).json({
    status: "success",
    data: building,
  });
});

exports.joinBuilding = catchAsync(async (req, res, next) => {
  const userId = await getUserIdFromToken(getIdFromHeaders(req.headers));

  const building = await Building.findByIdAndUpdate(req.params.id, {
    $if: {
      $eq: ["$users", userId],
    },
    $push: {
      users: userId,
    },
  });
});
