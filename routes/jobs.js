require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { Job } = require("../models");
router.get("/", async (req, res) => {
  try {
    let jobs = await Job.find({});
    return res.status(200).json({
      success: true,
      data: jobs,
      message: "Successful Request",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errorType: "Internal Server Error",
      errorMessage: "Internal Server Error",
    });
  }
});

router.post(
  "/",
  [
    check("role").not().isEmpty(),
    check("applyLink").isURL(),
    check("postLink").isURL(),
    check("location").not().isEmpty(),
    check("eligibility").not().isEmpty(),
    check("description").not().isEmpty(),
    check("company").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "Bad Request",
        errorMessage: "Validation Error",
      });
    }
    const {
      role,
      applyLink,
      postLink,
      eligibility,
      description,
      location,
      company,
      notes,
    } = req.body;

    try {
      let job = new Job({
        role,
        applyLink,
        postLink,
        eligibility,
        description,
        location,
        company,
        notes,
      });

      await job.save();
      return res.status(200).json({
        success: true,
        message: "Entry Created Successfully",
        id: job.id,
      });
    } catch (err) {
      return res.status(503).json({
        success: false,
        errorType: "Internal Server Error",
        errorMessage: "Internal Server Error",
      });
    }
  }
);

router.get(
  "/:id",
  [check("id").isMongoId().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "Bad Request",
        errorMessage: "Validation Error",
      });
    }
    try {
      let job = await Job.findOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: "Successful Request",
        data: job,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        errorType: "Internal Server Error",
        errorMessage: "Internal Server Error",
      });
    }
  }
);

router.get(
  "/:id",
  [check("id").isMongoId().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "Bad Request",
        errorMessage: "Validation Error",
      });
    }
    try {
      let { deletedCount } = await Job.deleteOne({ _id: req.params.id });
      if (deletedCount) {
        return res.status(200).json({
          success: true,
          message: "Deletion Successful",
          deletedCount,
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "Entry Not found",
          deletedCount: 0,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        errorType: "Internal Server Error",
        errorMessage: "Internal Server Error",
      });
    }
  }
);

module.exports = router;
