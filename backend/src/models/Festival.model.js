const mongoose = require("mongoose");

const festivalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true
        },
        festivalDate: {
            type: Date,
            required: true
        },
        festivalType: {
            type: String,
            enum: ["MAJOR", "MINOR", "SEASONAL"],
            default: "MAJOR"
        },
        festivalTheme: {
            // A dynamic JSON object that dictates the frontend UI CSS/Assets
            primaryColor: { type: String, default: "#F59E0B" },
            heroBannerUrl: { type: String, default: "" },
            enableFallingFlowers: { type: Boolean, default: false },
            greetingPrefix: { type: String, default: "Happy" }
        },
        bannerImage: {
            type: String,
            required: true
        },
        thumbnailImage: {
            type: String,
            required: true
        },
        festivalQuote: {
            type: String,
            default: ""
        },
        specialCollections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Collection"
            }
        ],
        specialProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        festivalOffers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Offer"
            }
        ],
        isFeatured: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true // Allows manual admin override to kill a festival early
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// We shouldn't have overlapping featured festivals, but multiple active can technically exist if dates overlap.
// The orchestrator handles prioritizing them.

const Festival = mongoose.model("Festival", festivalSchema);
module.exports = Festival;
