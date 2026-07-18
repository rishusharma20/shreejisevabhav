const { body } = require("express-validator");

const createCollectionValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Collection name is required"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),
    body("displayOrder")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Display order must be a positive integer"),
    body("slug")
        .optional()
        .trim()
];

const updateCollectionValidation = [
    body("name").optional().trim().notEmpty(),
    body("description").optional().trim().notEmpty(),
    body("category").optional().trim().notEmpty(),
    body("displayOrder").optional().isInt({ min: 0 })
];

module.exports = {
    createCollectionValidation,
    updateCollectionValidation
};
