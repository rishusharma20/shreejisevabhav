const express = require("express");
const {
    getMyNotifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    getMySettings,
    updateMySettings,
    adminBroadcast,
    adminGetAnalytics
} = require("./notification.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { broadcastValidation, updateSettingsValidation } = require("./notification.validation");

const router = express.Router();

// All notification routes require authentication
router.use(verifyJWT);

// User Routes
router.get("/", getMyNotifications);
router.put("/:id/read", markAsRead);
router.put("/read-all", markAllAsRead);
router.delete("/clear", clearNotifications);
router.get("/settings", getMySettings);
router.put("/settings", updateSettingsValidation, validate, updateMySettings);

// Admin Routes
router.post("/admin/broadcast", isAdmin, broadcastValidation, validate, adminBroadcast);
router.get("/admin/analytics", isAdmin, adminGetAnalytics);

module.exports = router;
