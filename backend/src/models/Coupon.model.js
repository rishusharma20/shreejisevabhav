const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        discountType: {
            type: String,
            enum: ["PERCENTAGE", "FIXED"],
            required: true
        },
        discountValue: {
            type: Number,
            required: true,
            min: 0
        },
        minimumAmount: {
            type: Number,
            default: 0
        },
        maximumDiscount: {
            type: Number,
            default: null // Useful for PERCENTAGE caps
        },
        startDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        expiryDate: {
            type: Date,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        usageLimit: {
            type: Number,
            default: null // Total times this coupon can be used across platform
        },
        usedCount: {
            type: Number,
            default: 0
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
