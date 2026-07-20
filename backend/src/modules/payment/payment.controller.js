const Payment = require("../../models/Payment.model");
const Order = require("../../models/Order.model");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const sendEmail = require("../../utils/sendEmail");
const { getOrderStatusEmail } = require("../../utils/emailTemplates");

const submitPayment = asyncHandler(async (req, res) => {
    const { orderId, utrNumber, screenshotUrl } = req.body;
    const userId = req.user._id;

    if (!orderId || !utrNumber) {
        throw new ApiError(400, "Order ID and UTR Number are required");
    }

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    const payment = await Payment.findOne({ _id: order.paymentId, userId });
    if (!payment) {
        throw new ApiError(404, "Payment record not found");
    }

    if (payment.paymentStatus === "PAYMENT_APPROVED") {
        throw new ApiError(400, "Payment is already approved");
    }

    payment.utrNumber = utrNumber;
    if (screenshotUrl) payment.screenshotUrl = screenshotUrl;
    payment.paymentStatus = "UNDER_VERIFICATION";
    await payment.save();

    order.orderStatus = "UNDER_VERIFICATION";
    await order.save();

    // Send email notification
    if (req.user && req.user.email) {
        try {
            const emailData = getOrderStatusEmail(order, "UNDER_VERIFICATION");
            await sendEmail({
                email: req.user.email,
                subject: emailData.subject,
                message: emailData.text,
                html: emailData.html
            });
        } catch (error) {
            console.error("Failed to send payment submitted email:", error);
        }
    }

    return res.status(200).json(
        new ApiResponse(200, "Payment details submitted successfully", { payment })
    );
});

const getPaymentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params; // orderId
    const userId = req.user._id;

    const order = await Order.findOne({ _id: id, userId }).populate('paymentId');
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Payment status fetched", {
            paymentStatus: order.paymentId.paymentStatus,
            orderStatus: order.orderStatus
        })
    );
});

module.exports = {
    submitPayment,
    getPaymentStatus
};
