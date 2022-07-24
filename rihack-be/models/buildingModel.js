const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Please provide an address"],
    unique: true,
  },
  administrator: mongoose.Schema.Types.ObjectId,
  users: [mongoose.Schema.Types.ObjectId],
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
