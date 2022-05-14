require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { Hackathon } = require("../models");
router.get("/", async (req, res) => {
  try {
    let hackathons = await Hackathon.find({});
    return res.status(200).json({
      success: true,
      data: hackathons,
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
    check("name").not().isEmpty(),
    check("applyLink").isURL(),
    check("postLink").isURL(),
    check("startDate").not().isEmpty(),
    check("endDate").not().isEmpty(),
    check("mode").isIn(["online", "offline"]),
    check("location").not().isEmpty(),
    check("prizes").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        errorType: "Bad Request",
        errorMessage: "Validation Error",
      });
    }
    const {
      name,
      applyLink,
      postLink,
      startDate,
      endDate,
      mode,
      location,
      prizes,
      notes,
    } = req.body;

    try {
      let hackathon = new Hackathon({
        name,
        applyLink,
        postLink,
        startDate,
        endDate,
        mode,
        location,
        prizes,
        notes,
      });

      await hackathon.save();
      return res.status(200).json({
        success: true,
        message: "Entry Created Successfully",
        id: hackathon.id,
      });
    } catch (err) {
      console.log(err);
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
      let hackathon = await Hackathon.findOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: "Successful Request",
        data: hackathon,
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
      let { deletedCount } = await Hackathon.deleteOne({ _id: req.params.id });
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
