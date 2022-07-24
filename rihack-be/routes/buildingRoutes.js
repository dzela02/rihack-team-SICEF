const router = require("express").Router();
const buildingController = require("../controllers/buildingController");
const { protect, adminVerification } = require("../controllers/authController");

// REQUIRED AUTHENTICATION
router.use(protect);

router.route("/create-building").post(buildingController.createBuilding);

// ADMIN ROUTES

module.exports = router;
