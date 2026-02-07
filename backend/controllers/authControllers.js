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
            console.log("Signup Error:", error);
            return res.status(400).json({ error: error.message });
        }

        // If email confirmation is ON, user may be null initially
        if (!data?.user) {
            return res.status(200).json({
                message: "Signup successful. Please verify your email.",
            });
        }

        // 🗄️ Step 2 — Insert user into your custom table
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { error: insertError } = await supabase.from("users").insert({
            id: data.user.id,     // IMPORTANT: match auth user id
            name: name,
            email: email,
            password_hash: hashedPassword
        });

        if (insertError) {
            console.log("DB Insert Error:", insertError);
            return res.status(400).json({ error: insertError.message });
        }

        // ✅ Success response
        return res.status(201).json({
            message: "User created successfully",
            user: data.user,
        });

    } catch (err) {
        console.error("Signup Server Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};




const userSignIn = async (req, res) => {
    console.log("userSignIn called with body:", req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // 1. Verify password against your custom 'users' table first
        const { data: userRecord, error: fetchError } = await supabase
            .from('users')
            .select('password_hash')
            .eq('email', email)
            .single();

        if (fetchError || !userRecord) {
            return res.status(401).json({ error: 'Invalid email or password (custom check)' });
        }

        const isPasswordValid = await bcrypt.compare(password, userRecord.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password (custom check)' });
        }

        // 2. If valid, proceed to get Supabase session
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
