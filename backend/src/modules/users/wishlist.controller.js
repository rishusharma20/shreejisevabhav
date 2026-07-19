const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Add product to wishlist (Disabled in V1 MVP)
const addToWishlist = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, "Wishlist feature disabled for V1", { wishlist: { products: [] } }));
});

// @desc    Remove product from wishlist (Disabled in V1 MVP)
const removeFromWishlist = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, "Wishlist feature disabled for V1", { wishlist: { products: [] } }));
});

// @desc    Get user wishlist (Disabled in V1 MVP)
const getWishlist = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, "Wishlist feature disabled for V1", { wishlist: { products: [] } }));
});

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
};
