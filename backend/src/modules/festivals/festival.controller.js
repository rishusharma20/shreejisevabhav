const { getActiveFestivalState } = require("./festivalScheduler.service");
const { getThemePayload } = require("./festivalTheme.service");
const { createFestival, getUpcomingFestivals } = require("./festival.service");
const { getFestivalAnalytics } = require("./analytics.service");
const Festival = require("../../models/Festival.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// ============================================
// PUBLIC ENDPOINTS
// ============================================

// @desc    Get Current Active Festival (Website Orchestrator)
// @route   GET /api/v1/festivals/active
// @access  Public
const getCurrentActiveFestival = asyncHandler(async (req, res) => {
    const activeFestival = await getActiveFestivalState();
    const themePayload = getThemePayload(activeFestival);

    return res.status(200).json(new ApiResponse(200, "Divine Calendar State", {
        orchestration: themePayload,
        data: activeFestival || null
    }));
});

// @desc    Get Upcoming Festivals
// @route   GET /api/v1/festivals/upcoming
// @access  Public
const getUpcoming = asyncHandler(async (req, res) => {
    const festivals = await getUpcomingFestivals();
    return res.status(200).json(new ApiResponse(200, "Upcoming Festivals", { festivals }));
});

// ============================================
// ADMIN ENDPOINTS
// ============================================

// @desc    Admin: Create Festival
// @route   POST /api/v1/festivals/create
// @access  Private/Admin
const adminCreateFestival = asyncHandler(async (req, res) => {
    const festival = await createFestival(req.body);
    return res.status(201).json(new ApiResponse(201, "Festival scheduled successfully", { festival }));
});

// @desc    Admin: Get Festival Analytics
// @route   GET /api/v1/festivals/admin/:id/analytics
// @access  Private/Admin
const adminGetAnalytics = asyncHandler(async (req, res) => {
    const festival = await Festival.findById(req.params.id);
    if (!festival) throw new ApiError(404, "Festival not found");

    const analytics = await getFestivalAnalytics(festival);
    return res.status(200).json(new ApiResponse(200, "Festival Analytics", { analytics }));
});

module.exports = {
    getCurrentActiveFestival,
    getUpcoming,
    adminCreateFestival,
    adminGetAnalytics
};
