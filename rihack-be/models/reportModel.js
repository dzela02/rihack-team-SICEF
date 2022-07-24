const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  image: { type: String, required: [true, "Please provide an image URL"] },
  description: {
    type: String,
    maxLength: 225,
    minLength: 10,
  },
  location: {
    long: {
      type: Number,
      required: [true, "Please provide a longitude"],
    },
    lat: {
      type: Number,
      required: [true, "Please provide a latitude"],
    },
  },
  status: {
    type: String,
    enum: ["pending", "resolved", "rejected"],
    default: "pending",
  },
  createdAt: Date,
  updatedAt: Date | null,
  pointsAwarded: {
    type: Number,
    default: 1,
  },
});

reportSchema.pre("save", async function (next) {
  this.createdAt = new Date().toISOString();

  return next();
});

const Report = mongoose.model("report", reportSchema);

module.exports = Report;
