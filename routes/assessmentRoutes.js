const express = require("express");
const assessmentController = require("../controllers/assessmentController");

const router = express.Router();

router.get("/", assessmentController.renderLanding);
router.get("/assessment", assessmentController.renderAssessment);
router.post("/assessment", assessmentController.submitAssessment);
router.get("/results/:id", assessmentController.renderResults);

module.exports = router;
