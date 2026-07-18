const Product = require("../../models/Product.model");
const mongoose = require("mongoose");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// @desc    Filter Products using Aggregation Pipeline
// @route   GET /api/v1/filter/products
// @access  Public
const filterProducts = asyncHandler(async (req, res) => {
    const { minPrice, maxPrice, size, category, festival, collectionId } = req.query;

    const matchStage = { isActive: true };

    if (category) {
        // Handle multiple categories if comma-separated
        const categories = category.split(",").map(c => c.trim());
        matchStage.category = { $in: categories };
    }

    if (festival) {
        matchStage.festivalId = festival;
    }

    if (collectionId) {
        matchStage.collectionId = new mongoose.Types.ObjectId(collectionId);
    }

    // Prepare Variant Match Stage for Price and Size
    const variantMatchStage = { "variants.isAvailable": true };
    
    if (size) {
        const sizes = size.split(",").map(s => s.trim());
        variantMatchStage["variants.size"] = { $in: sizes };
    }

    if (minPrice || maxPrice) {
        variantMatchStage["variants.price"] = {};
        if (minPrice) variantMatchStage["variants.price"].$gte = parseFloat(minPrice);
        if (maxPrice) variantMatchStage["variants.price"].$lte = parseFloat(maxPrice);
    }

    // Build the Pipeline
    const pipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from: "productvariants",
                localField: "_id",
                foreignField: "productId",
                as: "variants"
            }
        },
        // Unwind to filter by variant specifics
        { $unwind: "$variants" },
        { $match: variantMatchStage },
        // Regroup back to product level
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                slug: { $first: "$slug" },
                shortDescription: { $first: "$shortDescription" },
                category: { $first: "$category" },
                isFeatured: { $first: "$isFeatured" },
                isTrending: { $first: "$isTrending" },
                displayOrder: { $first: "$displayOrder" },
                collectionId: { $first: "$collectionId" },
                variants: { $push: "$variants" }
            }
        },
        { $sort: { displayOrder: 1 } }
    ];

    const products = await Product.aggregate(pipeline);

    return res.status(200).json(new ApiResponse(200, "Filtered Products", {
        count: products.length,
        products
    }));
});

module.exports = {
    filterProducts
};
