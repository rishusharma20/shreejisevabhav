const express = require("express");
const {
    getPublicSettings,
    getSitemap,
    adminUpdateSettings,
    adminUploadMedia,
    adminGetMediaGallery
} = require("./website.controller");
const { verifyJWT, isAdmin } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { updateSettingsValidation, mediaUploadValidation } = require("./website.validation");

const router = express.Router();

// Public Routes
router.get("/settings", getPublicSettings);
router.get("/sitemap", getSitemap);

// Admin Routes
router.use(verifyJWT, isAdmin); // All routes below require Admin
router.put("/settings", updateSettingsValidation, validate, adminUpdateSettings);
router.post("/media", mediaUploadValidation, validate, adminUploadMedia);
router.get("/media", adminGetMediaGallery);

module.exports = router;
