const catchAsync = require('../utils/catchAsync');
const Building = require('../models/buildingModel');
const { getUserIdFromToken, getIdFromHeaders } = require('./authController');

exports.createBuilding = catchAsync(async (req, res, next) => {
  const userId = await getUserIdFromToken(getIdFromHeaders(req.headers));
  const building = await Building.create({
    ...req.body,
    administrator: userId,
  });

  res.status(201).json({
    status: 'success',
    data: building,
  });
});

exports.joinBuilding = catchAsync(async (req, res, next) => {
  const userId = await getUserIdFromToken(getIdFromHeaders(req.headers));

  await Building.aggregate([
    { $match: { joinCode: req.body.joinCode } },
    { $set: { users: { $concatArrays: ['$users', [userId]] } } },
  ]);

  res.status(301).json({
    status: 'success',
  });
});

exports.getBuildings = catchAsync(async (req, res, next) => {
  const buildings = await Building.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'administrator',
        foreignField: '_id',
        as: 'administrator',
      },
    },
    { $unwind: '$administrator' },
    { $unset: 'administrator.password' },
    {
      $lookup: {
        from: 'users',
        localField: 'users',
        foreignField: '_id',
        as: 'users',
      },
    },
    { $unset: 'users.password' },
  ]);

  res.status(200).json({
    status: 'success',
    data: buildings,
  });
});
