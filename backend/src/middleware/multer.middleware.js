const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const ApiError = require("../utils/ApiError");

const createStorage = (folderName) => {
    const uploadDir = path.join(__dirname, `../../../public/uploads/${folderName}`);
    fs.ensureDirSync(uploadDir);

    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
        }
    });
};

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

const uploadProfile = multer({
    storage: createStorage("profiles"),
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: fileFilter
});

const uploadCollection = multer({
    storage: createStorage("collections"),
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: fileFilter
});

const uploadVariant = multer({
    storage: createStorage("variants"),
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: fileFilter
});

const uploadGallery = multer({
    storage: createStorage("gallery"),
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: fileFilter
});

const upload = multer({
    storage: createStorage("general"),
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: fileFilter
});

module.exports = {
    uploadProfile,
    uploadCollection,
    uploadVariant,
    uploadGallery,
    upload
};
