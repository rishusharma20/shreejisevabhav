const Order = require("../../models/Order.model");

const getOrderAnalytics = async () => {
    // 1. Status Counts
    const statusCounts = await Order.aggregate([
        {
            $group: {
                _id: "$orderStatus",
                count: { $sum: 1 }
            }
        }
    ]);

    // 2. Total Revenue & Average Order Value
    const revenueMetrics = await Order.aggregate([
        {
            $match: {
                orderStatus: { $in: ["ACCEPTED", "PROCESSING", "PACKAGING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"] }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 },
                averageOrderValue: { $avg: "$totalAmount" }
            }
        }
    ]);

    // Format output
    const formattedCounts = {};
    statusCounts.forEach(item => {
        formattedCounts[item._id] = item.count;
    });

    return {
        statusBreakdown: formattedCounts,
        revenue: revenueMetrics.length > 0 ? {
            total: revenueMetrics[0].totalRevenue,
            totalValidOrders: revenueMetrics[0].totalOrders,
            averageOrderValue: Math.round(revenueMetrics[0].averageOrderValue)
        } : { total: 0, totalValidOrders: 0, averageOrderValue: 0 }
    };
};

module.exports = {
    getOrderAnalytics
};
