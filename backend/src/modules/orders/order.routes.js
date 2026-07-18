const express = require("express");
const {
    getMyOrders,
    getOrderById,
    cancelOrder,
    downloadInvoice,
    getAllOrders,
    updateOrderStatus,
    getAdminAnalytics
} = require("./order.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { updateOrderStatusValidation } = require("./order.validation");

const router = express.Router();

router.use(verifyJWT);

// User Routes
router.get("/", getMyOrders);
router.get("/:id", getOrderById);
router.post("/:id/cancel", cancelOrder);
router.get("/:id/invoice", downloadInvoice);

// Admin Routes
router.get("/admin/all", isAdmin, getAllOrders);
router.get("/admin/analytics", isAdmin, getAdminAnalytics);
router.put("/admin/:id/status", isAdmin, updateOrderStatusValidation, validate, updateOrderStatus);

module.exports = router;
