const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            unique: true
        },
        slug: {
            type: String,
            unique: true
        },
        shortDescription: {
            type: String,
            required: [true, "Short description is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection",
            required: [true, "Product must belong to a Collection"]
        },
        festivalId: {
            type: String, // Can be ObjectId or String depending on festival architecture later
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
        ratings: {
            type: Number,
            default: 0
        },
        reviews: {
            type: Number,
            default: 0
        },
        totalSold: {
            type: Number,
            default: 0
        },
        displayOrder: {
            type: Number,
            default: 0
        },
        tags: [
            {
                type: String,
                trim: true
            }
        ],
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
productSchema.index({
    name: "text",
    description: "text",
    category: "text",
    tags: "text"
});

productSchema.pre("save", function () {
    if (this.isModified("name") && !this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
