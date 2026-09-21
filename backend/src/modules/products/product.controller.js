const Product = require("../../models/Product.model");
const Collection = require("../../models/Collection.model");
const ProductVariant = require("../../models/ProductVariant.model");
const gridfsService = require("../../services/gridfs.service");
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
        for (const file of req.files) {
            const fileId = await gridfsService.uploadFromBuffer(
                file.buffer,
                file.originalname,
                file.mimetype,
                { productId: product._id }
            );
            images.push(`/api/v1/images/${fileId}`);
        }
    }

    try {
        const variant = await ProductVariant.create({
            productId: product._id,
            size,
            price,
            quantity,
            images
        });

        return res.status(201).json(new ApiResponse(201, "Product created successfully", { product, variant }));
    } catch (error) {
        // Rollback uploaded files and product if variant creation fails
        for (const imgUrl of images) {
            await gridfsService.deleteFile(imgUrl);
        }
        await Product.findByIdAndDelete(product._id);
        throw error;
    }
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
        for (const file of req.files) {
            const fileId = await gridfsService.uploadFromBuffer(
                file.buffer,
                file.originalname,
                file.mimetype,
                { productId: product._id }
            );
            images.push(`/api/v1/images/${fileId}`);
        }
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

// Helper to attach default variant info (price, images, variantId) to products
const attachVariantsToProducts = async (products) => {
    if (!products || products.length === 0) return [];
    
    const plainProducts = products.map(p => (typeof p.toObject === "function" ? p.toObject() : p));
    const productIds = plainProducts.map(p => p._id);
    const variants = await ProductVariant.find({ productId: { $in: productIds } }).lean();

    return plainProducts.map(product => {
        const productVariants = variants.filter(v => v.productId.toString() === product._id.toString());
        const defaultVariant = productVariants[0] || {};
        return {
            ...product,
            variantId: defaultVariant._id,
            price: defaultVariant.price || 0,
            originalPrice: (defaultVariant.price || 0) + (defaultVariant.discount || 0),
            images: (defaultVariant.images && defaultVariant.images.length > 0) ? defaultVariant.images : ["/images/products/placeholder.svg"]
        };
    });
};

// @desc    Get all active products
// @route   GET /api/v1/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ isActive: true })
        .populate("collectionId", "name slug")
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();

    const productsWithVariants = await attachVariantsToProducts(products);

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
    const { price, quantity, size, ...productFields } = req.body;

    const updateData = { ...productFields, updatedBy: req.user._id };

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

    const variantUpdate = {};
    if (price !== undefined && price !== "") variantUpdate.price = Number(price);
    if (quantity !== undefined && quantity !== "") variantUpdate.quantity = Number(quantity);
    if (size !== undefined && size !== "") variantUpdate.size = size;

    if (req.files && req.files.length > 0) {
        const newImages = [];
        for (const file of req.files) {
            const fileId = await gridfsService.uploadFromBuffer(
                file.buffer,
                file.originalname,
                file.mimetype,
                { productId: id }
            );
            newImages.push(`/api/v1/images/${fileId}`);
        }
        variantUpdate.images = newImages;
    }

    let variant = null;
    if (Object.keys(variantUpdate).length > 0) {
        variant = await ProductVariant.findOne({ productId: id });
        if (variant) {
            Object.assign(variant, variantUpdate);
            await variant.save();
        }
    }

    return res.status(200).json(new ApiResponse(200, "Product updated", { product: updatedProduct, variant }));
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/delete/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new ApiError(404, "Product not found");

    // CASCADE DELETE: Clean up GridFS images associated with this product's variants
    const variants = await ProductVariant.find({ productId: id });
    for (const v of variants) {
        if (v.images && Array.isArray(v.images)) {
            for (const imgPath of v.images) {
                if (imgPath && (imgPath.includes("/api/v1/images/") || imgPath.includes("/api/images/"))) {
                    await gridfsService.deleteFile(imgPath);
                }
            }
        }
    }

    await ProductVariant.deleteMany({ productId: id });

    return res.status(200).json(new ApiResponse(200, "Product and its variants deleted successfully", {}));
});

// @desc    Get featured products
// @route   GET /api/v1/products/type/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ isActive: true, isFeatured: true }).sort({ displayOrder: 1 }).lean();
    const productsWithVariants = await attachVariantsToProducts(products);

    return res.status(200).json(new ApiResponse(200, "Featured products", { products: productsWithVariants }));
});

// @desc    Get trending products
// @route   GET /api/v1/products/type/trending
// @access  Public
const getTrendingProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ isActive: true, isTrending: true }).sort({ displayOrder: 1 }).lean();
    const productsWithVariants = await attachVariantsToProducts(products);

    return res.status(200).json(new ApiResponse(200, "Trending products", { products: productsWithVariants }));
});

// @desc    Get products by collection
// @route   GET /api/v1/products/collection/:id
// @access  Public
const getProductsByCollection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const products = await Product.find({ collectionId: id, isActive: true }).sort({ displayOrder: 1 }).lean();
    const productsWithVariants = await attachVariantsToProducts(products);

    return res.status(200).json(new ApiResponse(200, "Collection products", { products: productsWithVariants }));
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
