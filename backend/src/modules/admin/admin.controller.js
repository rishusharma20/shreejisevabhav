const User = require("../../models/User.model");
const { getMasterDashboardOverview } = require("./dashboard.service");
const { getLowStockAlerts } = require("./inventory.service");
const { generateSalesReport } = require("./report.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const Payment = require("../../models/Payment.model");
const Order = require("../../models/Order.model");
const TrackMySeva = require("../../models/TrackMySeva.model");
const WebsiteSettings = require("../../models/WebsiteSettings.model");

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

// ==========================================
// PAYMENT VERIFICATION MODULE
// ==========================================

const getPendingPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find({ paymentStatus: "UNDER_VERIFICATION" })
        .populate("userId", "fullName email phone")
        .sort({ updatedAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, "Pending payments fetched successfully", { payments })
    );
});

const approvePayment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const payment = await Payment.findById(id);
    if (!payment) {
        throw new ApiError(404, "Payment record not found");
    }

    if (payment.paymentStatus !== "UNDER_VERIFICATION") {
        throw new ApiError(400, "Payment is not under verification");
    }

    payment.paymentStatus = "PAYMENT_APPROVED";
    await payment.save();

    const order = await Order.findOne({ paymentId: id });
    if (order) {
        order.orderStatus = "ORDER_CONFIRMED";
        
        // Create TrackMySeva document
        const track = await TrackMySeva.create({
            userId: payment.userId,
            orderId: order._id,
            paymentId: payment._id,
            currentStatus: "PAYMENT_APPROVED",
            timeline: [
                {
                    status: "PAYMENT_APPROVED",
                    title: "Payment Approved",
                    description: "Your payment has been manually verified and approved."
                }
            ]
        });
        
        order.trackMySevaId = track._id;
        await order.save();
    }

    return res.status(200).json(
        new ApiResponse(200, "Payment approved successfully", { payment })
    );
});

const rejectPayment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const payment = await Payment.findById(id);
    if (!payment) {
        throw new ApiError(404, "Payment record not found");
    }

    if (payment.paymentStatus !== "UNDER_VERIFICATION") {
        throw new ApiError(400, "Payment is not under verification");
    }

    payment.paymentStatus = "PAYMENT_REJECTED";
    await payment.save();

    const order = await Order.findOne({ paymentId: id });
    if (order) {
        order.orderStatus = "PAYMENT_REJECTED";
        await order.save();
    }

    return res.status(200).json(
        new ApiResponse(200, "Payment rejected successfully", { payment })
    );
});

// ==========================================
// WEBSITE MANAGEMENT MODULE
// ==========================================

const getWebsiteSettings = asyncHandler(async (req, res) => {
    let settings = await WebsiteSettings.findOne({ isSingleton: true });
    
    if (!settings) {
        settings = await WebsiteSettings.create({ isSingleton: true });
    }

    return res.status(200).json(
        new ApiResponse(200, "Website settings fetched successfully", { settings })
    );
});

const updateWebsiteSettings = asyncHandler(async (req, res) => {
    let settings = await WebsiteSettings.findOne({ isSingleton: true });
    
    if (!settings) {
        settings = new WebsiteSettings({ isSingleton: true });
    }

    const {
        websiteName, websiteDescription, websiteTheme,
        heroSection, maintenanceMode, seoSettings,
        contactDetails, socialLinks, aboutUs, footer
    } = req.body;

    if (websiteName) settings.websiteName = websiteName;
    if (websiteDescription) settings.websiteDescription = websiteDescription;
    if (websiteTheme) settings.websiteTheme = { ...settings.websiteTheme, ...websiteTheme };
    if (heroSection) settings.heroSection = { ...settings.heroSection, ...heroSection };
    if (maintenanceMode !== undefined) settings.maintenanceMode = maintenanceMode;
    if (seoSettings) settings.seoSettings = { ...settings.seoSettings, ...seoSettings };
    if (contactDetails) settings.contactDetails = { ...settings.contactDetails, ...contactDetails };
    if (socialLinks) settings.socialLinks = { ...settings.socialLinks, ...socialLinks };
    if (aboutUs) settings.aboutUs = { ...settings.aboutUs, ...aboutUs };
    if (footer) settings.footer = { ...settings.footer, ...footer };

    await settings.save();

    return res.status(200).json(
        new ApiResponse(200, "Website settings updated successfully", { settings })
    );
});

module.exports = {
    getDashboard,
    getInventoryAlerts,
    getSalesReport,
    getAllUsers,
    blockUser,
    unblockUser,
    getPendingPayments,
    approvePayment,
    rejectPayment,
    getWebsiteSettings,
    updateWebsiteSettings
};
