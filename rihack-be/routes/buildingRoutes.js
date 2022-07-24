const router = require('express').Router();
const buildingController = require('../controllers/buildingController');
const { protect, adminVerification } = require('../controllers/authController');

router.get('/', buildingController.getBuildings);

// REQUIRED AUTHENTICATION
router.use(protect);

router.route('/create-building').post(buildingController.createBuilding);
router.route('/join-building').patch(buildingController.joinBuilding);

// ADMIN ROUTES

module.exports = router;
