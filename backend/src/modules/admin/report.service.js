const Order = require("../../models/Order.model");

/**
 * Generates JSON payload for Reports (can be exported to CSV by frontend).
 */
const generateSalesReport = async (timeframe) => {
    let dateFilter = {};
    const now = new Date();

    if (timeframe === "DAILY") {
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        dateFilter = { createdAt: { $gte: startOfDay } };
    } else if (timeframe === "WEEKLY") {
        const startOfWeek = new Date(now.setDate(now.getDate() - 7));
        dateFilter = { createdAt: { $gte: startOfWeek } };
    } else if (timeframe === "MONTHLY") {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        dateFilter = { createdAt: { $gte: startOfMonth } };
    }

    const reportData = await Order.find({
        ...dateFilter,
        orderStatus: { $in: ["ACCEPTED", "PROCESSING", "PACKAGING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"] }
    })
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

    const formattedReport = reportData.map(order => ({
        orderId: order.orderNumber,
        date: order.createdAt,
        customerName: order.userId.name,
        customerEmail: order.userId.email,
        totalAmount: order.totalAmount,
        status: order.orderStatus,
        paymentMethod: order.paymentMethod,
        itemsPurchased: order.products.length
    }));

    const summary = {
        totalOrders: formattedReport.length,
        totalRevenue: formattedReport.reduce((acc, curr) => acc + curr.totalAmount, 0),
        timeframe
    };

    return {
        summary,
        data: formattedReport
    };
};

module.exports = {
    generateSalesReport
};
