const Collection = require("../../models/Collection.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Create a collection
// @route   POST /api/v1/collections/create
// @access  Private/Admin
const createCollection = asyncHandler(async (req, res) => {
    // Expected files: bannerImage, thumbnailImage, featuredImage
    const files = req.files;

    if (!files || !files.bannerImage || !files.thumbnailImage) {
        throw new ApiError(400, "Images Missing", { images: "Banner and Thumbnail images are required" });
    }

    const {
        name, slug, description, shortDescription, festival, 
        category, isFeatured, isTrending, isActive, displayOrder, 
        metaTitle, metaDescription
    } = req.body;

    const existingCollection = await Collection.findOne({ name });
    if (existingCollection) {
        throw new ApiError(400, "Collection Creation Failed", { name: "Collection with this name already exists" });
    }

    const bannerImage = `/uploads/collections/${files.bannerImage[0].filename}`;
    const thumbnailImage = `/uploads/collections/${files.thumbnailImage[0].filename}`;
    let featuredImage = null;

    if (files.featuredImage) {
        featuredImage = `/uploads/collections/${files.featuredImage[0].filename}`;
    }

    const collection = await Collection.create({
        name,
        slug,
        description,
        shortDescription,
        festival,
        category,
        isFeatured,
        isTrending,
        isActive,
        displayOrder,
        metaTitle,
        metaDescription,
        bannerImage,
        thumbnailImage,
        featuredImage,
        createdBy: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, "Collection created successfully", { collection }));
});

// @desc    Get all active collections (Public)
// @route   GET /api/v1/collections
// @access  Public
const getAllCollections = asyncHandler(async (req, res) => {
    // Non-admins only see active collections
    const collections = await Collection.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    
    return res.status(200).json(new ApiResponse(200, "Collections retrieved successfully", { collections }));
});

// @desc    Get a single collection by slug or ID
// @route   GET /api/v1/collections/:identifier
// @access  Public
const getCollection = asyncHandler(async (req, res) => {
    const identifier = req.params.identifier;
    let query = { isActive: true };

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        query._id = identifier;
    } else {
        query.slug = identifier;
    }

    const collection = await Collection.findOne(query);

    if (!collection) {
        throw new ApiError(404, "Collection not found");
    }

    return res.status(200).json(new ApiResponse(200, "Collection retrieved", { collection }));
});

// @desc    Update a collection
// @route   PUT /api/v1/collections/update/:id
// @access  Private/Admin
const updateCollection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let updateData = { ...req.body, updatedBy: req.user._id };

    // Handle new images if uploaded
    if (req.files) {
        if (req.files.bannerImage) {
            updateData.bannerImage = `/uploads/collections/${req.files.bannerImage[0].filename}`;
        }
        if (req.files.thumbnailImage) {
            updateData.thumbnailImage = `/uploads/collections/${req.files.thumbnailImage[0].filename}`;
        }
        if (req.files.featuredImage) {
            updateData.featuredImage = `/uploads/collections/${req.files.featuredImage[0].filename}`;
        }
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedCollection) {
        throw new ApiError(404, "Collection not found");
    }

    return res.status(200).json(new ApiResponse(200, "Collection updated", { collection: updatedCollection }));
});

// @desc    Delete a collection
// @route   DELETE /api/v1/collections/delete/:id
// @access  Private/Admin
const deleteCollection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const collection = await Collection.findByIdAndDelete(id);
    
    if (!collection) {
        throw new ApiError(404, "Collection not found");
    }

    return res.status(200).json(new ApiResponse(200, "Collection deleted successfully", {}));
});

// @desc    Enable collection
// @route   PUT /api/v1/collections/enable/:id
// @access  Private/Admin
const enableCollection = asyncHandler(async (req, res) => {
    const collection = await Collection.findByIdAndUpdate(
        req.params.id, 
        { isActive: true, updatedBy: req.user._id }, 
        { new: true }
    );
    if (!collection) throw new ApiError(404, "Collection not found");
    return res.status(200).json(new ApiResponse(200, "Collection enabled", { collection }));
});

// @desc    Disable collection
// @route   PUT /api/v1/collections/disable/:id
// @access  Private/Admin
const disableCollection = asyncHandler(async (req, res) => {
    const collection = await Collection.findByIdAndUpdate(
        req.params.id, 
        { isActive: false, updatedBy: req.user._id }, 
        { new: true }
    );
    if (!collection) throw new ApiError(404, "Collection not found");
    return res.status(200).json(new ApiResponse(200, "Collection disabled", { collection }));
});

// @desc    Get featured collections
// @route   GET /api/v1/collections/type/featured
// @access  Public
const getFeaturedCollections = asyncHandler(async (req, res) => {
    const collections = await Collection.find({ isActive: true, isFeatured: true }).sort({ displayOrder: 1 });
    return res.status(200).json(new ApiResponse(200, "Featured collections", { collections }));
});

// @desc    Get trending collections
// @route   GET /api/v1/collections/type/trending
// @access  Public
const getTrendingCollections = asyncHandler(async (req, res) => {
    const collections = await Collection.find({ isActive: true, isTrending: true }).sort({ displayOrder: 1 });
    return res.status(200).json(new ApiResponse(200, "Trending collections", { collections }));
});

// @desc    Get festival collections
// @route   GET /api/v1/collections/type/festival
// @access  Public
const getFestivalCollections = asyncHandler(async (req, res) => {
    const collections = await Collection.find({ isActive: true, festival: { $exists: true, $ne: "" } }).sort({ displayOrder: 1 });
    return res.status(200).json(new ApiResponse(200, "Festival collections", { collections }));
});

// @desc    Get collection analytics
// @route   GET /api/v1/collections/admin/analytics
// @access  Private/Admin
const getCollectionAnalytics = asyncHandler(async (req, res) => {
    const total = await Collection.countDocuments();
    const active = await Collection.countDocuments({ isActive: true });
    const featured = await Collection.countDocuments({ isFeatured: true });
    const trending = await Collection.countDocuments({ isTrending: true });
    const disabled = await Collection.countDocuments({ isActive: false });

    return res.status(200).json(new ApiResponse(200, "Collection Analytics", {
        analytics: { total, active, featured, trending, disabled }
    }));
});

module.exports = {
    createCollection,
    getAllCollections,
    getCollection,
    updateCollection,
    deleteCollection,
    enableCollection,
    disableCollection,
    getFeaturedCollections,
    getTrendingCollections,
    getFestivalCollections,
    getCollectionAnalytics
};
