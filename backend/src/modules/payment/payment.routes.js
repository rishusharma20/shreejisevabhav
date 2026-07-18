const express = require("express");
const {
    createPaymentOrder,
    verifyPayment,
    paymentFailed,
    getPaymentHistory
} = require("./payment.controller");
const { verifyJWT } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { createPaymentValidation, verifyPaymentValidation } = require("./payment.validation");

const router = express.Router();

router.use(verifyJWT);

router.post("/create-order", createPaymentValidation, validate, createPaymentOrder);
router.post("/verify", verifyPaymentValidation, validate, verifyPayment);
router.post("/failed", paymentFailed);
router.get("/history", getPaymentHistory);

module.exports = router;
