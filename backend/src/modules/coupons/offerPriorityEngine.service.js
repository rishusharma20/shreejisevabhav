const Coupon = require("../../models/Coupon.model");
const Offer = require("../../models/Offer.model");
const Order = require("../../models/Order.model");

/**
 * Calculates the discount amount based on type (FIXED vs PERCENTAGE) and constraints.
 */
const calculateDiscountAmount = (cartTotal, type, value, maxDiscount) => {
    if (type === "FREE_SHIPPING") return 0; // Handled separately
    
    let discount = 0;
    if (type === "FIXED") {
        discount = value;
    } else if (type === "PERCENTAGE") {
        discount = cartTotal * (value / 100);
    }
    
    // Apply maximum cap if exists
    if (maxDiscount && discount > maxDiscount) {
        discount = maxDiscount;
    }
    
    return discount > cartTotal ? cartTotal : discount; // Cannot discount more than cart total
};

/**
 * The core engine that evaluates explicit coupons vs automatic offers
 * and returns the scenario that provides maximum savings to the devotee.
 */
const calculateBestSavings = async (userId, cartTotal, explicitCouponCode = null) => {
    let bestDiscount = 0;
    let appliedCoupon = null;
    let appliedOffer = null;
    let isFreeShipping = false;
    let message = "No offers applied.";

    const now = new Date();

    // ----------------------------------------------------
    // SCENARIO 1: Evaluate Explicit Coupon
    // ----------------------------------------------------
    if (explicitCouponCode) {
        const coupon = await Coupon.findOne({
            code: explicitCouponCode.toUpperCase(),
            isActive: true,
            startDate: { $lte: now },
            expiryDate: { $gte: now }
        });

        if (coupon && cartTotal >= coupon.minimumAmount) {
            if (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit) {
                bestDiscount = calculateDiscountAmount(cartTotal, coupon.discountType, coupon.discountValue, coupon.maximumDiscount);
                appliedCoupon = coupon;
                message = `Coupon ${coupon.code} applied successfully!`;
            } else {
                message = "Coupon usage limit reached.";
            }
        } else if (coupon) {
            message = `Minimum cart amount of ₹${coupon.minimumAmount} required for this coupon.`;
        } else {
            message = "Invalid or expired coupon.";
        }
    }

    // ----------------------------------------------------
    // SCENARIO 2: Evaluate Automatic Offers (Priority Engine)
    // ----------------------------------------------------
    
    // Check First Purchase Eligibility
    const previousOrdersCount = await Order.countDocuments({ userId });
    const isFirstPurchase = previousOrdersCount === 0;

    const validOffersQuery = {
        isActive: true,
        startDate: { $lte: now },
        expiryDate: { $gte: now },
        minimumAmount: { $lte: cartTotal }
    };

    const activeOffers = await Offer.find(validOffersQuery);

    for (const offer of activeOffers) {
        // Skip FIRST_PURCHASE if not eligible
        if (offer.targetType === "FIRST_PURCHASE" && !isFirstPurchase) {
            continue;
        }

        // For this MVP, we evaluate GLOBAL and FIRST_PURCHASE mathematically against cartTotal
        // (Product/Collection specific offers would iterate over cart items - simplified for Phase 13 overview)
        
        if (offer.offerType === "FREE_SHIPPING") {
            isFreeShipping = true; // Free shipping is stacked on top of other discounts in a real production system, but here we treat it as an active offer.
        }

        const potentialDiscount = calculateDiscountAmount(cartTotal, offer.offerType, offer.discountValue, offer.maximumDiscount);

        // If this automatic offer gives more savings than the explicit coupon (or previous best offer)
        if (potentialDiscount > bestDiscount) {
            bestDiscount = potentialDiscount;
            appliedOffer = offer;
            appliedCoupon = null; // Offer overrode the coupon!
            message = `Automatic Blessing Applied: ${offer.title} (${offer.description})`;
        }
    }

    // ----------------------------------------------------
    // FINAL RESULT
    // ----------------------------------------------------
    
    // If we have an applied coupon, we must increment its usage count during actual checkout (not here in calculation)
    
    return {
        originalTotal: cartTotal,
        discountApplied: bestDiscount,
        finalTotal: cartTotal - bestDiscount,
        isFreeShipping,
        appliedCoupon: appliedCoupon ? { code: appliedCoupon.code, title: appliedCoupon.title } : null,
        appliedOffer: appliedOffer ? { title: appliedOffer.title } : null,
        message
    };
};

module.exports = {
    calculateBestSavings
};
