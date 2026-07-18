const ProductVariant = require("../../models/ProductVariant.model");
const Product = require("../../models/Product.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Create a product variant
// @route   POST /api/v1/variants/create
// @access  Private/Admin
const createVariant = asyncHandler(async (req, res) => {
    const { productId, size, price, discount, quantity, sku, weight, isAvailable } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Invalid Product", { productId: "Product not found" });
    }

    // Process images
    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "Images Missing", { images: "At least 1 image is required for a variant" });
    }

    const imagePaths = req.files.map(file => `/uploads/variants/${file.filename}`);

    const variant = await ProductVariant.create({
        productId,
        size,
        price,
        discount,
        quantity,
        sku,
        weight,
        isAvailable,
        images: imagePaths
    });

    return res.status(201).json(new ApiResponse(201, "Variant created successfully", { variant }));
});

// @desc    Update a variant (Inventory, Price, etc)
// @route   PUT /api/v1/variants/update/:id
// @access  Private/Admin
const updateVariant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let updateData = { ...req.body };

    const variant = await ProductVariant.findById(id);
    if (!variant) {
        throw new ApiError(404, "Variant not found");
    }

    // If new images are uploaded, we replace or append. For this phase, we replace.
    if (req.files && req.files.length > 0) {
        updateData.images = req.files.map(file => `/uploads/variants/${file.filename}`);
    }

    // Update using Document save to trigger pre-save hooks (e.g. isAvailable computation based on quantity)
    Object.assign(variant, updateData);
    await variant.save();

    return res.status(200).json(new ApiResponse(200, "Variant updated successfully", { variant }));
});

// @desc    Delete a variant
// @route   DELETE /api/v1/variants/delete/:id
// @access  Private/Admin
const deleteVariant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const variant = await ProductVariant.findByIdAndDelete(id);
    if (!variant) throw new ApiError(404, "Variant not found");

    return res.status(200).json(new ApiResponse(200, "Variant deleted successfully", {}));
});

// @desc    Get variants by product ID
// @route   GET /api/v1/variants/product/:productId
// @access  Public
const getVariantsByProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const variants = await ProductVariant.find({ productId, isAvailable: true }).sort({ price: 1 });
    
    return res.status(200).json(new ApiResponse(200, "Variants retrieved", { variants }));
});

// @desc    Get variant by ID
// @route   GET /api/v1/variants/:id
// @access  Public
const getVariant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const variant = await ProductVariant.findById(id).populate("productId", "name slug category isActive");
    
    if (!variant) throw new ApiError(404, "Variant not found");
    if (variant.productId && !variant.productId.isActive) {
         throw new ApiError(404, "Product is no longer active");
    }

    return res.status(200).json(new ApiResponse(200, "Variant retrieved", { variant }));
});

module.exports = {
    createVariant,
    updateVariant,
    deleteVariant,
    getVariantsByProduct,
    getVariant
};
