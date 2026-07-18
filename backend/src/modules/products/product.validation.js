const { body } = require("express-validator");

const createProductValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required"),
    body("shortDescription")
        .trim()
        .notEmpty()
        .withMessage("Short description is required"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),
    body("collectionId")
        .trim()
        .notEmpty()
        .withMessage("Collection ID is required")
        .isMongoId()
        .withMessage("Invalid Collection ID format"),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
];

const updateProductValidation = [
    body("name").optional().trim().notEmpty(),
    body("shortDescription").optional().trim().notEmpty(),
    body("description").optional().trim().notEmpty(),
    body("collectionId").optional().trim().isMongoId(),
    body("category").optional().trim().notEmpty()
];

const variantValidation = [
    body("productId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid Product ID format"),
    body("size")
        .trim()
        .notEmpty()
        .withMessage("Size is required"),
    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0 })
        .withMessage("Price cannot be negative"),
    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 0 })
        .withMessage("Quantity cannot be negative"),
    body("discount")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Discount must be between 0 and 100")
];

const updateVariantValidation = [
    body("size").optional().trim().notEmpty(),
    body("price").optional().isFloat({ min: 0 }),
    body("quantity").optional().isInt({ min: 0 }),
    body("discount").optional().isFloat({ min: 0, max: 100 })
];

module.exports = {
    createProductValidation,
    updateProductValidation,
    variantValidation,
    updateVariantValidation
};
