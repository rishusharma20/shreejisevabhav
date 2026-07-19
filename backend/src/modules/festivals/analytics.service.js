const Order = require("../../models/Order.model");

/**
 * Calculates analytics for a specific festival based on its timeline.
 */
const getFestivalAnalytics = async (festival) => {
    if (!festival) return null;

    // We calculate the revenue generated STRICTLY within the festival's active window
    const stats = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: festival.startDate, $lte: festival.endDate },
                orderStatus: { $in: ["ACCEPTED", "PROCESSING", "PACKAGING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"] }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 }
            }
        }
    ]);

    return {
        festivalName: festival.title,
        timeline: {
            start: festival.startDate,
            end: festival.endDate
        },
        performance: stats.length > 0 ? stats[0] : { totalRevenue: 0, totalOrders: 0 }
    };
};

module.exports = {
    getFestivalAnalytics
};
