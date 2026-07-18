const express = require("express");
const {
    globalSearch,
    searchProducts,
    searchCollections,
    getRelatedProducts,
    getAdminAnalytics
} = require("./search.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { searchValidation } = require("./search.validation");

const router = express.Router();

// Public Discovery Routes
router.get("/", searchValidation, validate, globalSearch);
router.get("/products", searchValidation, validate, searchProducts);
router.get("/collections", searchValidation, validate, searchCollections);
router.get("/related-products", getRelatedProducts);

// Admin Analytics
router.get("/admin/analytics", verifyJWT, isAdmin, getAdminAnalytics);

module.exports = router;
