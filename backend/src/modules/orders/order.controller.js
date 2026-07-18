const Order = require("../../models/Order.model");
const TrackMySeva = require("../../models/TrackMySeva.model");
const { generateInvoiceData } = require("./invoice.service");
const { getOrderAnalytics } = require("./analytics.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// ============================================
// USER ENDPOINTS
// ============================================

// @desc    Get logged-in user's orders
// @route   GET /api/v1/orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
        .populate("trackMySevaId", "currentStatus isDelivered")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, "Your Divine Orders", { orders }));
});

// @desc    Get order details by ID
// @route   GET /api/v1/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: id, userId })
        .populate("addressId")
        .populate("trackMySevaId");

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    return res.status(200).json(new ApiResponse(200, "Order details", { order }));
});

// @desc    Cancel an Order (Only if not yet shipped)
// @route   POST /api/v1/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: id, userId });
    if (!order) throw new ApiError(404, "Order not found");

    const nonCancellableStatuses = ["SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED", "CANCELLED", "RETURNED", "REFUNDED"];
    if (nonCancellableStatuses.includes(order.orderStatus)) {
        throw new ApiError(400, `Cannot cancel order at stage: ${order.orderStatus}`);
    }

    order.orderStatus = "CANCELLED";
    await order.save();

    // Propagate cancellation to Track My Seva
    if (order.trackMySevaId) {
        await TrackMySeva.findByIdAndUpdate(order.trackMySevaId, {
            currentStatus: "COMPLETED", // Assuming cancellation ends the track journey
            $push: {
                timeline: {
                    status: "CANCELLED",
                    title: "ORDER CANCELLED",
                    description: "Your order has been cancelled successfully."
                }
            }
        });
    }

    return res.status(200).json(new ApiResponse(200, "Order cancelled successfully", { order }));
});

// @desc    Download JSON Invoice Data
// @route   GET /api/v1/orders/:id/invoice
// @access  Private
const downloadInvoice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const invoiceData = await generateInvoiceData(id, userId);
    
    if (!invoiceData) {
        throw new ApiError(404, "Invoice not found");
    }

    return res.status(200).json(new ApiResponse(200, "Invoice Data generated", { invoice: invoiceData }));
});


// ============================================
// ADMIN ENDPOINTS
// ============================================

// @desc    Get all platform orders
// @route   GET /api/v1/orders/admin/all
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, "All Orders", { orders }));
});

// @desc    Update Order Status
// @route   PUT /api/v1/orders/admin/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) throw new ApiError(404, "Order not found");

    order.orderStatus = status;
    if (status === "DELIVERED" || status === "COMPLETED") {
        order.isDelivered = true;
    }
    
    await order.save();

    return res.status(200).json(new ApiResponse(200, "Order status updated", { order }));
});

// @desc    Get Order Analytics
// @route   GET /api/v1/orders/admin/analytics
// @access  Private/Admin
const getAdminAnalytics = asyncHandler(async (req, res) => {
    const analytics = await getOrderAnalytics();
    return res.status(200).json(new ApiResponse(200, "Order Analytics", { analytics }));
});

module.exports = {
    getMyOrders,
    getOrderById,
    cancelOrder,
    downloadInvoice,
    getAllOrders,
    updateOrderStatus,
    getAdminAnalytics
};
