var express = require("express");
var router = express.Router();

const reportController = require("../controllers/reportController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "Welcome to the RiHack",
  });
});

router.route("/create-report").post(reportController.createNewReport);

module.exports = router;
