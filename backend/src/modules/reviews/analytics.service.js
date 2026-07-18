const Review = require("../../models/Review.model");

const getReviewAnalytics = async () => {
    const [totalReviews, averagePlatformRating, featuredReviews, reportedReviews] = await Promise.all([
        Review.countDocuments(),
        Review.aggregate([
            { $group: { _id: null, avg: { $avg: "$rating" } } }
        ]),
        Review.countDocuments({ isFeatured: true }),
        Review.countDocuments({ isApproved: false })
    ]);

    return {
        totalReviews,
        averagePlatformRating: averagePlatformRating.length > 0 ? Math.round(averagePlatformRating[0].avg * 10) / 10 : 0,
        featuredReviews,
        reportedReviews // Taking unapproved as a proxy for reported/blocked in this MVP
    };
};

module.exports = {
    getReviewAnalytics
};
