const express = require("express");
const { getCheckoutSummary, processCheckout } = require("./checkout.controller");
const { verifyJWT } = require("../../middleware/auth.middleware");

const router = express.Router();

router.use(verifyJWT);

// Get summary of checkout
router.get("/summary", getCheckoutSummary);

// Process checkout and create order
router.post("/", processCheckout);

module.exports = router;
