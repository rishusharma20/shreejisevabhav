const mongoose = require("mongoose");

const saveForLaterSchema = new mongoose.Schema(
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
        variantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductVariant",
            required: true
        }
    },
    {
        timestamps: true
    }
);

// A user should only be able to save a specific variant once
saveForLaterSchema.index({ userId: 1, variantId: 1 }, { unique: true });

const SaveForLater = mongoose.model("SaveForLater", saveForLaterSchema);
module.exports = SaveForLater;
