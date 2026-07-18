const mongoose = require("mongoose");

const searchLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null // Null means guest search
        },
        searchQuery: {
            type: String,
            required: true,
            trim: true
        },
        resultsFound: {
            type: Number,
            default: 0
        },
        searchedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// We might want to aggregate these later by searchQuery to find Trending Searches
searchLogSchema.index({ searchQuery: 1 });

const SearchLog = mongoose.model("SearchLog", searchLogSchema);
module.exports = SearchLog;
