const Cart = require("../../models/Cart.model");
const Product = require("../../models/Product.model");
const ProductVariant = require("../../models/ProductVariant.model");
const { recalculateCart } = require("./priceCalculation.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// Helper to get or create cart
const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({ userId, products: [] });
    }
    return cart;
};

// @desc    Add Item to Cart
// @route   POST /api/v1/cart/add
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
    const { productId, variantId, quantity } = req.body;
    const userId = req.user._id;

    // 1. Inventory Checking
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
        throw new ApiError(404, "Product is not available");
    }

    const variant = await ProductVariant.findById(variantId);
    if (!variant || variant.productId.toString() !== productId) {
        throw new ApiError(404, "Variant not found or mismatch");
    }

    if (!variant.isAvailable || variant.quantity < quantity) {
        throw new ApiError(400, "Out of Stock", { requested: quantity, available: variant.quantity });
    }

    // 2. Fetch/Create Cart
    let cart = await getOrCreateCart(userId);

    // 3. Add or Update Item in Cart
    const itemIndex = cart.products.findIndex(p => p.variantId.toString() === variantId);
    
    if (itemIndex > -1) {
        // Item exists, update quantity
        const newQuantity = cart.products[itemIndex].quantity + quantity;
        
        // Re-check inventory for new total quantity
        if (newQuantity > variant.quantity) {
             throw new ApiError(400, "Cannot add more. Exceeds available stock.", { available: variant.quantity });
        }
        cart.products[itemIndex].quantity = newQuantity;
    } else {
        // New item
        cart.products.push({
            productId,
            variantId,
            quantity
        });
    }

    // 4. Recalculate Pricing
    cart = await recalculateCart(cart);
    await cart.save();

    return res.status(200).json(new ApiResponse(200, "Added to your Divine Journey", { cart }));
});

// @desc    Get Cart Details
// @route   GET /api/v1/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId })
        .populate("products.productId", "name slug category")
        .populate("products.variantId", "size images price discount sku");

    if (!cart) {
        cart = await Cart.create({ userId, products: [] });
    } else {
        // Recalculate just in case prices changed in DB while user was away
        cart = await recalculateCart(cart);
        await cart.save();
    }

    return res.status(200).json(new ApiResponse(200, "Your Divine Journey", { cart }));
});

// @desc    Update Item Quantity
// @route   PUT /api/v1/cart/update/:variantId
// @access  Private
const updateQuantity = asyncHandler(async (req, res) => {
    const { variantId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });
    if (!cart) throw new ApiError(404, "Cart not found");

    const itemIndex = cart.products.findIndex(p => p.variantId.toString() === variantId);
    if (itemIndex === -1) throw new ApiError(404, "Item not in cart");

    // Inventory check
    const variant = await ProductVariant.findById(variantId);
    if (!variant || variant.quantity < quantity) {
        throw new ApiError(400, "Requested quantity not available", { available: variant?.quantity || 0 });
    }

    cart.products[itemIndex].quantity = quantity;
    
    cart = await recalculateCart(cart);
    await cart.save();

    return res.status(200).json(new ApiResponse(200, "Quantity updated", { cart }));
});

// @desc    Remove Item from Cart
// @route   DELETE /api/v1/cart/remove/:variantId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
    const { variantId } = req.params;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });
    if (!cart) throw new ApiError(404, "Cart not found");

    cart.products = cart.products.filter(p => p.variantId.toString() !== variantId);

    cart = await recalculateCart(cart);
    await cart.save();

    return res.status(200).json(new ApiResponse(200, "Item removed from cart", { cart }));
});

// @desc    Clear Cart
// @route   DELETE /api/v1/cart/clear
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });
    if (cart) {
        cart.products = [];
        cart.couponCode = null;
        cart = await recalculateCart(cart);
        await cart.save();
    }

    return res.status(200).json(new ApiResponse(200, "Cart cleared successfully", { cart }));
});



// @desc    Get Cart Price Details (Summary)
// @route   GET /api/v1/cart/price-details
// @access  Private
const getPriceDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    
    if (!cart) throw new ApiError(404, "Cart not found");

    const priceDetails = {
        totalProducts: cart.totalProducts,
        subtotal: cart.subtotal,
        totalDiscount: cart.totalDiscount,
        couponDiscount: cart.couponDiscount,
        shippingCharge: cart.shippingCharge,
        totalAmount: cart.totalAmount,
        totalSavings: cart.totalDiscount + cart.couponDiscount,
        isCheckoutReady: cart.isCheckoutReady
    };

    return res.status(200).json(new ApiResponse(200, "Price details calculated", { priceDetails }));
});

module.exports = {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getPriceDetails
};
