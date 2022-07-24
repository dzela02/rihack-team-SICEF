const router = require('express').Router();
const buildingController = require('../controllers/buildingController');
const { protect, adminVerification } = require('../controllers/authController');

// REQUIRED AUTHENTICATION
router.use(protect);

router.route('/me').get(buildingController.getusersBuilding);
router.route('/create-building').post(buildingController.createBuilding);
router.route('/join-building').patch(buildingController.joinBuilding);

// ADMIN ROUTES
router.use(adminVerification);
router.get('/', buildingController.getBuildings);

module.exports = router;
