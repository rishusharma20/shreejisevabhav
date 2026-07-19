const NotificationSettings = require("../../models/NotificationSettings.model");

/**
 * Fetches user notification preferences. Creates them if they don't exist.
 */
const getPreferences = async (userId) => {
    let settings = await NotificationSettings.findOne({ userId });
    
    if (!settings) {
        // Fallback if auth controller failed or user is legacy
        settings = await NotificationSettings.create({ userId });
    }
    
    return settings;
};

/**
 * Validates if the user is opted-in to receive a specific notification type.
 */
const isOptedIn = async (userId, notificationType) => {
    const settings = await getPreferences(userId);

    // Map notification types to the schema settings
    const mapping = {
        "WELCOME": settings.marketingNotifications,
        "PAYMENT": settings.paymentNotifications,
        "ORDER": settings.orderNotifications,
        "DELIVERY": settings.orderNotifications,
        "TRACK_MY_SEVA": settings.trackMySevaNotifications,
        "FESTIVAL": settings.festivalNotifications,
        "OFFERS": settings.offerNotifications,
        "COLLECTIONS": settings.marketingNotifications,
        "PRODUCTS": settings.marketingNotifications,
        "WEBSITE": true, // Critical system updates cannot be opted out
        "ANNOUNCEMENTS": settings.marketingNotifications
    };

    return mapping[notificationType] !== false; // If undefined, default to true
};

const updatePreferences = async (userId, updateData) => {
    return await NotificationSettings.findOneAndUpdate(
        { userId },
        updateData,
        { new: true, upsert: true }
    );
};

module.exports = {
    getPreferences,
    isOptedIn,
    updatePreferences
};
