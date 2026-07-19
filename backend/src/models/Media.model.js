const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        mediaType: {
            type: String,
            enum: ["IMAGE", "VIDEO"],
            required: true
        },
        url: {
            type: String,
            required: true // URL to Cloudinary, S3, or local storage
        },
        altText: {
            type: String,
            default: ""
        },
        isFeatured: {
            type: Boolean,
            default: false // Helpful for fetching top banners quickly
        },
        festival: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Festival",
            default: null
        },
        collectionRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection",
            default: null
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
