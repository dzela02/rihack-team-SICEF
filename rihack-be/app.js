var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const reportRouter = require("./routes/reportRoutes");
const cors = require("cors");
const buildingRouter = require("./routes/buildingRoutes");

var app = express();

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

// ROUTING

app.use("/reports", reportRouter);
app.use("/user-actions", userRouter);
app.use("/building", buildingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;
