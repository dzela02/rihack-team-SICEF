const router = require("express").Router();
const reportController = require("../controllers/reportController");
const { protect, adminVerification } = require("../controllers/authController");

// REQUIRED AUTHENTICATION
router.use(protect);

router.route("/create-report").post(reportController.createNewReport);
router.route("/get-user-reports").get(reportController.getReportsByUser);

// ADMIN ROUTES

router.use(adminVerification);

router.route("/back-office/reports").get(reportController.getAllReports);

router
  .route("/back-office/changeStatus/:id")
  .patch(reportController.changeStatus);
module.exports = router;
