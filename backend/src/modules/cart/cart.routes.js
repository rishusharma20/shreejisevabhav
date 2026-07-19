const express = require("express");
const {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getPriceDetails
} = require("./cart.controller");
const { verifyJWT } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { addToCartValidation, updateQuantityValidation } = require("./cart.validation");

const router = express.Router();

// ALL cart routes require authentication for Stage 1
router.use(verifyJWT);

// Cart Items Management
router.post("/add", addToCartValidation, validate, addToCart);
router.get("/", getCart);
router.put("/update/:variantId", updateQuantityValidation, validate, updateQuantity);
router.delete("/remove/:variantId", removeFromCart);
router.delete("/clear", clearCart);

// Pricing (Bound to Cart context)
router.get("/price-details", getPriceDetails);

module.exports = router;
