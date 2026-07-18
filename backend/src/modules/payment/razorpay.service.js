const Razorpay = require("razorpay");
const crypto = require("crypto");
const ApiError = require("../../utils/ApiError");

// Note: For local development, these will just be mock placeholders unless defined in .env
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_mock_key_id";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "mock_key_secret";

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

/**
 * Creates an order on Razorpay servers
 */
const createRazorpayOrder = async (amount, receiptId) => {
    try {
        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paise (smallest currency unit)
            currency: "INR",
            receipt: receiptId.toString()
        };
        const order = await razorpayInstance.orders.create(options);
        return order;
    } catch (error) {
        throw new ApiError(500, "Failed to connect to Payment Gateway", [error.message]);
    }
};

/**
 * Cryptographically verifies that the payment success webhook/callback actually came from Razorpay
 */
const verifyRazorpaySignature = (orderId, paymentId, signature) => {
    // A mock verification for local development without actual Razorpay traffic
    if (process.env.NODE_ENV !== "production" && signature === "mock_signature_for_testing") {
        return true;
    }

    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    return expectedSignature === signature;
};

module.exports = {
    createRazorpayOrder,
    verifyRazorpaySignature
};
