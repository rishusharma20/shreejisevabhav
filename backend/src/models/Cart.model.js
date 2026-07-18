const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number,
        default: 0
    }
}, { _id: false });

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        products: [cartItemSchema],
        totalProducts: {
            type: Number,
            default: 0
        },
        subtotal: {
            type: Number,
            default: 0
        },
        totalDiscount: {
            type: Number,
            default: 0
        },
        couponCode: {
            type: String,
            default: null
        },
        couponDiscount: {
            type: Number,
            default: 0
        },
        shippingCharge: {
            type: Number,
            default: 0
        },
        totalAmount: {
            type: Number,
            default: 0
        },
        isCheckoutReady: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
