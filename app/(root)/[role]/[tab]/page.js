"use client";
import React from 'react'
import { TT, Notices, Assignments, Groupchat, Livechat, Notes, Quiz, Faculties } from '@/components/dashboard/DashboardImports';
import { notFound } from 'next/navigation';
import Profile from '@/components/dashboard/Profile';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Privatechat from '@/components/dashboard/Privatechat';

const page = () => {
    const { role, tab } = useParams();
    const { data: session, status } = useSession({ required: true });

    const tabs = {
        notices: <Notices role={role} session={session} />,
        timetable: <TT role={role} session={session} />,
        assignments: <Assignments role={role} session={session} />,
        quiz: <Quiz role={role} session={session} />,
        livechat: <Livechat role={role} session={session} />,
        groupchat: <Groupchat role={role} session={session} />,
        notes: <Notes role={role} session={session} />,
        faculties: <Faculties role={role} session={session} />,
        profile: <Profile role={role} session={session} />,
        privatechat: <Privatechat role={role} session={session} />,
    };
    if (!tabs[tab]) {
        return notFound();
    }

    return tabs[tab];
}

export default page