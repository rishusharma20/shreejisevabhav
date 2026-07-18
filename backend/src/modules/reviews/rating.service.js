const Review = require("../../models/Review.model");
const Product = require("../../models/Product.model");

/**
 * Dynamically recalculates the average rating for a product 
 * and updates the Product document.
 */
const recalculateProductRating = async (productId) => {
    const stats = await Review.aggregate([
        {
            $match: {
                productId: productId,
                isApproved: true
            }
        },
        {
            $group: {
                _id: "$productId",
                averageRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 }
            }
        }
    ]);

    if (stats.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            ratings: Math.round(stats[0].averageRating * 10) / 10, // Round to 1 decimal
            reviews: stats[0].totalReviews
        });
    } else {
        // If all reviews were deleted
        await Product.findByIdAndUpdate(productId, {
            ratings: 0,
            reviews: 0
        });
    }
};

module.exports = {
    recalculateProductRating
};
