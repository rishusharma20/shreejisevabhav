const express = require("express");
const {
    submitPayment,
    getPaymentStatus
} = require("./payment.controller");
const { verifyJWT } = require("../../middleware/auth.middleware");

const router = express.Router();

router.use(verifyJWT);

// Submit UTR and Screenshot
router.post("/submit-payment", submitPayment);

// Get Payment Status
router.get("/status/:id", getPaymentStatus);

module.exports = router;
