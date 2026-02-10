const { supabase } = require('../db/connectToSupaBase');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // Verify the token with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('Auth Middleware Error:', error);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (err) {
        console.error('Auth Middleware Server Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = authMiddleware;
