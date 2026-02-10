const { supabase } = require('./db/connectToSupaBase');

(async () => {
    console.log("Testing Supabase Connection...");

    // 1. Test SignUp (will likely fail if user exists, which is fine, we just want to see a Supabase response)
    const testEmail = `test_${Date.now()}@example.com`;
    const testPassword = 'password123';

    console.log(`Attempting to sign up user: ${testEmail}`);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
    });

    if (signUpError) {
        console.error("SignUp Error:", signUpError.message);
    } else {
        console.log("SignUp Success:", signUpData.user ? "User created" : "Check email for confirmation");
    }

    // 2. Test SignIn
    console.log(`Attempting to sign in user: ${testEmail}`);
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
    });

    if (signInError) {
        console.error("SignIn Error:", signInError.message);
    } else {
        console.log("SignIn Success. Session obtained.");
    }

    // 3. Test Logout
    console.log("Attempting to sign out...");
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
        console.error("SignOut Error:", signOutError.message);
    } else {
        console.log("SignOut Success.");
    }

})();
