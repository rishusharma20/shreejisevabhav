const mongoose = require("mongoose");
const slugify = require("slugify");

const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Collection name is required"],
            trim: true,
            unique: true
        },
        slug: {
            type: String,
            unique: true
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        shortDescription: {
            type: String,
            trim: true
        },
        bannerImage: {
            type: String, // Path to image
            required: [true, "Banner image is required"]
        },
        thumbnailImage: {
            type: String, // Path to image
            required: [true, "Thumbnail image is required"]
        },
        featuredImage: {
            type: String // Optional additional featured image
        },
        festival: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        isTrending: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        displayOrder: {
            type: Number,
            default: 0
        },
        metaTitle: String,
        metaDescription: String,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

// Text Index for Search Engine
collectionSchema.index({
    name: "text",
    description: "text",
    festival: "text",
    category: "text"
});

collectionSchema.pre("save", function () {
    if (this.isModified("name") && !this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
