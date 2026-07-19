const ProductVariant = require("../../models/ProductVariant.model");
/**
 * Recalculates the entire cart pricing structure.
 * ALWAYS trusts the Database for variant pricing, NEVER the frontend.
 * @param {Object} cart - The Mongoose Cart Document
 * @returns {Promise<Object>} - The updated cart document
 */
const recalculateCart = async (cart) => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalProducts = 0;

    // 1. Calculate items based on current DB Variant Prices
    for (let item of cart.products) {
        const variant = await ProductVariant.findById(item.variantId);
        
        // If variant doesn't exist or is out of stock, we might want to flag it or remove it,
        // but for calculation purposes, if it's there, we calculate based on current DB price.
        if (variant) {
            item.price = variant.price;
            
            // Calculate discount for this item if variant has a discount percentage
            let itemDiscount = 0;
            if (variant.discount > 0) {
                itemDiscount = (variant.price * variant.discount) / 100;
            }
            
            item.discount = itemDiscount * item.quantity;
            item.subtotal = (item.price * item.quantity) - item.discount;
            
            subtotal += (item.price * item.quantity);
            totalDiscount += item.discount;
            totalProducts += item.quantity;
        }
    }

    cart.subtotal = subtotal;
    cart.totalDiscount = totalDiscount;
    cart.totalProducts = totalProducts;

    let totalAmount = subtotal - totalDiscount;

    // 2. Process Coupon if exists (Removed in V1)
    cart.couponDiscount = 0;
    cart.couponCode = null;

    totalAmount -= cart.couponDiscount;

    // 3. Shipping Logic (Free shipping above 1000, else 100)
    // For Phase 6, we implement basic shipping logic.
    if (totalAmount > 0 && totalAmount < 1000) {
        cart.shippingCharge = 100;
    } else {
        cart.shippingCharge = 0;
    }

    cart.totalAmount = totalAmount + cart.shippingCharge;
    
    // Prevent negative total
    if (cart.totalAmount < 0) {
        cart.totalAmount = 0;
    }

    // Checkout Readiness
    cart.isCheckoutReady = cart.totalAmount > 0 && cart.products.length > 0;

    return cart;
};

module.exports = {
    recalculateCart
};
