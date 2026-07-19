const Order = require("../../models/Order.model");
const TrackMySeva = require("../../models/TrackMySeva.model");
const { generateInvoiceData } = require("./invoice.service");
const { getOrderAnalytics } = require("./analytics.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const CheckoutSession = require("../../models/CheckoutSession.model");
const Payment = require("../../models/Payment.model");
const Cart = require("../../models/Cart.model");

// ============================================
// USER ENDPOINTS
// ============================================

// @desc    Create Manual Order (UPI UTR)
// @route   POST /api/v1/orders/create-manual
// @access  Private
const createManualOrder = asyncHandler(async (req, res) => {
    const { utrNumber } = req.body;
    const userId = req.user._id;

    if (!utrNumber || utrNumber.trim().length < 6) {
        throw new ApiError(400, "Valid UTR Number is required for manual verification");
    }

    // 1. Get active checkout session
    const session = await CheckoutSession.findOne({ userId, status: "PENDING" });
    if (!session) {
        throw new ApiError(400, "No active checkout session found");
    }

    if (!session.addressId) {
        throw new ApiError(400, "Delivery Address is missing in checkout session");
    }

    if (new Date() > session.expiresAt) {
        session.status = "EXPIRED";
        await session.save();
        throw new ApiError(400, "Checkout session expired. Please return to cart.");
    }

    // 2. Create Payment Record
    const payment = await Payment.create({
        userId,
        checkoutId: session._id,
        utrNumber,
        paymentMethod: "ONLINE",
        subtotal: session.subtotal,
        discount: session.totalDiscount,
        shippingCharges: session.shippingCharges,
        totalAmount: session.totalAmount,
        paymentStatus: "VERIFICATION_PENDING"
    });

    // 3. Create Order
    const orderItems = session.products.map(p => ({
        productId: p.productId,
        variantId: p.variantId,
        productName: "Divine Product", // Idealy we'd fetch actual name, but assuming snapshot relies on this
        variantSize: "Standard",
        quantity: p.quantity,
        priceAtPurchase: 0, // Fallback, real implementation would map from cart
        imageAtPurchase: "/images/products/placeholder.jpg"
    }));

    // Re-fetch cart for exact product details snapshot
    const cart = await Cart.findById(session.cartId).populate("products.productId").populate("products.variantId");
    
    const snapshotItems = cart.products.map(item => ({
        productId: item.productId._id,
        variantId: item.variantId._id,
        productName: item.productId.name,
        variantSize: item.variantId.size || "Standard",
        quantity: item.quantity,
        priceAtPurchase: item.variantId.price,
        discountAtPurchase: item.variantId.discount || 0,
        imageAtPurchase: item.variantId.images[0] || "/images/products/placeholder.jpg"
    }));

    const order = await Order.create({
        userId,
        paymentId: payment._id,
        addressId: session.addressId,
        products: snapshotItems,
        subtotal: session.subtotal,
        discount: session.totalDiscount,
        couponDiscount: session.couponDiscount,
        shippingCharges: session.shippingCharges,
        totalAmount: session.totalAmount,
        paymentMethod: "ONLINE",
        orderStatus: "VERIFICATION_PENDING"
    });

    // 4. Update session status
    session.status = "COMPLETED";
    await session.save();

    // 5. Clear Cart
    await Cart.findByIdAndDelete(session.cartId);

    // 6. Create initial TrackMySeva entry
    const trackEntry = await TrackMySeva.create({
        orderId: order._id,
        userId,
        currentStatus: "PENDING",
        timeline: [{
            status: "PENDING",
            title: "SEVA RECEIVED (PENDING VERIFICATION)",
            description: "Your Divine Offering is pending manual payment verification. We are checking the UTR number."
        }]
    });

    order.trackMySevaId = trackEntry._id;
    await order.save();

    return res.status(201).json(new ApiResponse(201, "Order submitted for verification", { order, payment }));
});

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
        .populate("paymentId")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, "All Orders", { orders }));
});

// @desc    Update Order Status
// @route   PUT /api/v1/orders/admin/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id).populate("paymentId");
    if (!order) throw new ApiError(404, "Order not found");

    order.orderStatus = status;
    if (status === "DELIVERED" || status === "COMPLETED") {
        order.isDelivered = true;
    }
    
    // Auto-approve payment if admin moves order from VERIFICATION_PENDING to ACCEPTED (or beyond)
    if (order.paymentId && order.paymentId.paymentStatus === "VERIFICATION_PENDING") {
        if (status !== "CANCELLED" && status !== "VERIFICATION_PENDING") {
            order.paymentId.paymentStatus = "SUCCESS";
            order.paymentId.paidAt = new Date();
            await order.paymentId.save();
            
            // Also add a TrackMySeva timeline entry if applicable
            if (order.trackMySevaId) {
                await TrackMySeva.findByIdAndUpdate(order.trackMySevaId, {
                    currentStatus: "ACCEPTED",
                    $push: {
                        timeline: {
                            status: "ACCEPTED",
                            title: "SEVA VERIFIED & ACCEPTED",
                            description: "Your UTR payment has been manually verified and your offering is accepted."
                        }
                    }
                });
            }
        }
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
    createManualOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    downloadInvoice,
    getAllOrders,
    updateOrderStatus,
    getAdminAnalytics
};
