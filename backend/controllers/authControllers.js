const { supabase } = require('../db/connectToSupaBase');

const userSignUp = async (req, res) => {
    try {
        const { name, email, password, phone_no, wallet_balance } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Pass profile fields in the second (options) parameter under `data` so they become user_metadata
        const { data, error } = await supabase.auth.signUp(
            { email, password },
            { data: { name, phone_no, wallet_balance } }
        );

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Depending on your Supabase project settings, the user may need to confirm email.
        return res.status(201).json({ message: 'User created successfully', data });
    } catch (err) {
        console.error('userSignUp error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const userSignIn = async (req, res) => {
    console.log("userSignIn called with body:", req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return res.status(401).json({ error: error.message });
        }

        // data contains session and user; return session to client so frontend can store it
        return res.status(200).json({ message: 'Login successful', data });
    } catch (err) {
        console.error('userSignIn error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const userLogOut = async (req, res) => {
    try {
        // If you want to sign out a specific session sent by client, you should accept the access token
        // in Authorization header and revoke it via admin client. Here we call signOut on the server client
        // which will only clear server-side session if present.
        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        console.error('userLogOut error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    userSignUp,
    userSignIn,
    userLogOut,
};
