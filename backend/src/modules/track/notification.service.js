/**
 * A placeholder service for dispatching transactional notifications
 * (SMS / Email) to the devotee as their journey progresses.
 */
const sendJourneyUpdateNotification = (userId, title, message) => {
    // In a real production environment, this would call AWS SNS, Twilio, or SendGrid.
    console.log(`\n============================`);
    console.log(`🔔 NOTIFICATION DISPATCHED`);
    console.log(`To User ID: ${userId}`);
    console.log(`Title: ${title}`);
    console.log(`Message: ${message}`);
    console.log(`============================\n`);
};

module.exports = {
    sendJourneyUpdateNotification
};
