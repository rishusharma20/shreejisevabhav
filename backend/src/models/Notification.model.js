const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        notificationType: {
            type: String,
            enum: [
                "WELCOME", "PAYMENT", "ORDER", "TRACK_MY_SEVA",
                "FESTIVAL", "OFFERS", "COLLECTIONS", "PRODUCTS",
                "DELIVERY", "WEBSITE", "ANNOUNCEMENTS"
            ],
            required: true
        },
        redirectURL: {
            type: String,
            default: null
        },
        isRead: {
            type: Boolean,
            default: false
        },
        priority: {
            type: String,
            enum: ["HIGH", "MEDIUM", "LOW"],
            default: "LOW"
        },
        expiresAt: {
            type: Date,
            default: null // Some notifications (like limited time offers) can expire
        }
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
