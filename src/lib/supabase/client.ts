
import { createBrowserClient } from '@supabase/ssr'

// IMPORTANT: The environment variables are set in the .env file.
// NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY
// They are not available in this file, but are in the browser.

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
