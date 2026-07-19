const Media = require("../../models/Media.model");

const saveMediaMetadata = async (mediaData) => {
    return await Media.create(mediaData);
};

const getGallery = async (filters) => {
    return await Media.find(filters).sort({ createdAt: -1 });
};

const deleteMedia = async (mediaId) => {
    // In Stage 2, this function should also call Cloudinary.uploader.destroy()
    return await Media.findByIdAndDelete(mediaId);
};

module.exports = {
    saveMediaMetadata,
    getGallery,
    deleteMedia
};
