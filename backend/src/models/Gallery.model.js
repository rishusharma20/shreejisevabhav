const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true // URL to the image (e.g., /uploads/gallery/image.jpg)
        },
        altText: {
            type: String,
            required: true,
            trim: true
        },
        span: {
            type: String,
            enum: ["normal", "tall", "wide"],
            default: "normal"
        },
        order: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
