const axios = require('axios');

const BASE_URL = 'http://localhost:8000/api/v1/auth';
let accessToken = '';

async function runTests() {
    console.log("Starting V1 Authentication Tests...\n");

    try {
        // 1. Register User
        console.log("1. Testing Registration...");
        const registerRes = await axios.post(`${BASE_URL}/register`, {
            name: "Test Devotee",
            email: "test@shreejisevabhav.com",
            password: "Password123!"
        });
        console.log("✅ Registration Successful:", registerRes.data.message);
        accessToken = registerRes.data.data.accessToken;

        // 2. Login User
        console.log("\n2. Testing Login...");
        const loginRes = await axios.post(`${BASE_URL}/login`, {
            email: "test@shreejisevabhav.com",
            password: "Password123!"
        });
        console.log("✅ Login Successful:", loginRes.data.message);
        accessToken = loginRes.data.data.accessToken;

        // 3. JWT & Profile
        console.log("\n3. Testing JWT & Profile Fetch...");
        const profileRes = await axios.get(`${BASE_URL}/profile`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log("✅ Profile Fetch Successful. Name:", profileRes.data.data.user.name);

        // 4. Change Password
        console.log("\n4. Testing Change Password...");
        const changePwdRes = await axios.put(`${BASE_URL}/change-password`, {
            oldPassword: "Password123!",
            newPassword: "NewPassword123!"
        }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log("✅ Password Changed:", changePwdRes.data.message);

        // 5. Test login with new password
        console.log("\n5. Testing Login with New Password...");
        const newLoginRes = await axios.post(`${BASE_URL}/login`, {
            email: "test@shreejisevabhav.com",
            password: "NewPassword123!"
        });
        console.log("✅ Login with New Password Successful");
        accessToken = newLoginRes.data.data.accessToken;

        // 6. Logout
        console.log("\n6. Testing Logout...");
        const logoutRes = await axios.post(`${BASE_URL}/logout`, {}, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log("✅ Logout Successful:", logoutRes.data.message);

        // 7. Delete Account
        console.log("\n7. Testing Delete Account...");
        const deleteRes = await axios.delete(`${BASE_URL}/delete-account`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log("✅ Account Deleted:", deleteRes.data.message);

        // 8. Verify Account Deleted
        console.log("\n8. Verifying Account is Deleted (Should Fail Login)...");
        try {
            await axios.post(`${BASE_URL}/login`, {
                email: "test@shreejisevabhav.com",
                password: "NewPassword123!"
            });
            console.log("❌ Login succeeded, but it should have failed.");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("✅ Login failed as expected. Account completely deleted.");
            } else {
                console.log("❌ Unexpected error:", error.message);
            }
        }

        console.log("\n🎉 ALL V1 AUTHENTICATION TESTS PASSED SUCCESSFULLY! 🎉");

    } catch (error) {
        console.error("\n❌ Test Failed!");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

runTests();
