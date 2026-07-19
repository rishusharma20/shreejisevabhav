const mongoose = require("mongoose");

const notificationSettingsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        emailNotifications: {
            type: Boolean,
            default: true
        },
        orderNotifications: {
            type: Boolean,
            default: true // E.g., Order Placed, Shipped, Delivered
        },
        paymentNotifications: {
            type: Boolean,
            default: true // E.g., Payment Success, Failed
        },
        festivalNotifications: {
            type: Boolean,
            default: true
        },
        offerNotifications: {
            type: Boolean,
            default: true
        },
        trackMySevaNotifications: {
            type: Boolean,
            default: true
        },
        marketingNotifications: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const NotificationSettings = mongoose.model("NotificationSettings", notificationSettingsSchema);
module.exports = NotificationSettings;
