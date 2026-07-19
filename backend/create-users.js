require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User.model");

async function createTestUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shreeji_seva_bhav_v1");
        console.log("Connected to MongoDB. Creating test users...");

        // Create Admin
        const adminExists = await User.findOne({ email: "admin@gmail.com" });
        if (!adminExists) {
            await User.create({
                name: "Super Admin",
                email: "admin@gmail.com",
                password: "Admin@123!",
                phone: "+919999999999",
                role: "ADMIN"
            });
            console.log("Admin user created: admin@gmail.com / Admin@123!");
        } else {
            console.log("Admin user already exists.");
        }

        // Create Test User
        const userExists = await User.findOne({ email: "test@gmail.com" });
        if (!userExists) {
            await User.create({
                name: "Test Devotee",
                email: "test@gmail.com",
                password: "Divine@123!",
                phone: "+918888888888",
                role: "USER"
            });
            console.log("Test user created: test@gmail.com / Divine@123!");
        } else {
            console.log("Test user already exists.");
        }

        console.log("✅ Test users setup complete!");
    } catch (error) {
        console.error("❌ Error creating test users:", error);
    } finally {
        mongoose.disconnect();
        process.exit(0);
    }
}

createTestUsers();
