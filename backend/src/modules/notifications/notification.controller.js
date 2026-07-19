const Notification = require("../../models/Notification.model");
const User = require("../../models/User.model");
const { getUserNotifications, dispatchNotification } = require("./notification.service");
const { getPreferences, updatePreferences } = require("./preference.service");
const { getNotificationAnalytics } = require("./analytics.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// ============================================
// USER ENDPOINTS
// ============================================

// @desc    Get User Notifications
// @route   GET /api/v1/notifications
// @access  Private
const getMyNotifications = asyncHandler(async (req, res) => {
    const notifications = await getUserNotifications(req.user._id);
    return res.status(200).json(new ApiResponse(200, "Your Divine Messages", { notifications }));
});

// @desc    Mark Notification as Read
// @route   PUT /api/v1/notifications/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
    const notification = await Notification.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        { isRead: true },
        { new: true }
    );
    if (!notification) throw new ApiError(404, "Notification not found");
    return res.status(200).json(new ApiResponse(200, "Marked as read"));
});

// @desc    Mark All as Read
// @route   PUT /api/v1/notifications/read-all
// @access  Private
const markAllAsRead = asyncHandler(async (req, res) => {
    await Notification.updateMany(
        { userId: req.user._id, isRead: false },
        { isRead: true }
    );
    return res.status(200).json(new ApiResponse(200, "All messages marked as read"));
});

// @desc    Clear (Delete) User Notifications
// @route   DELETE /api/v1/notifications/clear
// @access  Private
const clearNotifications = asyncHandler(async (req, res) => {
    await Notification.deleteMany({ userId: req.user._id });
    return res.status(200).json(new ApiResponse(200, "Messages cleared"));
});

// @desc    Get Notification Settings
// @route   GET /api/v1/notifications/settings
// @access  Private
const getMySettings = asyncHandler(async (req, res) => {
    const settings = await getPreferences(req.user._id);
    return res.status(200).json(new ApiResponse(200, "Notification Settings", { settings }));
});

// @desc    Update Notification Settings
// @route   PUT /api/v1/notifications/settings
// @access  Private
const updateMySettings = asyncHandler(async (req, res) => {
    const settings = await updatePreferences(req.user._id, req.body);
    return res.status(200).json(new ApiResponse(200, "Settings updated successfully", { settings }));
});


// ============================================
// ADMIN ENDPOINTS
// ============================================

// @desc    Admin: Broadcast Notification to All Users
// @route   POST /api/v1/notifications/admin/broadcast
// @access  Private/Admin
const adminBroadcast = asyncHandler(async (req, res) => {
    const { title, message, notificationType, redirectURL } = req.body;

    // In a massive production system, we would push this to an SQS/RabbitMQ queue.
    // For MVP, we iterate and rely on dispatchNotification to check preferences per user.
    const users = await User.find().select("_id");
    
    let sentCount = 0;
    for (const user of users) {
        const notif = await dispatchNotification(user._id, notificationType, title, message, redirectURL, true);
        if (notif) sentCount++;
    }

    return res.status(200).json(new ApiResponse(200, `Broadcast dispatched. Delivered to ${sentCount} opted-in devotees.`));
});

// @desc    Admin: Get Notification Analytics
// @route   GET /api/v1/notifications/admin/analytics
// @access  Private/Admin
const adminGetAnalytics = asyncHandler(async (req, res) => {
    const analytics = await getNotificationAnalytics();
    return res.status(200).json(new ApiResponse(200, "Notification Analytics", { analytics }));
});

module.exports = {
    getMyNotifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    getMySettings,
    updateMySettings,
    adminBroadcast,
    adminGetAnalytics
};
