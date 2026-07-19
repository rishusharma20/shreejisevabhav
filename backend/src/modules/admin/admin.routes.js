const express = require("express");
const {
    getDashboard,
    getInventoryAlerts,
    getSalesReport,
    getAllUsers,
    blockUser,
    unblockUser,
    getPendingPayments,
    approvePayment,
    rejectPayment,
    getWebsiteSettings,
    updateWebsiteSettings
} = require("./admin.controller");

// External controllers for delegation
const { createProduct, updateProduct, deleteProduct } = require("../products/product.controller");
const { createProductValidation, updateProductValidation } = require("../products/product.validation");

const { createCollection, updateCollection, deleteCollection } = require("../collections/collection.controller");
const { createCollectionValidation, updateCollectionValidation } = require("../collections/collection.validation");
const { uploadCollection, uploadVariant } = require("../../middleware/multer.middleware");

const { updateOrderStatus } = require("../orders/order.controller");
const { updateOrderStatusValidation } = require("../orders/order.validation");

const { updateJourneyStatus } = require("../track/track.controller");
const { updateStatusValidation } = require("../track/track.validation");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { blockUserValidation, reportQueryValidation } = require("./admin.validation");

const router = express.Router();

// ALL admin routes require authentication and Admin role
router.use(verifyJWT, isAdmin);

// Master Dashboard
router.get("/dashboard", getDashboard);

// Inventory / Alerts
router.get("/inventory/alerts", getInventoryAlerts);

// Reports
router.get("/reports/sales", reportQueryValidation, validate, getSalesReport);

// User Management
router.get("/users", getAllUsers);
router.put("/users/block", blockUserValidation, validate, blockUser);
router.put("/users/unblock", blockUserValidation, validate, unblockUser);

// Payment Verification
router.get("/payments", getPendingPayments);
router.put("/payments/approve/:id", approvePayment);
router.put("/payments/reject/:id", rejectPayment);

// Product Management APIs
router.post("/products", uploadVariant.array("images", 5), createProductValidation, validate, createProduct);
router.put("/products/:id", updateProductValidation, validate, updateProduct);
router.delete("/products/:id", deleteProduct);

// Collection Management APIs
router.post("/collections", uploadCollection.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "thumbnailImage", maxCount: 1 },
    { name: "featuredImage", maxCount: 1 }
]), createCollectionValidation, validate, createCollection);

router.put("/collections/:id", uploadCollection.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "thumbnailImage", maxCount: 1 },
    { name: "featuredImage", maxCount: 1 }
]), updateCollectionValidation, validate, updateCollection);

router.delete("/collections/:id", deleteCollection);

// Order Management APIs
router.put("/orders/:id", updateOrderStatusValidation, validate, updateOrderStatus);

// Track My Seva APIs
router.put("/track-my-seva/:id", updateStatusValidation, validate, updateJourneyStatus);

// Website Management APIs
router.get("/website-settings", getWebsiteSettings);
router.put("/website-settings", updateWebsiteSettings);

module.exports = router;
