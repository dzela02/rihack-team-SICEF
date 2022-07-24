const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Please provide an address"],
    unique: true,
  },
  administrator: mongoose.Schema.Types.ObjectId,
  users: [mongoose.Schema.Types.ObjectId],
  joinCode: {
    type: String,
    unique: true,
    required: [true, "Please provide a join code"],
  },
  stats: {
    metal: {
      type: Number,
      default: 0,
    },
    plastic: {
      type: Number,
      default: 0,
    },
    paper: {
      type: Number,
      default: 0,
    },
    glass: {
      type: Number,
      default: 0,
    },
  },
});

const Building = mongoose.model("building", buildingSchema);

module.exports = Building;
