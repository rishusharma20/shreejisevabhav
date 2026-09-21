const multer = require("multer");
const path = require("path");
const ApiError = require("../utils/ApiError");

// Store files in memory as Buffers for direct streaming into MongoDB GridFS
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|webp/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new ApiError(400, "Upload Failed", { file: "Only .jpg, .jpeg, .png and .webp format allowed!" }), false);
    }
};

const uploadOptions = {
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: fileFilter
};

const uploadProfile = multer(uploadOptions);
const uploadCollection = multer(uploadOptions);
const uploadVariant = multer(uploadOptions);
const uploadGallery = multer(uploadOptions);
const upload = multer(uploadOptions);

module.exports = {
    uploadProfile,
    uploadCollection,
    uploadVariant,
    uploadGallery,
    upload
};
