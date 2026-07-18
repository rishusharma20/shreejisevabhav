const Order = require("../../models/Order.model");

/**
 * The Absolute Gatekeeper. 
 * Ensures the user actually purchased the product AND it was delivered before they can review it.
 */
const verifyPurchaseEligibility = async (userId, productId) => {
    const validOrder = await Order.findOne({
        userId,
        "products.productId": productId,
        orderStatus: { $in: ["DELIVERED", "COMPLETED"] }
    });

    if (!validOrder) {
        return {
            isEligible: false,
            orderId: null,
            message: "You can only review products that have been successfully delivered to you."
        };
    }

    return {
        isEligible: true,
        orderId: validOrder._id,
        message: "Eligible for review."
    };
};

module.exports = {
    verifyPurchaseEligibility
};
