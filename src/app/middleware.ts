// app/middleware.ts
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { auth } from '@/lib/firebase/init'; // Adjust your path

export function middleware(request: any) {
    const user = auth.currentUser; // Get the current user

    // Check if the user is logged in
    if (!user) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'], // Apply middleware to dashboard routes
};
