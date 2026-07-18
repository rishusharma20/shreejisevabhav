const TrackMySeva = require("../../models/TrackMySeva.model");
const { getTimelineDetails } = require("./timeline.service");
const { sendJourneyUpdateNotification } = require("./notification.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// ============================================
// USER ENDPOINTS
// ============================================

// @desc    Get all tracking records for the logged-in user
// @route   GET /api/v1/track-my-seva
// @access  Private
const getMyJourneys = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const journeys = await TrackMySeva.find({ userId })
        .populate("paymentId", "totalAmount paymentStatus paidAt")
        .populate("orderId") // Will populate once Phase 10 exists
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, "Your Divine Journeys", { journeys }));
});

// @desc    Get single tracking record by ID
// @route   GET /api/v1/track-my-seva/:id
// @access  Private
const getJourneyById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const journey = await TrackMySeva.findOne({ _id: id, userId })
        .populate("paymentId", "totalAmount paymentStatus paidAt paymentMethod")
        .populate("orderId");

    if (!journey) {
        throw new ApiError(404, "Journey not found or does not belong to you");
    }

    return res.status(200).json(new ApiResponse(200, "Journey details", { journey }));
});


// ============================================
// ADMIN ENDPOINTS
// ============================================

// @desc    Get all tracking records across platform
// @route   GET /api/v1/track-my-seva/admin/all
// @access  Private/Admin
const getAllJourneys = asyncHandler(async (req, res) => {
    const journeys = await TrackMySeva.find()
        .populate("userId", "name email")
        .populate("paymentId", "totalAmount paymentStatus")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, "All platform journeys", { journeys }));
});

// @desc    Update Journey Status
// @route   PUT /api/v1/track-my-seva/admin/:id/status
// @access  Private/Admin
const updateJourneyStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const journey = await TrackMySeva.findById(id);
    if (!journey) throw new ApiError(404, "TrackMySeva record not found");

    if (journey.currentStatus === status) {
        throw new ApiError(400, `Journey is already at status: ${status}`);
    }

    // Generate Devotional UI strings using Timeline Service
    const timelineData = getTimelineDetails(status);

    // Update the record
    journey.currentStatus = status;
    journey.timeline.push({
        status: status,
        title: timelineData.title,
        description: timelineData.description,
        createdAt: new Date()
    });

    if (status === "DELIVERED" || status === "COMPLETED") {
        journey.isDelivered = true;
    }

    await journey.save();

    // Trigger Notification
    sendJourneyUpdateNotification(journey.userId, timelineData.title, timelineData.description);

    return res.status(200).json(new ApiResponse(200, "Journey Status Updated", { journey }));
});

// @desc    Update Delivery Details (Courier / Tracking Number)
// @route   PUT /api/v1/track-my-seva/admin/:id/delivery
// @access  Private/Admin
const updateDeliveryDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { trackingNumber, deliveryPartner, estimatedDelivery } = req.body;

    const journey = await TrackMySeva.findById(id);
    if (!journey) throw new ApiError(404, "TrackMySeva record not found");

    journey.trackingNumber = trackingNumber;
    journey.deliveryPartner = deliveryPartner;
    
    if (estimatedDelivery) {
        journey.estimatedDelivery = estimatedDelivery;
    }

    await journey.save();

    return res.status(200).json(new ApiResponse(200, "Delivery details updated", { journey }));
});


module.exports = {
    getMyJourneys,
    getJourneyById,
    getAllJourneys,
    updateJourneyStatus,
    updateDeliveryDetails
};
