const { body } = require("express-validator");

const calculateSavingsValidation = [
    body("cartTotal")
        .notEmpty()
        .withMessage("Cart total is required")
        .isNumeric()
        .withMessage("Cart total must be a number"),
    body("couponCode")
        .optional()
        .isString()
        .trim()
];

const createCouponValidation = [
    body("code").trim().notEmpty().withMessage("Coupon code is required"),
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("discountType").isIn(["PERCENTAGE", "FIXED"]).withMessage("Invalid discount type"),
    body("discountValue").isNumeric().withMessage("Discount value must be a number").custom((value, { req }) => {
        if (req.body.discountType === "PERCENTAGE" && (value < 1 || value > 100)) {
            throw new Error("Percentage discount must be between 1 and 100");
        }
        return true;
    }),
    body("expiryDate").isISO8601().withMessage("Invalid expiry date")
];

module.exports = {
    calculateSavingsValidation,
    createCouponValidation
};
