const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL) {
  console.warn('Missing SUPABASE_URL in environment; Supabase client cannot be created.')
}

if (!SUPABASE_ANON_KEY) {
  console.warn('Missing SUPABASE_ANON_KEY in environment; auth flows from server may fail.')
}

// Public client: safe for server-side auth flows (sign-in/sign-up) — do NOT expose anon key to browsers
const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '')

// Admin client: created only if service role key is provided. Use this for privileged/admin actions.
let supabaseAdmin = null
if (SUPABASE_SERVICE_ROLE_KEY) {
  supabaseAdmin = createClient(SUPABASE_URL || '', SUPABASE_SERVICE_ROLE_KEY)
  console.log('Supabase admin client created (service role key loaded)')
}

console.log('Supabase client(s) initialized')

module.exports = { supabase, supabaseAdmin }