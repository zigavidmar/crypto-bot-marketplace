import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { supabaseClient } from './utils/supabase/client';

// Protected url routes
const protectedRoutes = [
  "/auth",
  "/dashboard"
]

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const { pathname } = request.nextUrl;

  // Check if the current route is protected
  if (protectedRoutes.some(route => pathname.includes(route))) {
    const { data: { user } } = await updateSession(request);

    /* 
      If the user is not logged in and the current route is not the sign-in page,
      redirect the user to the sign-in page.
    */
    if (!user && pathname !== '/auth/sign-in') {
      return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl).toString())
    }

    if (user) {
      // Fetch user profile data including tenant ID
      const { data: userProfile, error: profileError } = await supabaseClient
        .from('users')
        .select('id, email, first_name, last_name, tenant_id(id, api_key)')
        .eq('id', user.id)
        .single()


      if (profileError) {
        console.error('Error fetching user profile:', profileError)
        return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl).toString())
      }

      // If the user is logged in and the current route is the sign-in page,
      // redirect the user to the home page.
      if (pathname === '/auth/sign-in') {
        return NextResponse.redirect(new URL('/', request.nextUrl).toString())
      }

      // Add user profile data to request headers
      res.headers.set('x-user-id', userProfile.id)
      res.headers.set('x-user-email', userProfile.email)
      res.headers.set('x-tenant-id', userProfile.tenant_id.id)
      res.headers.set('x-tenant-api-key', userProfile.tenant_id.api_key)

      return res
    }
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