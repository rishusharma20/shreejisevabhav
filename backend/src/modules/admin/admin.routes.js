const express = require("express");
const {
    getDashboard,
    getInventoryAlerts,
    getSalesReport,
    getAllUsers,
    blockUser,
    unblockUser
} = require("./admin.controller");
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

module.exports = router;
