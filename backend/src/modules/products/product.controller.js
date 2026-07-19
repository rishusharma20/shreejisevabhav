const Product = require("../../models/Product.model");
const Collection = require("../../models/Collection.model");
const ProductVariant = require("../../models/ProductVariant.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Create a product
// @route   POST /api/v1/products/create
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name, slug, shortDescription, description, collectionId,
        festivalId, category, isFeatured, isTrending, isActive,
        displayOrder, tags,
        price, quantity, size
    } = req.body;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
        throw new ApiError(404, "Invalid Collection", { collectionId: "Collection not found" });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        throw new ApiError(400, "Product Creation Failed", { name: "Product with this name already exists" });
    }

    const product = await Product.create({
        name,
        slug,
        shortDescription,
        description,
        collectionId,
        festivalId,
        category,
        isFeatured,
        isTrending,
        isActive,
        displayOrder,
        tags,
        createdBy: req.user._id
    });

    let images = [];
    if (req.files && req.files.length > 0) {
        images = req.files.map((file) => `/uploads/variants/${file.filename}`);
    }

    const variant = await ProductVariant.create({
        productId: product._id,
        size,
        price,
        quantity,
        images
    });

    return res.status(201).json(new ApiResponse(201, "Product created successfully", { product, variant }));
});

// @desc    Create a product variant
// @route   POST /api/v1/products/:id/variants
// @access  Private/Admin
const createVariant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { size, price, quantity, discount, sku, weight } = req.body;

    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let images = [];
    if (req.files && req.files.length > 0) {
        images = req.files.map((file) => `/uploads/variants/${file.filename}`);
    }

    const variant = await ProductVariant.create({
        productId: product._id,
        size,
        price,
        quantity,
        discount,
        sku,
        weight,
        images
    });

    return res.status(201).json(new ApiResponse(201, "Variant created successfully", { variant }));
});

// @desc    Get all active products
// @route   GET /api/v1/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ isActive: true })
        .populate("collectionId", "name slug")
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();

    // Attach the first available variant to each product for thumbnail/price
    const productIds = products.map(p => p._id);
    const variants = await ProductVariant.find({ productId: { $in: productIds } }).lean();
    
    const productsWithVariants = products.map(product => {
        const productVariants = variants.filter(v => v.productId.toString() === product._id.toString());
        const defaultVariant = productVariants[0] || {};
        return {
            ...product,
            variantId: defaultVariant._id,
            price: defaultVariant.price || 0,
            originalPrice: (defaultVariant.price || 0) + (defaultVariant.discount || 0),
            images: defaultVariant.images || ["/images/products/placeholder.jpg"]
        };
    });

    return res.status(200).json(new ApiResponse(200, "Products retrieved successfully", { products: productsWithVariants }));
});

// @desc    Get product by id or slug
// @route   GET /api/v1/products/:identifier
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
    const identifier = req.params.identifier;
    let query = { isActive: true };

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        query._id = identifier;
    } else {
        query.slug = identifier;
    }

    const product = await Product.findOne(query).populate("collectionId", "name slug");
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Fetch variants as well so the product page has full details
    const variants = await ProductVariant.find({ productId: product._id, isAvailable: true }).sort({ price: 1 });

    return res.status(200).json(new ApiResponse(200, "Product retrieved", { product, variants }));
});

// @desc    Update a product
// @route   PUT /api/v1/products/update/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let updateData = { ...req.body, updatedBy: req.user._id };

    if (req.body.collectionId) {
        const collection = await Collection.findById(req.body.collectionId);
        if (!collection) throw new ApiError(404, "Invalid Collection");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedProduct) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(new ApiResponse(200, "Product updated", { product: updatedProduct }));
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/delete/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new ApiError(404, "Product not found");

    // CASCADE DELETE: Delete all variants associated with this product
    await ProductVariant.deleteMany({ productId: id });

    return res.status(200).json(new ApiResponse(200, "Product and its variants deleted successfully", {}));
});

// @desc    Get featured products
// @route   GET /api/v1/products/type/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ isActive: true, isFeatured: true }).sort({ displayOrder: 1 }).lean();
    
    const productIds = products.map(p => p._id);
    const variants = await ProductVariant.find({ productId: { $in: productIds } }).lean();
    
    const productsWithVariants = products.map(product => {
        const productVariants = variants.filter(v => v.productId.toString() === product._id.toString());
        const defaultVariant = productVariants[0] || {};
        return {
            ...product,
            variantId: defaultVariant._id,
            price: defaultVariant.price || 0,
            originalPrice: (defaultVariant.price || 0) + (defaultVariant.discount || 0),
            images: defaultVariant.images || ["/images/products/placeholder.jpg"]
        };
    });

    return res.status(200).json(new ApiResponse(200, "Featured products", { products: productsWithVariants }));
});

// @desc    Get trending products
// @route   GET /api/v1/products/type/trending
// @access  Public
const getTrendingProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ isActive: true, isTrending: true }).sort({ displayOrder: 1 });
    return res.status(200).json(new ApiResponse(200, "Trending products", { products }));
});

// @desc    Get products by collection
// @route   GET /api/v1/products/collection/:id
// @access  Public
const getProductsByCollection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const products = await Product.find({ collectionId: id, isActive: true }).sort({ displayOrder: 1 });
    return res.status(200).json(new ApiResponse(200, "Collection products", { products }));
});

module.exports = {
    createProduct,
    createVariant,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getTrendingProducts,
    getProductsByCollection
};
