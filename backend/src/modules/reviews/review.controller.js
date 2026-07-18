const Review = require("../../models/Review.model");
const { verifyPurchaseEligibility } = require("./review.service");
const { recalculateProductRating } = require("./rating.service");
const { getReviewAnalytics } = require("./analytics.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// ============================================
// USER ENDPOINTS
// ============================================

// @desc    Create a Divine Experience (Review)
// @route   POST /api/v1/reviews/create
// @access  Private (Verified Purchasers Only)
const createReview = asyncHandler(async (req, res) => {
    const { productId, rating, title, description, collectionId } = req.body;
    const userId = req.user._id;

    // 1. Enforce Verified Purchase Rule
    const eligibility = await verifyPurchaseEligibility(userId, productId);
    if (!eligibility.isEligible) {
        throw new ApiError(403, eligibility.message);
    }

    // 2. Prevent Duplicate Reviews
    const existingReview = await Review.findOne({ userId, productId, orderId: eligibility.orderId });
    if (existingReview) {
        throw new ApiError(400, "You have already shared your Divine Experience for this offering.");
    }

    // 3. Handle Media Uploads (assuming multer processed them)
    const images = [];
    const videos = [];
    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            if (file.mimetype.startsWith("image/")) {
                images.push(file.filename);
            } else if (file.mimetype.startsWith("video/")) {
                videos.push(file.filename);
            }
        });
    }

    // 4. Create Review
    const review = await Review.create({
        userId,
        productId,
        collectionId,
        orderId: eligibility.orderId,
        rating,
        title,
        description,
        images,
        videos,
        isVerifiedPurchase: true,
        isApproved: true // MVP Auto-approval
    });

    // 5. Recalculate Ratings
    await recalculateProductRating(productId);

    return res.status(201).json(new ApiResponse(201, "Thank you for sharing your Divine Experience", { review }));
});

// @desc    Mark Review as Helpful
// @route   POST /api/v1/reviews/:id/helpful
// @access  Private
const markHelpful = asyncHandler(async (req, res) => {
    const review = await Review.findByIdAndUpdate(
        req.params.id,
        { $inc: { helpfulCount: 1 } },
        { new: true }
    );
    if (!review) throw new ApiError(404, "Review not found");

    return res.status(200).json(new ApiResponse(200, "Marked as helpful", { helpfulCount: review.helpfulCount }));
});

// @desc    Delete own review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!review) throw new ApiError(404, "Review not found or not authorized");

    await recalculateProductRating(review.productId);
    return res.status(200).json(new ApiResponse(200, "Review deleted successfully"));
});

// ============================================
// PUBLIC ENDPOINTS
// ============================================

// @desc    Get Product Reviews
// @route   GET /api/v1/reviews/product/:id
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ productId: req.params.id, isApproved: true })
        .populate("userId", "name profileImage")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, "Product Reviews", { reviews }));
});

// @desc    Get Featured Experiences
// @route   GET /api/v1/reviews/featured
// @access  Public
const getFeaturedReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ isFeatured: true, isApproved: true })
        .populate("userId", "name profileImage")
        .populate("productId", "name")
        .sort({ helpfulCount: -1 })
        .limit(10);

    return res.status(200).json(new ApiResponse(200, "Featured Divine Experiences", { reviews }));
});

// ============================================
// ADMIN ENDPOINTS
// ============================================

// @desc    Admin: Delete any review
// @route   DELETE /api/v1/reviews/admin/:id
// @access  Private/Admin
const adminDeleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) throw new ApiError(404, "Review not found");

    await recalculateProductRating(review.productId);
    return res.status(200).json(new ApiResponse(200, "Review deleted by Admin"));
});

// @desc    Admin: Feature a review
// @route   PUT /api/v1/reviews/admin/:id/feature
// @access  Private/Admin
const adminFeatureReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) throw new ApiError(404, "Review not found");

    review.isFeatured = !review.isFeatured;
    await review.save();

    return res.status(200).json(new ApiResponse(200, `Review ${review.isFeatured ? 'featured' : 'un-featured'}`));
});

// @desc    Admin: Get Review Analytics
// @route   GET /api/v1/reviews/admin/analytics
// @access  Private/Admin
const adminGetAnalytics = asyncHandler(async (req, res) => {
    const analytics = await getReviewAnalytics();
    return res.status(200).json(new ApiResponse(200, "Review Analytics", { analytics }));
});

module.exports = {
    createReview,
    markHelpful,
    deleteReview,
    getProductReviews,
    getFeaturedReviews,
    adminDeleteReview,
    adminFeatureReview,
    adminGetAnalytics
};
