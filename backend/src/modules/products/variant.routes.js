const express = require("express");
const {
    createVariant,
    updateVariant,
    deleteVariant,
    getVariantsByProduct,
    getVariant
} = require("./variant.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { variantValidation, updateVariantValidation } = require("./product.validation");
const { uploadVariant } = require("../../middleware/multer.middleware");

const router = express.Router();

// Public Routes
router.get("/product/:productId", getVariantsByProduct);
router.get("/:id", getVariant);

// Protected Admin Routes
router.use(verifyJWT, isAdmin);

router.post(
    "/create",
    uploadVariant.array("images", 10), // Max 10 images per variant
    variantValidation,
    validate,
    createVariant
);

router.put(
    "/update/:id",
    uploadVariant.array("images", 10),
    updateVariantValidation,
    validate,
    updateVariant
);

router.delete("/delete/:id", deleteVariant);

module.exports = router;
