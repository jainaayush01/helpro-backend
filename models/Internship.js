const mongoose = require("mongoose");

const InternshipSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  location: {
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

module.exports = mongoose.model("Internship", InternshipSchema);
