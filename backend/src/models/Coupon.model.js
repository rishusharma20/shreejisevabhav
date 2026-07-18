const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, "Coupon code is required"],
            unique: true,
            uppercase: true,
            trim: true
        },
        discountType: {
            type: String,
            enum: ["percentage", "fixed"],
            default: "percentage"
        },
        discountValue: {
            type: Number,
            required: [true, "Discount value is required"],
            min: [0, "Discount value cannot be negative"]
        },
        minOrderAmount: {
            type: Number,
            default: 0
        },
        maxDiscount: {
            type: Number,
            default: 0 // 0 means no limit for percentage
        },
        validFrom: {
            type: Date,
            required: true
        },
        validUntil: {
            type: Date,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        usageLimit: {
            type: Number,
            default: null // Null means unlimited
        },
        usedCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Method to check if coupon is valid
couponSchema.methods.isValid = function () {
    const now = new Date();
    if (!this.isActive) return false;
    if (this.validFrom > now || this.validUntil < now) return false;
    if (this.usageLimit !== null && this.usedCount >= this.usageLimit) return false;
    return true;
};

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
