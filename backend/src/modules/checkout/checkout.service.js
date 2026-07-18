const ProductVariant = require("../../models/ProductVariant.model");
const Product = require("../../models/Product.model");
const ApiError = require("../../utils/ApiError");

/**
 * Verifies that the cart's exact state matches the current database reality.
 * Returns true if perfectly matched, otherwise throws specific errors.
 */
const verifyCartIntegrity = async (cart) => {
    if (!cart.products || cart.products.length === 0) {
        throw new ApiError(400, "Cannot checkout an empty cart");
    }

    let calculatedSubtotal = 0;
    let calculatedTotalDiscount = 0;

    for (const item of cart.products) {
        const product = await Product.findById(item.productId);
        if (!product || !product.isActive) {
            throw new ApiError(404, `Product unavailable: ${item.productId}`);
        }

        const variant = await ProductVariant.findById(item.variantId);
        if (!variant || !variant.isAvailable) {
            throw new ApiError(400, `Variant out of stock: ${item.variantId}`);
        }

        if (variant.quantity < item.quantity) {
            throw new ApiError(400, `Requested quantity exceeds available stock for variant: ${item.variantId}`);
        }

        if (variant.price !== item.price) {
            throw new ApiError(400, `Price changed for variant: ${item.variantId}. Please refresh your cart.`);
        }

        // Verify discount logic
        let expectedDiscount = 0;
        if (variant.discount > 0) {
            expectedDiscount = (variant.price * variant.discount) / 100;
        }
        
        expectedDiscount = expectedDiscount * item.quantity;
        
        // Use a small tolerance for floating point math
        if (Math.abs(expectedDiscount - item.discount) > 0.01) {
             throw new ApiError(400, `Discount mismatch for variant: ${item.variantId}. Please refresh your cart.`);
        }

        calculatedSubtotal += (item.price * item.quantity);
        calculatedTotalDiscount += expectedDiscount;
    }

    if (Math.abs(calculatedSubtotal - cart.subtotal) > 0.01 || Math.abs(calculatedTotalDiscount - cart.totalDiscount) > 0.01) {
        throw new ApiError(400, "Cart totals mismatch DB reality. Please refresh your cart.");
    }

    return true;
};

module.exports = {
    verifyCartIntegrity
};
