const mongoose = require("mongoose");
const User = require("./src/models/User.model");
const crypto = require("crypto");
require("dotenv").config();

async function runTest() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shreeji_seva_bhav_v1");
        console.log("Connected to MongoDB.");

        const email = "test@gmail.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.error("Test user not found!");
            process.exit(1);
        }

        // 1. Generate Token
        console.log("\n1. Generating Reset Token...");
        const rawToken = user.generatePasswordResetToken();
        await user.save();
        console.log("Raw Token Generated:", rawToken);

        // 2. Mock sending email
        const sendEmail = require("./src/utils/sendEmail");
        const resetUrl = `http://localhost:3000/reset-password/${rawToken}`;
        await sendEmail({
            email: user.email,
            subject: "Test Reset",
            message: resetUrl
        });

        // 3. Reset Password
        console.log("\n3. Resetting Password...");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        
        const resetUser = await User.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        });

        if (!resetUser) {
            console.error("❌ Reset token invalid or expired in DB lookup.");
            process.exit(1);
        }

        resetUser.password = "NewPassword123!";
        resetUser.forgotPasswordToken = undefined;
        resetUser.forgotPasswordExpiry = undefined;
        await resetUser.save();

        console.log("✅ Password successfully reset!");

        // 4. Verify login with new password
        console.log("\n4. Verifying new password via model method...");
        const isValid = await resetUser.isPasswordCorrect("NewPassword123!");
        if (isValid) {
            console.log("✅ New password verified successfully!");
        } else {
            console.log("❌ New password failed verification.");
        }

    } catch (err) {
        console.error("❌ Test Failed:", err);
    } finally {
        mongoose.disconnect();
    }
}

runTest();
