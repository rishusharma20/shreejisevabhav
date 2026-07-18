const express = require("express");
const {
    createReview,
    markHelpful,
    deleteReview,
    getProductReviews,
    getFeaturedReviews,
    adminDeleteReview,
    adminFeatureReview,
    adminGetAnalytics
} = require("./review.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { createReviewValidation } = require("./review.validation");
const { upload } = require("../../middleware/multer.middleware");

const router = express.Router();

// Public Routes
router.get("/product/:id", getProductReviews);
router.get("/featured", getFeaturedReviews);

// Protected User Routes (Verified Purchasers logic enforced in controller)
router.use(verifyJWT);
router.post("/create", upload.array("media", 5), createReviewValidation, validate, createReview);
router.post("/:id/helpful", markHelpful);
router.delete("/:id", deleteReview);

// Admin Routes
router.delete("/admin/:id", isAdmin, adminDeleteReview);
router.put("/admin/:id/feature", isAdmin, adminFeatureReview);
router.get("/admin/analytics", isAdmin, adminGetAnalytics);

module.exports = router;
