const express = require("express");
const {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    moveToSaveForLater,
    getSaveForLaterItems,
    moveToCart,
    getPriceDetails
} = require("./cart.controller");
const { applyCoupon, removeCoupon } = require("./coupon.controller");
const { verifyJWT } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { addToCartValidation, updateQuantityValidation, applyCouponValidation } = require("./cart.validation");

const router = express.Router();

// ALL cart routes require authentication for Stage 1
router.use(verifyJWT);

// Cart Items Management
router.post("/add", addToCartValidation, validate, addToCart);
router.get("/", getCart);
router.put("/update/:variantId", updateQuantityValidation, validate, updateQuantity);
router.delete("/remove/:variantId", removeFromCart);
router.delete("/clear", clearCart);

// Save For Later
router.post("/save-for-later", moveToSaveForLater);
router.get("/save-for-later", getSaveForLaterItems);
router.post("/move-to-cart", moveToCart);

// Pricing and Coupons (Bound to Cart context)
router.get("/price-details", getPriceDetails);
router.post("/apply-coupon", applyCouponValidation, validate, applyCoupon);
router.delete("/remove-coupon", removeCoupon);

module.exports = router;
