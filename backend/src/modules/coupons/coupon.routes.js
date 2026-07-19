const express = require("express");
const {
    calculateCartSavings,
    getAvailableOffers,
    adminCreateCoupon,
    adminCreateOffer,
    adminGetAnalytics
} = require("./coupon.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { calculateSavingsValidation, createCouponValidation } = require("./coupon.validation");

const router = express.Router();

// Public Routes
router.get("/offers", getAvailableOffers);

// User Routes (Protected)
router.use(verifyJWT);
router.post("/calculate", calculateSavingsValidation, validate, calculateCartSavings);

// Admin Routes
router.post("/admin/coupons", isAdmin, createCouponValidation, validate, adminCreateCoupon);
router.post("/admin/offers", isAdmin, adminCreateOffer); // Add validation later if needed
router.get("/admin/analytics", isAdmin, adminGetAnalytics);

module.exports = router;
