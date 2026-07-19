const mongoose = require("mongoose");

const trackMySevaSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order", // Phase 10 placeholder
            default: null
        },
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            required: true
        },
        currentStatus: {
            type: String,
            enum: [
                "ORDER_RECEIVED",
                "PAYMENT_SUCCESS",
                "PREPARING",
                "PACKAGING",
                "SHIPPED",
                "OUT_FOR_DELIVERY",
                "DELIVERED",
                "COMPLETED"
            ],
            default: "ORDER_RECEIVED"
        },
        trackingNumber: {
            type: String,
            default: null
        },
        deliveryPartner: {
            type: String,
            default: null
        },
        estimatedDelivery: {
            type: Date,
            default: null
        },
        timeline: [
            {
                status: { type: String, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        isDelivered: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const TrackMySeva = mongoose.model("TrackMySeva", trackMySevaSchema);
module.exports = TrackMySeva;
