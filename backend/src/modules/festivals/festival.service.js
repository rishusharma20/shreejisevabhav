const Festival = require("../../models/Festival.model");

const createFestival = async (data) => {
    // Basic slug generation if not provided
    if (!data.slug) {
        data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    return await Festival.create(data);
};

const getUpcomingFestivals = async () => {
    const now = new Date();
    return await Festival.find({
        startDate: { $gt: now },
        isActive: true
    }).sort({ startDate: 1 });
};

module.exports = {
    createFestival,
    getUpcomingFestivals
};
