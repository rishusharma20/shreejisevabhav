const Wishlist = require("../../models/Wishlist.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist/add
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId: req.user._id });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            userId: req.user._id,
            products: [productId]
        });
    } else {
        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }
    }

    return res.status(200).json(new ApiResponse(200, "Added to Divine Wishlist", { wishlist }));
});

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlist/remove
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    const wishlist = await Wishlist.findOne({ userId: req.user._id });

    if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }

    wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId.toString()
    );

    await wishlist.save();

    return res.status(200).json(new ApiResponse(200, "Removed from Divine Wishlist", { wishlist }));
});

// @desc    Get user wishlist
// @route   GET /api/v1/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
    // In future phases, we will populate the 'products' array to get product details
    const wishlist = await Wishlist.findOne({ userId: req.user._id });
    
    return res.status(200).json(new ApiResponse(200, "Wishlist retrieved", { wishlist: wishlist || { products: [] } }));
});

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
};
