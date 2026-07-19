const WebsiteSettings = require("../../models/WebsiteSettings.model");

/**
 * Fetches the Singleton Website Settings Document.
 * Creates it with defaults if it doesn't exist yet.
 */
const getWebsiteSettings = async () => {
    let settings = await WebsiteSettings.findOne({ isSingleton: true });
    
    if (!settings) {
        settings = await WebsiteSettings.create({ isSingleton: true });
    }
    
    return settings;
};

/**
 * Updates the Singleton Document.
 */
const updateWebsiteSettings = async (updateData) => {
    return await WebsiteSettings.findOneAndUpdate(
        { isSingleton: true },
        updateData,
        { new: true, upsert: true } // Upsert ensures it's created if missing
    );
};

module.exports = {
    getWebsiteSettings,
    updateWebsiteSettings
};
