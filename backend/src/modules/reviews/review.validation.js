const { body } = require("express-validator");

const createReviewValidation = [
    body("productId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid Product ID format"),
    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isNumeric()
        .withMessage("Rating must be a number")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ max: 1000 })
        .withMessage("Description cannot exceed 1000 characters")
];

module.exports = {
    createReviewValidation
};
