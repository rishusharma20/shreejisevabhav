const { getWebsiteSettings, updateWebsiteSettings } = require("./website.service");
const { generateDynamicSitemap } = require("./seo.service");
const { saveMediaMetadata, getGallery, deleteMedia } = require("./media.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

// ============================================
// PUBLIC ENDPOINTS
// ============================================

// @desc    Get Global Website Settings (Frontend calls on boot)
// @route   GET /api/v1/orchestration/settings
// @access  Public
const getPublicSettings = asyncHandler(async (req, res) => {
    const settings = await getWebsiteSettings();
    return res.status(200).json(new ApiResponse(200, "Global Website State", { settings }));
});

// @desc    Generate Dynamic XML Sitemap for SEO
// @route   GET /api/v1/orchestration/sitemap
// @access  Public
const getSitemap = asyncHandler(async (req, res) => {
    // Assuming frontend runs on standard port or provided via env
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000"; 
    const urls = await generateDynamicSitemap(baseUrl);

    // In a real scenario, you'd format this as actual XML. 
    // We return JSON representing the structure for the MVP API.
    return res.status(200).json(new ApiResponse(200, "Dynamic Sitemap Generated", { urls }));
});

// ============================================
// ADMIN ENDPOINTS
// ============================================

// @desc    Admin: Update Website Settings
// @route   PUT /api/v1/orchestration/settings
// @access  Private/Admin
const adminUpdateSettings = asyncHandler(async (req, res) => {
    const settings = await updateWebsiteSettings(req.body);
    return res.status(200).json(new ApiResponse(200, "Website state updated successfully", { settings }));
});

// @desc    Admin: Upload Media to Central Gallery
// @route   POST /api/v1/orchestration/media
// @access  Private/Admin
const adminUploadMedia = asyncHandler(async (req, res) => {
    // For Phase 16 MVP, we accept a URL (simulating a successful Cloudinary upload from frontend)
    const mediaData = { ...req.body, uploadedBy: req.user._id };
    const media = await saveMediaMetadata(mediaData);
    
    return res.status(201).json(new ApiResponse(201, "Media added to Central Gallery", { media }));
});

// @desc    Admin: Get Central Media Gallery
// @route   GET /api/v1/orchestration/media
// @access  Private/Admin
const adminGetMediaGallery = asyncHandler(async (req, res) => {
    const media = await getGallery({});
    return res.status(200).json(new ApiResponse(200, "Central Media Gallery", { media }));
});

module.exports = {
    getPublicSettings,
    getSitemap,
    adminUpdateSettings,
    adminUploadMedia,
    adminGetMediaGallery
};
