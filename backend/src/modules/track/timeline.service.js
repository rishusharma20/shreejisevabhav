/**
 * This service acts as a translator between standardized backend enums
 * and beautiful devotional frontend messaging.
 */

const timelineDictionary = {
    "PAYMENT_SUCCESS": {
        title: "PAYMENT SUCCESSFUL",
        description: "Your Divine Offerings have been accepted with love."
    },
    "PREPARING": {
        title: "PREPARING DIVINE OFFERINGS",
        description: "Your Divine Offerings are being lovingly prepared in Vrindavan."
    },
    "PACKAGING": {
        title: "PACKAGING COMPLETED",
        description: "Your offerings have been securely packed with utmost devotion."
    },
    "SHIPPED": {
        title: "DIVINE JOURNEY STARTED",
        description: "Your Divine Offerings have started their journey to your home."
    },
    "OUT_FOR_DELIVERY": {
        title: "OUT FOR DELIVERY",
        description: "The Divine Offerings are arriving today. Please be ready to receive them."
    },
    "DELIVERED": {
        title: "DELIVERED",
        description: "Your Divine Offerings have safely reached your home."
    },
    "COMPLETED": {
        title: "JOURNEY COMPLETED",
        description: "Continue your beautiful Divine Journey."
    }
};

const getTimelineDetails = (status) => {
    return timelineDictionary[status] || {
        title: "UPDATE RECEIVED",
        description: "Your Divine Journey is progressing."
    };
};

module.exports = {
    getTimelineDetails
};
