
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { updateSession } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // This creates a Supabase client that can be used to check if the user is
    // authenticated.
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { response, newSession } = await updateSession(request)

    // Refreshing the session cookie
    if (newSession) {
      const res = NextResponse.next({
        request: {
          headers: request.headers,
        },
      })
      // Set the new session cookie
      // You might need to adjust the cookie options depending on your setup
      res.cookies.set('sb-access-token', newSession.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })
      res.cookies.set('sb-refresh-token', newSession.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })
      return res
    }

    // If the user is not authenticated and is trying to access a protected
    // route, redirect them to the login page.
    if (!user && request.nextUrl.pathname.startsWith('/app')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // If the user is authenticated and is trying to access an auth route
    // (e.g., login, signup), redirect them to the app page.
    if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
        return NextResponse.redirect(new URL('/app', request.url))
    }

    return response
  } catch (e) {
    // If you are running locally, you may have issues with the Supabase client
    // failing to initialize due to the environment variables not being set.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
