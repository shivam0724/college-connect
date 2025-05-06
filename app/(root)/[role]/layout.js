"use client";

import React, { useEffect } from 'react';
import Sidebar from '@/components/Navigation/Sidebar';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Layout = ({ children }) => {
    const { data: session, status } = useSession({ required: true });
    const router = useRouter();
    const { role } = useParams();

    useEffect(() => {
        // console.log('[layout.js]: ', session, status);
        if (status === "loading") return;
        if (status === "unauthenticated") {
            router.push("login");
        }
    }, [session, status])

    useEffect(() => {
        if (status !== "loading" && session && role.toLowerCase() !== session?.role) {
            router.push(`/${session?.role}/profile`);
        }
    }, [role, session, status])

    return (
        <div className="flex min-h-screen">
            <Sidebar children={children} session={session} role={role}/>
        </div>
    );
};

export default Layout;