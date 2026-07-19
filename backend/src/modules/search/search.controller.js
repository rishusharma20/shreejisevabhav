const Product = require("../../models/Product.model");
const Collection = require("../../models/Collection.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// Helper function to log searches (disabled for V1 MVP)
const logSearch = async (req, query, totalResults) => {
    // No-op for V1 15-collection limit
};

// @desc    Global Search (Products & Collections)
// @route   GET /api/v1/search?q=keyword
// @access  Public
const globalSearch = asyncHandler(async (req, res) => {
    const { q } = req.query;

    const products = await Product.find(
        { $text: { $search: q }, isActive: true },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } }).limit(10);

    const collections = await Collection.find(
        { $text: { $search: q }, isActive: true },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } }).limit(5);

    const totalResults = products.length + collections.length;
    
    // Log the search
    if (q.length > 2) {
        await logSearch(req, q, totalResults);
    }

    return res.status(200).json(new ApiResponse(200, "Search results", {
        products,
        collections,
        totalResults
    }));
});

// @desc    Search Products Only
// @route   GET /api/v1/search/products?q=keyword
// @access  Public
const searchProducts = asyncHandler(async (req, res) => {
    const { q } = req.query;
    const products = await Product.find(
        { $text: { $search: q }, isActive: true },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    await logSearch(req, q, products.length);

    return res.status(200).json(new ApiResponse(200, "Product search results", { products }));
});

// @desc    Search Collections Only
// @route   GET /api/v1/search/collections?q=keyword
// @access  Public
const searchCollections = asyncHandler(async (req, res) => {
    const { q } = req.query;
    const collections = await Collection.find(
        { $text: { $search: q }, isActive: true },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    await logSearch(req, q, collections.length);

    return res.status(200).json(new ApiResponse(200, "Collection search results", { collections }));
});

// @desc    Get Related Products
// @route   GET /api/v1/search/related-products?productId=id
// @access  Public
const getRelatedProducts = asyncHandler(async (req, res) => {
    const { productId } = req.query;
    
    if (!productId) {
        throw new ApiError(400, "productId is required");
    }

    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");

    // Find products in the same category or collection, excluding the current product
    const related = await Product.find({
        $or: [
            { category: product.category },
            { collectionId: product.collectionId }
        ],
        _id: { $ne: product._id },
        isActive: true
    }).limit(10);

    return res.status(200).json(new ApiResponse(200, "Related products", { products: related }));
});

// @desc    Get Admin Search Analytics
// @route   GET /api/v1/search/admin/analytics
// @access  Private/Admin
const getAdminAnalytics = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, "Search Analytics", {
        trendingSearches: [],
        zeroResultSearches: []
    }));
});

module.exports = {
    globalSearch,
    searchProducts,
    searchCollections,
    getRelatedProducts,
    getAdminAnalytics
};
