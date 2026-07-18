const { body } = require("express-validator");

const addressValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required for the address"),
    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^\+?[1-9]\d{1,14}$/)
        .withMessage("Please provide a valid phone number"),
    body("houseNo")
        .trim()
        .notEmpty()
        .withMessage("House/Flat No. is required"),
    body("street")
        .trim()
        .notEmpty()
        .withMessage("Street/Locality is required"),
    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),
    body("state")
        .trim()
        .notEmpty()
        .withMessage("State is required"),
    body("pincode")
        .trim()
        .notEmpty()
        .withMessage("Pincode is required")
        .matches(/^[0-9]{5,6}$/)
        .withMessage("Please provide a valid pincode"),
    body("isDefault")
        .optional()
        .isBoolean()
        .withMessage("isDefault must be a boolean value")
];

const wishlistValidation = [
    body("productId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid Product ID format")
];

module.exports = {
    addressValidation,
    wishlistValidation
};
