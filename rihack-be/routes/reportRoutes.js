const router = require("express").Router();
const reportController = require("../controllers/reportController");
const { protect } = require("../controllers/authController");

// REQUIRED AUTHENTICATION
router.use(protect);

router.route("/create-report").post(reportController.createNewReport);

module.exports = router;
