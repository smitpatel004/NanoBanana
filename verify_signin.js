const { supabase } = require('./backend/db/connectToSupaBase');
const { userSignIn } = require('./backend/controllers/authControllers');
const bcrypt = require('bcrypt');

async function testSignIn() {
    console.log("Starting testSignIn...");

    // Mock req and res
    const req = {
        body: {
            email: 'sahil26@gmail.com',
            password: 'sahil26'
        }
    };

    const res = {
        status: function (code) {
            this.statusCode = code;
            return this;
        },
        json: function (data) {
            this.data = data;
            console.log(`Response Status: ${this.statusCode}`);
            console.log("Response Data:", JSON.stringify(this.data, null, 2));
            return this;
        }
    };

    try {
        await userSignIn(req, res);
    } catch (error) {
        console.error("Test execution failed:", error);
    }
}

// Note: This test requires SUPABASE_URL and SUPABASE_ANON_KEY to be set in backend/.env
// and the user 'sahil26@gmail.com' with password 'sahil26' to exist in the 'users' table.
testSignIn();
