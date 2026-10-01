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
        price, quantity, size, variants
    } = req.body;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
        throw new ApiError(404, "Invalid Collection", { collectionId: "Collection not found" });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        throw new ApiError(400, "Product Creation Failed", { name: "Product with this name already exists" });
    }

    const defaultProductPrice = price !== undefined && price !== "" ? Number(price) : 0;

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
        price: defaultProductPrice,
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

    let parsedVariants = [];
    if (variants) {
        if (typeof variants === "string") {
            try {
                parsedVariants = JSON.parse(variants);
            } catch {
                parsedVariants = [];
            }
        } else if (Array.isArray(variants)) {
            parsedVariants = variants;
        }
    }

    if (parsedVariants.length === 0 && (size !== undefined || quantity !== undefined)) {
        parsedVariants.push({
            size: size || "Standard",
            quantity: quantity !== undefined ? Number(quantity) : 0,
            price: defaultProductPrice
        });
    }

    try {
        const createdVariants = [];
        for (const v of parsedVariants) {
            const vSize = String(v.size).trim();
            const vQty = Number(v.quantity !== undefined ? v.quantity : v.stock) || 0;
            const hasCustom = v.customPrice !== undefined && v.customPrice !== null && v.customPrice !== "";
            const vCustomPrice = hasCustom ? Number(v.customPrice) : null;
            const vPrice = vCustomPrice !== null 
                ? vCustomPrice 
                : (v.price !== undefined && v.price !== null && v.price !== "" ? Number(v.price) : defaultProductPrice);

            const newVariant = await ProductVariant.create({
                productId: product._id,
                size: vSize,
                price: vPrice,
                customPrice: vCustomPrice,
                quantity: vQty,
                isAvailable: vQty > 0,
                images
            });
            createdVariants.push(newVariant);
        }

        return res.status(201).json(new ApiResponse(201, "Product created successfully", { 
            product, 
            variants: createdVariants, 
            variant: createdVariants[0] 
        }));
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

// Helper to attach default variant info (price, images, variantId, variants) to products
const attachVariantsToProducts = async (products) => {
    if (!products || products.length === 0) return [];
    
    const plainProducts = products.map(p => (typeof p.toObject === "function" ? p.toObject() : p));
    const productIds = plainProducts.map(p => p._id);
    const variants = await ProductVariant.find({ productId: { $in: productIds } }).lean();

    return plainProducts.map(product => {
        const productVariants = variants.filter(v => v.productId.toString() === product._id.toString());
        const defaultVariant = productVariants[0] || {};
        const totalQuantity = productVariants.reduce((sum, v) => sum + (v.quantity || 0), 0);
        const effectiveBasePrice = (product.price !== undefined && product.price > 0) ? product.price : (defaultVariant.price || 0);

        return {
            ...product,
            variantId: defaultVariant._id,
            price: effectiveBasePrice,
            originalPrice: (defaultVariant.price || effectiveBasePrice) + (defaultVariant.discount || 0),
            images: (defaultVariant.images && defaultVariant.images.length > 0) ? defaultVariant.images : ["/images/products/placeholder.svg"],
            size: defaultVariant.size || "Standard",
            quantity: totalQuantity,
            inStock: totalQuantity > 0,
            variants: productVariants
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

    // Fetch all variants so the product page can show size options and out-of-stock states
    const variants = await ProductVariant.find({ productId: product._id }).sort({ price: 1, size: 1 });

    return res.status(200).json(new ApiResponse(200, "Product retrieved", { product, variants }));
});

// @desc    Update a product
// @route   PUT /api/v1/products/update/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { price, quantity, size, variants, ...productFields } = req.body;

    const updateData = { ...productFields, updatedBy: req.user._id };
    if (price !== undefined && price !== "") {
        updateData.price = Number(price);
    }

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

    const existingVariants = await ProductVariant.find({ productId: id });
    let existingImages = [];
    if (existingVariants.length > 0 && existingVariants[0].images && existingVariants[0].images.length > 0) {
        existingImages = existingVariants[0].images;
    }

    let finalImages = existingImages;
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
        finalImages = newImages;
    }

    let parsedVariants = null;
    if (variants !== undefined) {
        if (typeof variants === "string") {
            try {
                parsedVariants = JSON.parse(variants);
            } catch {
                parsedVariants = null;
            }
        } else if (Array.isArray(variants)) {
            parsedVariants = variants;
        }
    }

    let resultVariants = [];

    if (Array.isArray(parsedVariants)) {
        // Multi-variant update
        const keepVariantIds = [];
        const defaultProductPrice = price !== undefined && price !== "" 
            ? Number(price) 
            : (updatedProduct.price !== undefined ? updatedProduct.price : (existingVariants[0]?.price || 0));

        for (const v of parsedVariants) {
            const vSize = String(v.size || "Standard").trim();
            const vQty = Number(v.quantity !== undefined ? v.quantity : (v.stock !== undefined ? v.stock : 0)) || 0;
            const existing = existingVariants.find(ev => ev.size === vSize);

            // Determine custom price:
            let vCustomPrice = null;
            if (v.customPrice !== undefined && v.customPrice !== null && String(v.customPrice).trim() !== "") {
                vCustomPrice = Number(v.customPrice);
            } else if (v.customPrice === null || (typeof v.customPrice === "string" && v.customPrice.trim() === "")) {
                vCustomPrice = null;
            } else if (existing && existing.customPrice !== undefined && existing.customPrice !== null) {
                vCustomPrice = existing.customPrice;
            } else if (v.price !== undefined && v.price !== null && v.price !== "" && Number(v.price) !== defaultProductPrice) {
                vCustomPrice = Number(v.price);
            }

            const effectivePrice = vCustomPrice !== null ? vCustomPrice : defaultProductPrice;
            const isAvailable = vQty > 0;

            if (existing) {
                existing.quantity = vQty;
                existing.price = effectivePrice;
                existing.customPrice = vCustomPrice;
                existing.isAvailable = isAvailable;
                if (finalImages.length > 0) {
                    existing.images = finalImages;
                }
                await existing.save();
                keepVariantIds.push(existing._id);
                resultVariants.push(existing);
            } else {
                const created = await ProductVariant.create({
                    productId: id,
                    size: vSize,
                    quantity: vQty,
                    price: effectivePrice,
                    customPrice: vCustomPrice,
                    isAvailable,
                    images: finalImages
                });
                keepVariantIds.push(created._id);
                resultVariants.push(created);
            }
        }

        // Delete variants that were removed
        await ProductVariant.deleteMany({
            productId: id,
            _id: { $nin: keepVariantIds }
        });
    } else {
        // Legacy single variant update
        const variantUpdate = {};
        if (price !== undefined && price !== "") variantUpdate.price = Number(price);
        if (quantity !== undefined && quantity !== "") {
            const q = Number(quantity);
            variantUpdate.quantity = q;
            variantUpdate.isAvailable = q > 0;
        }
        if (size !== undefined && size !== "") variantUpdate.size = size;
        if (finalImages.length > 0 && req.files && req.files.length > 0) {
            variantUpdate.images = finalImages;
        }

        if (existingVariants.length > 0) {
            const primaryVariant = existingVariants[0];
            Object.assign(primaryVariant, variantUpdate);
            await primaryVariant.save();
            resultVariants = [primaryVariant];
        } else if (Object.keys(variantUpdate).length > 0) {
            const newVar = await ProductVariant.create({
                productId: id,
                size: variantUpdate.size || "Standard",
                price: variantUpdate.price || 0,
                quantity: variantUpdate.quantity || 0,
                isAvailable: (variantUpdate.quantity || 0) > 0,
                images: finalImages
            });
            resultVariants = [newVar];
        }
    }

    return res.status(200).json(new ApiResponse(200, "Product updated", { 
        product: updatedProduct, 
        variants: resultVariants,
        variant: resultVariants[0] || null 
    }));
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
