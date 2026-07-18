const ProductVariant = require("../../models/ProductVariant.model");

/**
 * Scans the database for variants falling below the threshold.
 * Returns actionable alerts for the Admin Dashboard.
 */
const getLowStockAlerts = async (threshold = 5) => {
    const lowStockVariants = await ProductVariant.find({ quantity: { $lte: threshold } })
        .populate("productId", "name category")
        .sort({ quantity: 1 });

    const alerts = lowStockVariants.map(variant => ({
        variantId: variant._id,
        productName: variant.productId.name,
        category: variant.productId.category,
        size: variant.size,
        currentStock: variant.quantity,
        alertType: variant.quantity === 0 ? "OUT_OF_STOCK" : "LOW_STOCK"
    }));

    return alerts;
};

module.exports = {
    getLowStockAlerts
};
