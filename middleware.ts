import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Get the token from cookies
    const token = req.cookies.get('token')?.value; // Extract string value

    // List of routes that require authentication
    const protectedRoutes = ['/dashboard'];

    // If the user is not authenticated and tries to access a protected route, redirect to login
    if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If authenticated or not accessing a protected route, continue
    return NextResponse.next();
}

// Apply middleware to the specific paths
export const config = {
    matcher: ['/dashboard/:path*'],  // Matches /dashboard and its sub-routes
};
