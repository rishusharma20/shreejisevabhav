const express = require("express");
const {
    createProduct,
    createVariant,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getTrendingProducts,
    getProductsByCollection
} = require("./product.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { uploadVariant } = require("../../middleware/multer.middleware");
const { createProductValidation, updateProductValidation, variantValidation } = require("./product.validation");

const router = express.Router();

// Public Routes
router.get("/", getAllProducts);
router.get("/type/featured", getFeaturedProducts);
router.get("/type/trending", getTrendingProducts);
router.get("/collection/:id", getProductsByCollection);
router.get("/:identifier", getProduct); // slug or id

// Protected Admin Routes
router.use(verifyJWT, isAdmin);

router.post("/create", createProductValidation, validate, createProduct);
router.post("/:id/variants", uploadVariant.array("images", 5), (req, res, next) => {
    // Inject productId into req.body for validation
    req.body.productId = req.params.id;
    next();
}, variantValidation, validate, createVariant);

router.put("/update/:id", updateProductValidation, validate, updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
