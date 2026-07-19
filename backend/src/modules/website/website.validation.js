const { body } = require("express-validator");

const updateSettingsValidation = [
    body("websiteName").optional().isString().trim(),
    body("maintenanceMode").optional().isBoolean(),
    body("seoSettings.metaTitle").optional().isString().trim(),
    body("heroSection.backgroundMediaUrl").optional().isURL().withMessage("Must be a valid URL")
];

const mediaUploadValidation = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("mediaType").isIn(["IMAGE", "VIDEO"]).withMessage("Invalid media type"),
    body("url").isURL().withMessage("A valid Cloudinary/S3 URL is required for the MVP Phase 16.")
];

module.exports = {
    updateSettingsValidation,
    mediaUploadValidation
};
