const User = require("../../models/User.model");
const { getMasterDashboardOverview } = require("./dashboard.service");
const { getLowStockAlerts } = require("./inventory.service");
const { generateSalesReport } = require("./report.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Get Master Dashboard Overview
// @route   GET /api/v1/admin/dashboard
// @access  Private/Admin
const getDashboard = asyncHandler(async (req, res) => {
    const dashboardData = await getMasterDashboardOverview();
    return res.status(200).json(new ApiResponse(200, "Divine Command Temple Dashboard", { dashboardData }));
});

// @desc    Get Low Stock Alerts
// @route   GET /api/v1/admin/inventory/alerts
// @access  Private/Admin
const getInventoryAlerts = asyncHandler(async (req, res) => {
    const alerts = await getLowStockAlerts();
    return res.status(200).json(new ApiResponse(200, "Inventory Alerts", { alerts, count: alerts.length }));
});

// @desc    Generate Sales Report
// @route   GET /api/v1/admin/reports/sales
// @access  Private/Admin
const getSalesReport = asyncHandler(async (req, res) => {
    const timeframe = req.query.timeframe || "ALL_TIME";
    const reportData = await generateSalesReport(timeframe);
    return res.status(200).json(new ApiResponse(200, `${timeframe} Sales Report`, reportData));
});

// ============================================
// USER MANAGEMENT (SuperAdmin / Admin)
// ============================================

// @desc    Get all users (excluding passwords)
// @route   GET /api/v1/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, "All Users", { users }));
});

// @desc    Block a User
// @route   PUT /api/v1/admin/users/block
// @access  Private/Admin
const blockUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    
    // Prevent blocking self or other admins
    const targetUser = await User.findById(userId);
    if (!targetUser) throw new ApiError(404, "User not found");
    if (targetUser.role === "ADMIN") throw new ApiError(403, "Cannot block another Admin");
    
    targetUser.isBlocked = true;
    await targetUser.save();

    return res.status(200).json(new ApiResponse(200, "User has been blocked successfully", { user: targetUser }));
});

// @desc    Unblock a User
// @route   PUT /api/v1/admin/users/unblock
// @access  Private/Admin
const unblockUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    
    const targetUser = await User.findById(userId);
    if (!targetUser) throw new ApiError(404, "User not found");
    
    targetUser.isBlocked = false;
    await targetUser.save();

    return res.status(200).json(new ApiResponse(200, "User has been unblocked successfully", { user: targetUser }));
});


module.exports = {
    getDashboard,
    getInventoryAlerts,
    getSalesReport,
    getAllUsers,
    blockUser,
    unblockUser
};
