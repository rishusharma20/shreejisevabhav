const Notification = require("../../models/Notification.model");
const User = require("../../models/User.model");
const { isOptedIn } = require("./preference.service");
const { sendEmailAsync } = require("./email.service");

const determinePriority = (type) => {
    if (["PAYMENT", "ORDER", "TRACK_MY_SEVA", "DELIVERY"].includes(type)) return "HIGH";
    if (["FESTIVAL", "COLLECTIONS", "OFFERS"].includes(type)) return "MEDIUM";
    return "LOW";
};

/**
 * The Master Orchestrator for Notifications.
 * All other modules (OrderService, PaymentService) should call this function.
 */
const dispatchNotification = async (userId, type, title, message, redirectURL = null, emailRequired = true) => {
    
    // 1. Check Preferences Gatekeeper
    const canSend = await isOptedIn(userId, type);
    if (!canSend) {
        console.log(`Notification dropped. User ${userId} opted out of ${type}.`);
        return null; // Silently drop
    }

    // 2. Determine Priority
    const priority = determinePriority(type);

    // 3. Save to DB (For the UI Dropdown)
    const notification = await Notification.create({
        userId,
        title,
        message,
        notificationType: type,
        redirectURL,
        priority
    });

    // 4. Fire Async Email (if required and allowed)
    if (emailRequired) {
        const user = await User.findById(userId).select("email");
        if (user && user.email) {
            // Fire and forget
            sendEmailAsync(user.email, title, message).catch(err => console.error("Email error:", err));
        }
    }

    return notification;
};

const getUserNotifications = async (userId) => {
    return await Notification.find({ userId })
        .sort({ priority: 1, createdAt: -1 }) // Sort by High Priority, then Newest
        .limit(50);
};

module.exports = {
    dispatchNotification,
    getUserNotifications
};
