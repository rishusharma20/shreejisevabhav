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
 * Reduces Inventory atomically and increments Total Sold
 */
const reduceInventory = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order || order.inventoryDeducted) return;

    for (const item of order.products) {
        // Decrease Variant Quantity atomically preventing oversell
        const updatedVariant = await ProductVariant.findOneAndUpdate(
            {
                _id: item.variantId,
                quantity: { $gte: item.quantity }
            },
            {
                $inc: { quantity: -item.quantity }
            },
            { returnDocument: 'after' }
        );

        if (!updatedVariant) {
            console.error(`Insufficient stock to deduct for variant ${item.variantId} in order ${orderId}`);
        } else if (updatedVariant.quantity <= 0 && updatedVariant.isAvailable) {
            updatedVariant.isAvailable = false;
            await updatedVariant.save();
        }

        // Increase Product Total Sold (Powers the Discovery Engine / Trending algorithms)
        await Product.findByIdAndUpdate(item.productId, {
            $inc: { totalSold: item.quantity }
        });
    }

    order.inventoryDeducted = true;
    await order.save();
};

module.exports = {
    createOrderFromPayment,
    reduceInventory
};
