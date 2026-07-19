const Festival = require("../../models/Festival.model");

/**
 * The Master Orchestrator for the Website State.
 * Evaluates the current timestamp against all active scheduled festivals.
 * Returns the highest priority active festival payload.
 */
const getActiveFestivalState = async () => {
    const now = new Date();

    // Find the first featured, active festival where TODAY falls strictly between startDate and endDate
    const activeFestival = await Festival.findOne({
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now }
    })
    .populate("specialCollections", "name slug thumbnailImage description")
    .populate("specialProducts", "name slug images price discount isActive ratings")
    .populate("festivalOffers", "title description discountValue offerType")
    .sort({ isFeatured: -1, createdAt: -1 });

    if (!activeFestival) {
        return null;
    }

    return activeFestival;
};

module.exports = {
    getActiveFestivalState
};
