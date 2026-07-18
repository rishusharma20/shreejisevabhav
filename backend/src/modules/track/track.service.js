const TrackMySeva = require("../../models/TrackMySeva.model");
const { getTimelineDetails } = require("./timeline.service");
const { sendJourneyUpdateNotification } = require("./notification.service");

/**
 * Initiates the tracking sequence.
 * Called strictly by the Phase 8 Payment Service upon successful webhook verification.
 */
const initiateTracking = async (paymentId, userId, orderId = null) => {
    
    // 1. Get the devotional messaging for the initial status
    const initialStatus = "PAYMENT_SUCCESS";
    const timelineData = getTimelineDetails(initialStatus);

    // 2. Create the TrackMySeva Document
    const trackRecord = await TrackMySeva.create({
        userId,
        paymentId,
        orderId,
        currentStatus: initialStatus,
        timeline: [
            {
                status: initialStatus,
                title: timelineData.title,
                description: timelineData.description,
                createdAt: new Date()
            }
        ]
    });

    // 3. Dispatch Notification
    sendJourneyUpdateNotification(userId, timelineData.title, timelineData.description);

    return trackRecord;
};

module.exports = {
    initiateTracking
};
