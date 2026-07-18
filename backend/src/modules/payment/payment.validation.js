const { body } = require("express-validator");

const createPaymentValidation = [
    body("checkoutId")
        .trim()
        .notEmpty()
        .withMessage("Checkout ID is required")
        .isMongoId()
        .withMessage("Invalid Checkout ID format")
];

const verifyPaymentValidation = [
    body("razorpayOrderId")
        .trim()
        .notEmpty()
        .withMessage("Razorpay Order ID is required"),
    body("razorpayPaymentId")
        .trim()
        .notEmpty()
        .withMessage("Razorpay Payment ID is required"),
    body("razorpaySignature")
        .trim()
        .notEmpty()
        .withMessage("Razorpay Signature is required")
];

module.exports = {
    createPaymentValidation,
    verifyPaymentValidation
};
