import React from 'react'
import { TT, Notices, GC, LiveChat, Notes, Quiz, Faculties, Assignments } from '@/components/faculty/FacultyImports';
import { notFound } from 'next/navigation';

const page = async ({ params }) => {
    const tab = (await params).tab.toLowerCase();
    const tabs = {
        notices: <Notices />,
        assignments: <Assignments />,
        timetable: <TT />,
        quiz: <Quiz />,
        livechat: <LiveChat />,
        groupchat: <GC />,
        notes: <Notes />,
        faculties: <Faculties />,
    };
    if (!tabs[tab]) {
        return notFound();
    }

    return tabs[tab];
}

export default page

// { name: "Notices", path: "/student/notices" },
//         { name: "Time Table", path: "/student/timetable" },
//         { name: "Assignments", path: "/student/assignments" },
//         { name: "Quiz", path: "/student/quiz" },
//         { name: "Live Chat", path: "/student/livechat" },
//         { name: "Group Chat", path: "/student/groupchat" },
//         { name: "Notes", path: "/student/notes" },
//         { name: "Teachers", path: "/student/teachers" }