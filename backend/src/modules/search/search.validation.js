const { query } = require("express-validator");

const searchValidation = [
    query("q")
        .trim()
        .notEmpty()
        .withMessage("Search query 'q' is required")
];

const filterValidation = [
    query("minPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("minPrice must be a positive number"),
    query("maxPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("maxPrice must be a positive number"),
    query("size")
        .optional()
        .trim(),
    query("category")
        .optional()
        .trim(),
    query("festival")
        .optional()
        .trim()
];

module.exports = {
    searchValidation,
    filterValidation
};
