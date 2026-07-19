const Offer = require("../../models/Offer.model");

const createOffer = async (data) => {
    return await Offer.create(data);
};

const getOffers = async () => {
    return await Offer.find({ isActive: true, expiryDate: { $gte: new Date() } }).sort({ createdAt: -1 });
};

module.exports = {
    createOffer,
    getOffers
};
