const Coupon = require("../../models/Coupon.model");
const Cart = require("../../models/Cart.model");
const { recalculateCart } = require("./priceCalculation.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Create a Coupon
// @route   POST /api/v1/coupons/create
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
    const { code, discountType, discountValue, minOrderAmount, maxDiscount, validFrom, validUntil, usageLimit } = req.body;

    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
        throw new ApiError(400, "Coupon code already exists");
    }

    const coupon = await Coupon.create({
        code: code.toUpperCase(),
        discountType,
        discountValue,
        minOrderAmount,
        maxDiscount,
        validFrom,
        validUntil,
        usageLimit
    });

    return res.status(201).json(new ApiResponse(201, "Coupon created successfully", { coupon }));
});

// @desc    Apply Coupon to Cart
// @route   POST /api/v1/cart/apply-coupon
// @access  Private
const applyCoupon = asyncHandler(async (req, res) => {
    const { code } = req.body;
    const userId = req.user._id;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) {
        throw new ApiError(404, "Invalid Coupon Code");
    }

    if (!coupon.isValid()) {
        throw new ApiError(400, "This coupon is expired or has reached its usage limit");
    }

    let cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
        throw new ApiError(400, "Your Divine Journey is empty");
    }

    // Apply coupon and recalculate
    cart.couponCode = coupon.code;
    cart = await recalculateCart(cart);

    if (cart.couponDiscount === 0) {
        // Meaning the order amount was less than minOrderAmount or something else blocked it
        cart.couponCode = null; // revert
        await cart.save();
        throw new ApiError(400, "Coupon not applicable. Check minimum order amount.", { minOrderAmount: coupon.minOrderAmount });
    }

    await cart.save();

    return res.status(200).json(new ApiResponse(200, "Coupon applied successfully", { cart }));
});

// @desc    Remove Coupon from Cart
// @route   DELETE /api/v1/cart/remove-coupon
// @access  Private
const removeCoupon = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.couponCode = null;
    cart = await recalculateCart(cart);
    await cart.save();

    return res.status(200).json(new ApiResponse(200, "Coupon removed successfully", { cart }));
});

module.exports = {
    createCoupon,
    applyCoupon,
    removeCoupon
};
