const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        size: {
            type: String,
            required: [true, "Variant size is required"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Variant price is required"],
            min: [0, "Price cannot be negative"]
        },
        discount: {
            type: Number,
            default: 0,
            min: [0, "Discount cannot be negative"],
            max: [100, "Discount cannot exceed 100%"]
        },
        quantity: {
            type: Number,
            required: [true, "Inventory quantity is required"],
            min: [0, "Quantity cannot be negative"],
            default: 0
        },
        sku: {
            type: String,
            trim: true
        },
        weight: {
            type: Number, // in grams
            default: 0
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        images: [
            {
                type: String,
                trim: true
            }
        ]
    },
    {
        timestamps: true
    }
);

// Pre-save hook to automatically compute availability based on quantity
productVariantSchema.pre("save", function (next) {
    if (this.isModified("quantity")) {
        this.isAvailable = this.quantity > 0;
    }
    next();
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
module.exports = ProductVariant;
