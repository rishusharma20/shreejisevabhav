const express = require("express");
const {
    getMyJourneys,
    getJourneyById,
    getAllJourneys,
    updateJourneyStatus,
    updateDeliveryDetails
} = require("./track.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { updateStatusValidation, updateDeliveryValidation } = require("./track.validation");

const router = express.Router();

// ALL track routes require authentication
router.use(verifyJWT);

// User Routes
router.get("/", getMyJourneys);
router.get("/:id", getJourneyById);

// Admin Routes
router.get("/admin/all", isAdmin, getAllJourneys);
router.put("/admin/:id/status", isAdmin, updateStatusValidation, validate, updateJourneyStatus);
router.put("/admin/:id/delivery", isAdmin, updateDeliveryValidation, validate, updateDeliveryDetails);

module.exports = router;
