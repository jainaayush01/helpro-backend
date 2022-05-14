require("dotenv").config();
const express = require("express");
const router = express.Router();

const { Hackathon, Internship, Job } = require("../models");

router.post("/hackathons", async (req, res) => {
  const data = req.body.data;
  var response = [];
  data.forEach(async (elem, idx) => {
    try {
      const {
        name,
        startDate,
        endDate,
        mode,
        location,
        notes,
        applyLink,
        postLink,
      } = elem;
      let hospital = new Hackathon({
        name,
        startDate,
        endDate,
        mode,
        location,
        notes,
        applyLink,
        postLink,
      });
      await hospital.save();

      response[idx] = {
        success: true,
        message: "Hospital Creation Successful",
        api: hospital,
      };
    } catch (err) {
      console.log(err);
      response[idx] = {
        success: false,
        errorType: "Internal Server Error",
        errorMessage: "Internal Server Error",
        error: err,
      };
    }
  });
  console.log(response);
  res.status(200).send(response);
});

router.post("/internships", async (req, res) => {
  const data = req.body.data;
  var response = [];
  data.forEach(async (elem, idx) => {
    try {
      const {
        role,
        company,
        description,
        eligibility,
        location,
        notes,
        applyLink,
        postLink,
      } = elem;
      let internship = new Internship({
        role,
        company,
        description,
        eligibility,
        location,
        notes,
        applyLink,
        postLink,
      });
      await internship.save();

      response[idx] = {
        success: true,
        message: "Created Successfully",
        api: internship,
      };
    } catch (err) {
      console.log(err);
      response[idx] = {
        success: false,
        errorType: "Internal Server Error",
        errorMessage: "Internal Server Error",
        error: err,
      };
    }
  });
  console.log(response);
  res.status(200).send(response);
});

router.post("/jobs", async (req, res) => {
  const data = req.body.data;
  var response = [];
  data.forEach(async (elem, idx) => {
    try {
      const {
        role,
        company,
        description,
        eligibility,
        location,
        notes,
        applyLink,
        postLink,
      } = elem;
      let job = new Job({
        role,
        company,
        description,
        eligibility,
        location,
        notes,
        applyLink,
        postLink,
      });
      await job.save();

      response[idx] = {
        success: true,
        message: "Created Successfully",
        job: job,
      };
    } catch (err) {
      console.log(err);
      response[idx] = {
        success: false,
        errorType: "Internal Server Error",
        errorMessage: "Internal Server Error",
        error: err,
      };
    }
  });
  console.log(response);
  res.status(200).send(response);
});

module.exports = router;
