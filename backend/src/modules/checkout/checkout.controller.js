const CheckoutSession = require("../../models/CheckoutSession.model");
const Cart = require("../../models/Cart.model");
const Address = require("../../models/Address.model");
const { verifyCartIntegrity } = require("./checkout.service");
const { recalculateCart } = require("../cart/priceCalculation.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// Helper: Ensure cart is strictly recalculated before generating a session
const fetchAndRecalculateCart = async (userId) => {
    let cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
        throw new ApiError(400, "Your Divine Journey is empty");
    }
    cart = await recalculateCart(cart);
    await cart.save();
    return cart;
};

// @desc    Create Checkout Session
// @route   POST /api/v1/checkout/create
// @access  Private
const createCheckoutSession = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const cart = await fetchAndRecalculateCart(userId);

    // Deep Verification Engine
    await verifyCartIntegrity(cart);

    // If an active session exists, we can expire it or overwrite it. Let's overwrite.
    let session = await CheckoutSession.findOne({ userId, status: "PENDING" });
    
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30); // 30 mins validity

    const sessionData = {
        userId,
        cartId: cart._id,
        products: cart.products, // Immutable snapshot
        subtotal: cart.subtotal,
        totalDiscount: cart.totalDiscount,
        couponCode: cart.couponCode,
        couponDiscount: cart.couponDiscount,
        shippingCharges: cart.shippingCharges,
        totalAmount: cart.totalAmount,
        expiresAt: expiryTime
    };

    if (session) {
        Object.assign(session, sessionData);
        await session.save();
    } else {
        session = await CheckoutSession.create(sessionData);
    }

    return res.status(201).json(new ApiResponse(201, "Checkout Session Prepared", { session }));
});

// @desc    Get Current Checkout Session
// @route   GET /api/v1/checkout
// @access  Private
const getCheckoutSession = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const session = await CheckoutSession.findOne({ userId, status: "PENDING" })
        .populate("addressId")
        .populate("products.productId", "name category")
        .populate("products.variantId", "size images");

    if (!session) {
        throw new ApiError(404, "No active checkout session found");
    }

    if (new Date() > session.expiresAt) {
        session.status = "EXPIRED";
        await session.save();
        throw new ApiError(400, "Checkout session expired. Please return to cart.");
    }

    return res.status(200).json(new ApiResponse(200, "Active Checkout Session", { session }));
});

// @desc    Set Address for Checkout
// @route   PUT /api/v1/checkout/address
// @access  Private
const setAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.body;
    const userId = req.user._id;

    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
        throw new ApiError(404, "Address not found or does not belong to user");
    }

    const session = await CheckoutSession.findOne({ userId, status: "PENDING" });
    if (!session) throw new ApiError(404, "No active checkout session found");
    if (new Date() > session.expiresAt) throw new ApiError(400, "Checkout session expired");

    session.addressId = addressId;
    await session.save();

    return res.status(200).json(new ApiResponse(200, "Address attached to session", { session }));
});

// @desc    Set Payment Method
// @route   PUT /api/v1/checkout/payment-method
// @access  Private
const setPaymentMethod = asyncHandler(async (req, res) => {
    const { paymentMethod } = req.body;
    const userId = req.user._id;

    const session = await CheckoutSession.findOne({ userId, status: "PENDING" });
    if (!session) throw new ApiError(404, "No active checkout session found");
    if (new Date() > session.expiresAt) throw new ApiError(400, "Checkout session expired");
    
    if (!session.addressId) {
        throw new ApiError(400, "Please select an address before choosing a payment method");
    }

    session.paymentMethod = paymentMethod;
    await session.save();

    return res.status(200).json(new ApiResponse(200, "Payment method secured", { session }));
});

// @desc    Cancel Checkout Session
// @route   DELETE /api/v1/checkout/cancel
// @access  Private
const cancelCheckoutSession = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const session = await CheckoutSession.findOne({ userId, status: "PENDING" });
    if (!session) throw new ApiError(404, "No active checkout session found");

    session.status = "FAILED"; // or just delete it
    await session.save();

    return res.status(200).json(new ApiResponse(200, "Checkout session cancelled", {}));
});

// @desc    Get Order Summary (Readiness Check)
// @route   GET /api/v1/checkout/order-summary
// @access  Private
const getOrderSummary = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const session = await CheckoutSession.findOne({ userId, status: "PENDING" }).populate("addressId");
    
    if (!session) throw new ApiError(404, "No active checkout session found");
    if (new Date() > session.expiresAt) throw new ApiError(400, "Checkout session expired");

    const isReadyForPayment = !!session.addressId && !!session.paymentMethod;

    const summary = {
        subtotal: session.subtotal,
        totalDiscount: session.totalDiscount,
        couponCode: session.couponCode,
        couponDiscount: session.couponDiscount,
        shippingCharges: session.shippingCharges,
        totalAmount: session.totalAmount,
        paymentMethod: session.paymentMethod,
        address: session.addressId,
        isReadyForPayment,
        expiresAt: session.expiresAt
    };

    return res.status(200).json(new ApiResponse(200, "Order Summary", { summary }));
});

module.exports = {
    createCheckoutSession,
    getCheckoutSession,
    setAddress,
    setPaymentMethod,
    cancelCheckoutSession,
    getOrderSummary
};
