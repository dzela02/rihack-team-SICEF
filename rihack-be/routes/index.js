var express = require("express");
var router = express.Router();

const reportController = require("../controllers/reportController");

router.route("/create-report").post(reportController.createNewReport);

module.exports = router;
