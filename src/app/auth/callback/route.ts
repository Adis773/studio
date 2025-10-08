
import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/app'

  if (code) {
    const supabase = createClient()
    // By setting pkce_code_verifier to null, we disable PKCE check for this server-side flow.
    // This is a common solution for environments where PKCE state management can be unreliable.
    const { error } = await supabase.auth.exchangeCodeForSession(code, { pkce_code_verifier: null });
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
}
