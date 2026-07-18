const Order = require("../../models/Order.model");
const CheckoutSession = require("../../models/CheckoutSession.model");
const ProductVariant = require("../../models/ProductVariant.model");
const Product = require("../../models/Product.model");

/**
 * Creates the IMMUTABLE Order snapshot based on the locked CheckoutSession.
 */
const createOrderFromPayment = async (payment) => {
    // 1. Fetch the locked session
    const session = await CheckoutSession.findById(payment.checkoutId).populate("items.productId").populate("items.variantId");
    
    if (!session) {
        throw new Error("Critical Error: Checkout Session missing for Payment");
    }

    // 2. Build the Immutable Product Array
    const orderProducts = session.items.map(item => ({
        productId: item.productId._id,
        variantId: item.variantId._id,
        productName: item.productId.name,
        variantSize: item.variantId.size,
        quantity: item.quantity,
        priceAtPurchase: item.price,
        discountAtPurchase: item.discount,
        imageAtPurchase: item.productId.images && item.productId.images.length > 0 ? item.productId.images[0] : "default.jpg"
    }));

    // 3. Create the Order
    const order = await Order.create({
        userId: payment.userId,
        paymentId: payment._id,
        addressId: session.addressId,
        products: orderProducts,
        subtotal: session.subtotal,
        discount: session.totalDiscount,
        couponDiscount: session.couponDiscount,
        shippingCharges: session.shippingCharges,
        totalAmount: session.totalAmount,
        paymentMethod: payment.paymentMethod,
        orderStatus: "ACCEPTED"
    });

    return order;
};

/**
 * Reduces Inventory and increments Total Sold
 */
const reduceInventory = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) return;

    for (const item of order.products) {
        // Decrease Variant Quantity
        await ProductVariant.findByIdAndUpdate(item.variantId, {
            $inc: { quantity: -item.quantity }
        });

        // Increase Product Total Sold (Powers the Discovery Engine / Trending algorithms)
        await Product.findByIdAndUpdate(item.productId, {
            $inc: { totalSold: item.quantity }
        });
    }
};

module.exports = {
    createOrderFromPayment,
    reduceInventory
};
