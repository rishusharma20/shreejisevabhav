const express = require("express");
const {
    getCurrentActiveFestival,
    getUpcoming,
    adminCreateFestival,
    adminGetAnalytics
} = require("./festival.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { createFestivalValidation } = require("./festival.validation");

const router = express.Router();

// Public Routes (The Orchestrator)
router.get("/active", getCurrentActiveFestival);
router.get("/upcoming", getUpcoming);

// Admin Routes
router.post("/create", isAdmin, createFestivalValidation, validate, adminCreateFestival);
router.get("/admin/:id/analytics", isAdmin, adminGetAnalytics);

module.exports = router;
