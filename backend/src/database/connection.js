const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\n🕉️  Divine MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED: ", error);
        throw new ApiError(500, "MongoDB Connection Failed", { error: error.message });
    }
};

module.exports = connectDB;
