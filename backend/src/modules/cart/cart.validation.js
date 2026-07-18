const { body } = require("express-validator");

const addToCartValidation = [
    body("productId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid Product ID format"),
    body("variantId")
        .trim()
        .notEmpty()
        .withMessage("Variant ID is required")
        .isMongoId()
        .withMessage("Invalid Variant ID format"),
    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1")
];

const updateQuantityValidation = [
    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1")
];

const applyCouponValidation = [
    body("code")
        .trim()
        .notEmpty()
        .withMessage("Coupon code is required")
];

module.exports = {
    addToCartValidation,
    updateQuantityValidation,
    applyCouponValidation
};
