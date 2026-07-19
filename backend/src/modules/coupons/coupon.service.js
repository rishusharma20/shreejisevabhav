const Coupon = require("../../models/Coupon.model");

const createCoupon = async (data, adminId) => {
    data.createdBy = adminId;
    return await Coupon.create(data);
};

const getCoupons = async () => {
    return await Coupon.find().sort({ createdAt: -1 });
};

module.exports = {
    createCoupon,
    getCoupons
};
