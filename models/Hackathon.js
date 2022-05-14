const mongoose = require("mongoose");

const HackathonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  // prizes: {
  //   type: String,
  //   required: true,
  // },
  endDate: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  applyLink: {
    type: String,
    required: true,
  },
  postLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("Hackathon", HackathonSchema);
