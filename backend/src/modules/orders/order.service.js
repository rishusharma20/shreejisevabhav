const Order = require("../../models/Order.model");

const ProductVariant = require("../../models/ProductVariant.model");
const Product = require("../../models/Product.model");

/**
 * Creates the IMMUTABLE Order snapshot based on the locked CheckoutSession.
 */
const createOrderFromPayment = async (payment) => {
    throw new Error("Payments and orders are disabled in Phase 1");
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
