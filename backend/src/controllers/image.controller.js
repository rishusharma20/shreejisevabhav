const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { getFileStreamAndMetadata } = require("../services/gridfs.service");

// @desc    Serve an image directly from MongoDB GridFS
// @route   GET /api/v1/images/:fileId or GET /api/images/:fileId
// @access  Public
const serveImage = asyncHandler(async (req, res) => {
    const { fileId } = req.params;

    const result = await getFileStreamAndMetadata(fileId);
    if (!result) {
        throw new ApiError(404, "Image not found");
    }

    const { file, downloadStream, contentType } = result;

    res.set({
        "Content-Type": contentType,
        "Content-Length": file.length,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Accept-Ranges": "bytes"
    });

    downloadStream.on("error", (err) => {
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Error streaming image" });
        }
    });

    downloadStream.pipe(res);
});

module.exports = {
    serveImage
};
