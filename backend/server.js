require("dotenv").config({ path: "./.env" });
const app = require("./app");
const connectDB = require("./src/database/connection");

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`\n🕉️  Divine Server is running on port: ${PORT}`);
        });

        // Handle Unhandled Rejections
        process.on("unhandledRejection", (err) => {
            console.log("UNHANDLED REJECTION! 💥 Shutting down...");
            console.log(err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!! ", err);
    });
