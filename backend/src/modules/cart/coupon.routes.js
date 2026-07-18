const express = require("express");
const { createCoupon } = require("./coupon.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");

const router = express.Router();

// Admin Route to Create Coupons
// (Application and Removal happens via Cart Context in cart.routes.js)
router.post("/create", verifyJWT, isAdmin, createCoupon);

module.exports = router;
