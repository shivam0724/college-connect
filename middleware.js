import { NextResponse } from 'next/server'
import { auth } from './auth'

export default async function middleware(request) {
    const { pathname } = request.nextUrl;
    const session = await getSession();

    const base = String(pathname).split("/")[1];
    const isLogged = isAuthenticated(session);

    if (!isLogged && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    const role = session?.role;

    if (pathname === '/login' && isLogged) {
        return NextResponse.redirect(new URL(`/${role}`, request.url))
    }

    if (base === 'student' && role !== 'student') {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (base === 'faculty') {
        if(role !== 'faculty'){
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (pathname === '/api/files') {
        if (!isLogged) {
            return NextResponse.json({ error: "Unauthorised access detected." }, { status: 401 });
        }

        if (role !== 'faculty') {
            return NextResponse.json({ error: "Forbidden access." }, { status: 403 });
        }

        return NextResponse.next();
    }

    console.log('[middleware.js]: ', { pathname, base, id: session?.id, role: session?.role });

    return NextResponse.next();
}

async function getSession() {
    return await auth();
}

function isAuthenticated(session) {
    return session && session?.id && session?.role;
}

export const config = {
    matcher: ['/faculty/:path*', '/student/:path*', '/login', '/api/files'],
}