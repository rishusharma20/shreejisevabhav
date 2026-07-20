const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderItemSchema = new mongoose.Schema({
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
    // IMMUTABLE SNAPSHOT DATA (So historical orders don't break if admin changes product later)
    productName: { type: String, required: true },
    variantSize: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtPurchase: { type: Number, required: true },
    discountAtPurchase: { type: Number, default: 0 },
    imageAtPurchase: { type: String, required: true }
});

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            required: true
        },
        trackMySevaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TrackMySeva",
            default: null
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true
        },
        products: [orderItemSchema],
        
        // Pricing Snapshot
        subtotal: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        couponDiscount: { type: Number, default: 0 },
        shippingCharges: { type: Number, default: 0 },
        totalAmount: { type: Number, required: true },
        
        paymentMethod: {
            type: String,
            enum: ["ONLINE", "CASH"],
            required: true
        },
        orderStatus: {
            type: String,
            enum: [
                "PAYMENT_PENDING",
                "UNDER_VERIFICATION",
                "PAYMENT_APPROVED",
                "PAYMENT_REJECTED",
                "ORDER_CONFIRMED",
                "PREPARING",
                "PACKAGING",
                "SHIPPED",
                "OUT_FOR_DELIVERY",
                "DELIVERED",
                "CANCELLED"
            ],
            default: "PAYMENT_PENDING"
        },
        orderNumber: {
            type: String,
            unique: true,
            default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        },
        invoiceNumber: {
            type: String,
            unique: true,
            default: () => `INV-${Date.now()}-${uuidv4().split("-")[0]}`
        },
        isDelivered: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
