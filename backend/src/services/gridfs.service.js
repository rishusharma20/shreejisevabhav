const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const { Readable } = require("stream");
const ApiError = require("../utils/ApiError");

let bucketInstance = null;

/**
 * Get or initialize the GridFSBucket instance using the existing Mongoose connection.
 */
const getBucket = () => {
    if (!mongoose.connection || !mongoose.connection.db) {
        throw new ApiError(500, "Database connection not ready for GridFS operations");
    }
    if (!bucketInstance) {
        bucketInstance = new GridFSBucket(mongoose.connection.db, {
            bucketName: "images"
        });
    }
    return bucketInstance;
};

/**
 * Upload an image buffer to MongoDB GridFS
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * @param {string} originalname - Original file name
 * @param {string} mimetype - MIME type (e.g. image/jpeg, image/png)
 * @param {Object} metadata - Optional additional metadata
 * @returns {Promise<string>} - GridFS fileId as string
 */
const uploadFromBuffer = (buffer, originalname, mimetype, metadata = {}) => {
    return new Promise((resolve, reject) => {
        try {
            const bucket = getBucket();
            const safeFilename = `${Date.now()}-${originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

            const uploadStream = bucket.openUploadStream(safeFilename, {
                contentType: mimetype,
                metadata: {
                    originalname,
                    mimetype,
                    size: buffer.length,
                    uploadDate: new Date(),
                    ...metadata
                }
            });

            uploadStream.on("error", (err) => {
                reject(new ApiError(500, "Failed to upload image to GridFS", { error: err.message }));
            });

            uploadStream.on("finish", () => {
                resolve(uploadStream.id.toString());
            });

            const readableStream = Readable.from(buffer);
            readableStream.pipe(uploadStream);
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Retrieve an image stream and metadata from GridFS
 * @param {string} fileId - MongoDB ObjectId string
 * @returns {Promise<{ file: Object, downloadStream: ReadableStream, contentType: string } | null>}
 */
const getFileStreamAndMetadata = async (fileId) => {
    const cleanId = extractFileId(fileId);
    if (!cleanId || !mongoose.Types.ObjectId.isValid(cleanId)) {
        return null;
    }

    const bucket = getBucket();
    const objectId = new mongoose.Types.ObjectId(cleanId);

    const files = await bucket.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
        return null;
    }

    const file = files[0];
    const downloadStream = bucket.openDownloadStream(objectId);
    const contentType = file.contentType || file.metadata?.mimetype || "application/octet-stream";

    return {
        file,
        downloadStream,
        contentType
    };
};

/**
 * Delete an image file from GridFS
 * @param {string} fileId - MongoDB ObjectId string or image URL
 * @returns {Promise<boolean>}
 */
const deleteFile = async (fileId) => {
    const cleanId = extractFileId(fileId);
    if (!cleanId || !mongoose.Types.ObjectId.isValid(cleanId)) {
        return false;
    }

    try {
        const bucket = getBucket();
        const objectId = new mongoose.Types.ObjectId(cleanId);
        await bucket.delete(objectId);
        return true;
    } catch (err) {
        // File may already be deleted or not found
        console.warn(`GridFS deletion notice for ${cleanId}:`, err.message);
        return false;
    }
};

/**
 * Helper to extract raw ObjectId from string or /api/v1/images/:id path
 * @param {string} pathOrId 
 * @returns {string|null}
 */
const extractFileId = (pathOrId) => {
    if (!pathOrId || typeof pathOrId !== "string") return null;
    const parts = pathOrId.trim().split("/");
    return parts[parts.length - 1];
};

module.exports = {
    getBucket,
    uploadFromBuffer,
    getFileStreamAndMetadata,
    deleteFile,
    extractFileId
};
