const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        offerType: {
            type: String,
            enum: ["PERCENTAGE", "FIXED", "FREE_SHIPPING"],
            required: true
        },
        targetType: {
            type: String,
            enum: ["GLOBAL", "FESTIVAL", "COLLECTION", "PRODUCT", "FIRST_PURCHASE"],
            required: true
        },
        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "onModel", // Dynamic Reference
            default: null
        },
        onModel: {
            type: String,
            enum: ["Collection", "Product", "Festival"], // Assuming Festival model will be built in Phase 14
            default: null
        },
        discountValue: {
            type: Number,
            default: 0 // 0 for FREE_SHIPPING
        },
        minimumAmount: {
            type: Number,
            default: 0
        },
        maximumDiscount: {
            type: Number,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        },
        startDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        expiryDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
