const User = require("../../models/User.model");
const Product = require("../../models/Product.model");
const Collection = require("../../models/Collection.model");
const Payment = require("../../models/Payment.model");
const TrackMySeva = require("../../models/TrackMySeva.model");
const { getOrderAnalytics } = require("../orders/analytics.service");

/**
 * Orchestrates multiple backend services to build the Master Admin Dashboard Payload.
 * Uses real-time aggregations to guarantee 100% accuracy.
 */
const getMasterDashboardOverview = async () => {
    // 1. High Level Entity Counts
    const [totalUsers, totalProducts, totalCollections, totalActiveJourneys, failedPayments] = await Promise.all([
        User.countDocuments({ role: "USER" }),
        Product.countDocuments(),
        Collection.countDocuments(),
        TrackMySeva.countDocuments({ currentStatus: { $ne: "COMPLETED" }, isDelivered: false }),
        Payment.countDocuments({ paymentStatus: "FAILED" })
    ]);

    // 2. Order Analytics (Total Revenue, Total Orders, Average Order Value, Status Breakdown)
    const orderAnalytics = await getOrderAnalytics();

    return {
        overview: {
            totalUsers,
            totalProducts,
            totalCollections,
            activeJourneys: totalActiveJourneys
        },
        financials: {
            totalRevenue: orderAnalytics.revenue.total,
            averageOrderValue: orderAnalytics.revenue.averageOrderValue,
            totalValidOrders: orderAnalytics.revenue.totalValidOrders,
            failedPayments
        },
        orderStatusBreakdown: orderAnalytics.statusBreakdown
    };
};

module.exports = {
    getMasterDashboardOverview
};
