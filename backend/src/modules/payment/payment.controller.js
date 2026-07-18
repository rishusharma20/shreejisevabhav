const Payment = require("../../models/Payment.model");
const CheckoutSession = require("../../models/CheckoutSession.model");
const { createRazorpayOrder, verifyRazorpaySignature } = require("./razorpay.service");
const { initiateTracking } = require("../track/track.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Create a Payment Order via Gateway
// @route   POST /api/v1/payments/create-order
// @access  Private
const createPaymentOrder = asyncHandler(async (req, res) => {
    const { checkoutId } = req.body;
    const userId = req.user._id;

    // 1. Verify Checkout Session
    const session = await CheckoutSession.findOne({ _id: checkoutId, userId });
    if (!session) throw new ApiError(404, "Checkout Session not found");

    if (session.status !== "PENDING") {
        throw new ApiError(400, `Cannot initiate payment. Session is already ${session.status}`);
    }

    if (new Date() > session.expiresAt) {
        session.status = "EXPIRED";
        await session.save();
        throw new ApiError(400, "Checkout session expired. Please return to cart.");
    }

    if (!session.paymentMethod) {
        throw new ApiError(400, "Payment method not selected in Checkout Session");
    }

    // 2. Request Order from Gateway
    // Note: In real life, if payment method is CASH, we bypass Razorpay entirely.
    // Assuming ONLINE for this gateway implementation.
    const rzpOrder = await createRazorpayOrder(session.totalAmount, session._id);

    // 3. Create Pending Payment Document
    const payment = await Payment.create({
        userId,
        checkoutId: session._id,
        razorpayOrderId: rzpOrder.id,
        paymentMethod: session.paymentMethod,
        subtotal: session.subtotal,
        discount: session.totalDiscount + session.couponDiscount,
        shippingCharges: session.shippingCharges,
        totalAmount: session.totalAmount,
        paymentStatus: "PENDING"
    });

    return res.status(201).json(new ApiResponse(201, "Payment Gateway Order created", { payment, razorpayOrder: rzpOrder }));
});

// @desc    Verify Payment Callback
// @route   POST /api/v1/payments/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const userId = req.user._id;

    const payment = await Payment.findOne({ razorpayOrderId, userId });
    if (!payment) throw new ApiError(404, "Payment record not found");

    if (payment.paymentStatus === "SUCCESS") {
        return res.status(200).json(new ApiResponse(200, "Payment is already verified", { payment }));
    }

    // Cryptographic verification
    const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValid) {
        payment.paymentStatus = "FAILED";
        payment.paymentId = razorpayPaymentId;
        await payment.save();
        throw new ApiError(401, "Invalid Signature. Payment verification failed. NO INVENTORY REDUCED.");
    }

    // Payment is legitimately successful!
    payment.paymentStatus = "SUCCESS";
    payment.paymentId = razorpayPaymentId;
    payment.paidAt = new Date();
    await payment.save();

    // Mark Checkout Session as Completed
    await CheckoutSession.findByIdAndUpdate(payment.checkoutId, { status: "COMPLETED" });

    // ==========================================
    // CRITICAL ARCHITECTURAL HOOKS FOR LATER
    // ==========================================
    
    // TODO (Phase 10): 
    // const order = await OrderService.createOrderFromPayment(payment);
    // await InventoryService.reduceInventory(payment.checkoutId);
    
    // Phase 9: Start the Divine Journey Tracking!
    await initiateTracking(payment._id, userId);
    
    // ==========================================

    return res.status(200).json(new ApiResponse(200, "Payment Verified successfully. Divine Journey continues.", { payment }));
});

// @desc    Mark Payment as Failed (User cancelled or card declined)
// @route   POST /api/v1/payments/failed
// @access  Private
const paymentFailed = asyncHandler(async (req, res) => {
    const { razorpayOrderId, reason } = req.body;
    const userId = req.user._id;

    const payment = await Payment.findOne({ razorpayOrderId, userId });
    if (!payment) throw new ApiError(404, "Payment not found");

    if (payment.paymentStatus !== "SUCCESS") {
        payment.paymentStatus = "FAILED";
        // Optionally save the reason in a notes or metadata field
        await payment.save();
    }

    return res.status(200).json(new ApiResponse(200, "Payment marked as failed", { payment }));
});

// @desc    Get Payment History for User
// @route   GET /api/v1/payments/history
// @access  Private
const getPaymentHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, "Payment History", { payments }));
});

module.exports = {
    createPaymentOrder,
    verifyPayment,
    paymentFailed,
    getPaymentHistory
};
