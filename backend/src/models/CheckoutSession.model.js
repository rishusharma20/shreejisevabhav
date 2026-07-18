const mongoose = require("mongoose");

const checkoutSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: true
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            default: null
        },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                variantId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant" },
                quantity: Number,
                price: Number,
                discount: Number,
                subtotal: Number
            }
        ],
        subtotal: { type: Number, default: 0 },
        totalDiscount: { type: Number, default: 0 },
        couponCode: { type: String, default: null },
        couponDiscount: { type: Number, default: 0 },
        shippingCharges: { type: Number, default: 0 },
        totalAmount: { type: Number, default: 0 },
        paymentMethod: {
            type: String,
            enum: ["ONLINE", "CASH", null],
            default: null
        },
        status: {
            type: String,
            enum: ["PENDING", "COMPLETED", "FAILED", "EXPIRED"],
            default: "PENDING"
        },
        expiresAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// TTL index to automatically remove expired pending sessions if needed (Optional, but good for cleanup)
checkoutSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const CheckoutSession = mongoose.model("CheckoutSession", checkoutSessionSchema);
module.exports = CheckoutSession;
