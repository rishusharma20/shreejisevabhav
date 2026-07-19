const Notification = require("../../models/Notification.model");

const getNotificationAnalytics = async () => {
    const [totalSent, totalRead, unread, typesBreakdown] = await Promise.all([
        Notification.countDocuments(),
        Notification.countDocuments({ isRead: true }),
        Notification.countDocuments({ isRead: false }),
        Notification.aggregate([
            { $group: { _id: "$notificationType", count: { $sum: 1 } } }
        ])
    ]);

    return {
        totalSent,
        totalRead,
        unread,
        openRate: totalSent > 0 ? ((totalRead / totalSent) * 100).toFixed(2) + "%" : "0%",
        typesBreakdown
    };
};

module.exports = {
    getNotificationAnalytics
};
