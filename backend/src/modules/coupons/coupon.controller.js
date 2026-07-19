const { calculateBestSavings } = require("./offerPriorityEngine.service");
const { createCoupon, getCoupons } = require("./coupon.service");
const { createOffer, getOffers } = require("./offer.service");
const { getBlessingAnalytics } = require("./analytics.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// ============================================
// USER ENDPOINTS
// ============================================

// @desc    Calculate Best Savings (Priority Engine)
// @route   POST /api/v1/blessings/calculate
// @access  Private
const calculateCartSavings = asyncHandler(async (req, res) => {
    const { cartTotal, couponCode } = req.body;
    const userId = req.user._id;

    if (cartTotal <= 0) {
        throw new ApiError(400, "Cart total must be greater than 0");
    }

    const savingsResult = await calculateBestSavings(userId, cartTotal, couponCode);

    return res.status(200).json(new ApiResponse(200, "Divine Savings Calculated", savingsResult));
});

// @desc    Get Available Offers (For Banners)
// @route   GET /api/v1/blessings/offers
// @access  Public
const getAvailableOffers = asyncHandler(async (req, res) => {
    const offers = await getOffers();
    return res.status(200).json(new ApiResponse(200, "Available Divine Offerings", { offers }));
});

// ============================================
// ADMIN ENDPOINTS
// ============================================

// @desc    Admin: Create Coupon
// @route   POST /api/v1/blessings/admin/coupons
// @access  Private/Admin
const adminCreateCoupon = asyncHandler(async (req, res) => {
    const coupon = await createCoupon(req.body, req.user._id);
    return res.status(201).json(new ApiResponse(201, "Coupon created successfully", { coupon }));
});

// @desc    Admin: Create Automatic Offer
// @route   POST /api/v1/blessings/admin/offers
// @access  Private/Admin
const adminCreateOffer = asyncHandler(async (req, res) => {
    const offer = await createOffer(req.body);
    return res.status(201).json(new ApiResponse(201, "Offer created successfully", { offer }));
});

// @desc    Admin: Get Analytics
// @route   GET /api/v1/blessings/admin/analytics
// @access  Private/Admin
const adminGetAnalytics = asyncHandler(async (req, res) => {
    const analytics = await getBlessingAnalytics();
    return res.status(200).json(new ApiResponse(200, "Blessing Analytics", { analytics }));
});

module.exports = {
    calculateCartSavings,
    getAvailableOffers,
    adminCreateCoupon,
    adminCreateOffer,
    adminGetAnalytics
};
