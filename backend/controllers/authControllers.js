const supabase = require('../db/connectToSupaBase');

const userSignUp = async (req, res) => {
    try {
        const { name,email, password,phone_no,wallet_balance, } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const { data, error } = await supabase.auth.signUp({
            name,
            email,
            password,
            phone_no,
            wallet_balance, 
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(201).json({ message: "User created successfully", data });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ error: error.message });
        }

        return res.status(200).json({ message: "Login successful", data });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const userLogOut = async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {  
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    userSignUp,
    userSignIn,
    userLogOut
};
