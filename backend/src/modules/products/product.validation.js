const { body } = require("express-validator");

const validateVariantsArray = (val) => {
    let list = val;
    if (typeof val === "string") {
        try {
            list = JSON.parse(val);
        } catch {
            throw new Error("Variants must be a valid JSON array");
        }
    }
    if (!Array.isArray(list) || list.length === 0) {
        throw new Error("At least one size variant is required");
    }
    const seenSizes = new Set();
    for (const v of list) {
        if (!v || typeof v !== "object") {
            throw new Error("Invalid variant entry");
        }
        const size = v.size !== undefined ? String(v.size).trim() : "";
        if (!size) {
            throw new Error("Size is required for each variant");
        }
        const lowerSize = size.toLowerCase();
        if (seenSizes.has(lowerSize)) {
            throw new Error(`Duplicate size detected: ${size}`);
        }
        seenSizes.add(lowerSize);

        const qty = v.quantity !== undefined ? v.quantity : v.stock;
        if (
            qty === undefined ||
            qty === null ||
            qty === "" ||
            isNaN(Number(qty)) ||
            !Number.isInteger(Number(qty)) ||
            Number(qty) < 0
        ) {
            throw new Error(`Stock quantity for size "${size}" must be a non-negative whole number`);
        }
    }
    return true;
};

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
        .withMessage("Category is required"),
    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0 })
        .withMessage("Price cannot be negative"),
    body("variants")
        .optional()
        .custom(validateVariantsArray),
    body("quantity")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Quantity cannot be negative"),
    body("size")
        .optional()
        .trim(),
    body().custom((value, { req }) => {
        if (!req.body.variants && (!req.body.size || req.body.quantity === undefined || req.body.quantity === "")) {
            throw new Error("Either variants array or size and quantity must be provided");
        }
        return true;
    })
];

const updateProductValidation = [
    body("name").optional().trim().notEmpty(),
    body("shortDescription").optional().trim().notEmpty(),
    body("description").optional().trim().notEmpty(),
    body("collectionId").optional().trim().isMongoId(),
    body("category").optional().trim().notEmpty(),
    body("price").optional().isFloat({ min: 0 }),
    body("variants").optional().custom(validateVariantsArray),
    body("quantity").optional().isInt({ min: 0 }),
    body("size").optional().trim().notEmpty()
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
    validateVariantsArray,
    createProductValidation,
    updateProductValidation,
    variantValidation,
    updateVariantValidation
};
