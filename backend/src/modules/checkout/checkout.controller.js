const Cart = require("../../models/Cart.model");
const Order = require("../../models/Order.model");
const Address = require("../../models/Address.model");
const Payment = require("../../models/Payment.model");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const mongoose = require("mongoose");

const getCheckoutSummary = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId })
        .populate({
            path: 'products.productId',
            select: 'name slug category images'
        })
        .populate({
            path: 'products.variantId',
            select: 'size price discount isAvailable images quantity'
        });

    if (!cart || cart.products.length === 0) {
        throw new ApiError(404, "Cart is empty or not found");
    }

    // Double check availability
    for (const item of cart.products) {
        if (!item.variantId || !item.variantId.isAvailable || item.variantId.quantity < item.quantity) {
            throw new ApiError(400, `Product ${item.productId.name} (${item.variantId.size}) is out of stock or requested quantity is unavailable.`);
        }
    }

    return res.status(200).json(
        new ApiResponse(200, "Checkout summary fetched successfully", {
            cart: cart
        })
    );
});

const processCheckout = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { addressId } = req.body;

    if (!addressId) {
        throw new ApiError(400, "Address ID is required");
    }

    // Verify address
    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    // Get cart
    const cart = await Cart.findOne({ userId }).populate('products.productId').populate('products.variantId');
    if (!cart || cart.products.length === 0) {
        throw new ApiError(404, "Cart is empty or not found");
    }

    // Validate cart items
    const orderItems = [];
    for (const item of cart.products) {
        if (!item.variantId || !item.variantId.isAvailable || item.variantId.quantity < item.quantity) {
            throw new ApiError(400, `Product ${item.productId?.name} is out of stock`);
        }
        
        orderItems.push({
            productId: item.productId._id,
            variantId: item.variantId._id,
            productName: item.productId.name,
            variantSize: item.variantId.size,
            quantity: item.quantity,
            priceAtPurchase: item.variantId.price,
            discountAtPurchase: item.variantId.discount || 0,
            imageAtPurchase: item.variantId.images[0] || item.productId.images[0] || "/images/products/placeholder.jpg"
        });
    }

    // Calculate totals based on cart snapshot
    const subtotal = cart.subtotal || cart.totalAmount; // Fallback
    const totalAmount = cart.totalAmount;

    // We must create a mock Payment doc to satisfy Order model requirements for V1
    const dummyCheckoutId = new mongoose.Types.ObjectId();
    const payment = await Payment.create({
        userId: userId,
        checkoutId: dummyCheckoutId,
        paymentMethod: "ONLINE",
        subtotal: subtotal,
        totalAmount: totalAmount,
        paymentStatus: "PAYMENT_PENDING",
        paidAt: null
    });

    // Create Order
    const order = await Order.create({
        userId,
        paymentId: payment._id,
        addressId: address._id,
        products: orderItems,
        subtotal: subtotal,
        discount: cart.discount || 0,
        shippingCharges: 0,
        totalAmount: totalAmount,
        paymentMethod: "ONLINE",
        orderStatus: "PAYMENT_PENDING"
    });

    // Clear the cart
    cart.products = [];
    cart.subtotal = 0;
    cart.totalAmount = 0;
    cart.discount = 0;
    cart.isCheckoutReady = false;
    await cart.save();

    return res.status(201).json(
        new ApiResponse(201, "Order created successfully", { orderId: order._id })
    );
});

module.exports = {
    getCheckoutSummary,
    processCheckout
};
