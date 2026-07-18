const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        checkoutId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CheckoutSession",
            required: true
        },
        paymentId: {
            type: String, // e.g., pay_xxxxx from Razorpay
            default: null
        },
        razorpayOrderId: {
            type: String, // order_xxxxx
            required: true,
            unique: true
        },
        paymentMethod: {
            type: String,
            enum: ["ONLINE", "CASH"],
            required: true
        },
        subtotal: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        shippingCharges: { type: Number, default: 0 },
        totalAmount: { type: Number, required: true }, // Amount to be paid
        paymentStatus: {
            type: String,
            enum: ["PENDING", "PROCESSING", "SUCCESS", "FAILED", "REFUNDED", "CANCELLED"],
            default: "PENDING"
        },
        transactionId: {
            type: String,
            default: null
        },
        refundStatus: {
            type: String,
            enum: ["NONE", "INITIATED", "SUCCESSFUL"],
            default: "NONE"
        },
        paidAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
