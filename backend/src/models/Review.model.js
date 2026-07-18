const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        images: [
            {
                type: String
            }
        ],
        videos: [
            {
                type: String
            }
        ],
        isVerifiedPurchase: {
            type: Boolean,
            default: true // We enforce this at the controller level
        },
        isApproved: {
            type: Boolean,
            default: true // MVP: Auto-approve, but admins can delete/block later
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        helpfulCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// A user can only review a specific product once per order.
reviewSchema.index({ userId: 1, productId: 1, orderId: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
