const Coupon = require("../../models/Coupon.model");

const getBlessingAnalytics = async () => {
    const popularCoupons = await Coupon.find()
        .sort({ usedCount: -1 })
        .limit(5)
        .select("code title usedCount discountType discountValue");

    return {
        popularCoupons
    };
};

module.exports = {
    getBlessingAnalytics
};
