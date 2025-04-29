"use client";
// import React from 'react'

// const Sidebar = () => {
//     const role = "student"; //replace with role from session
//     const tabs = [
//         { name: "Notices", path: `/${role}/notices`, role: ["student", "faculty"] },
//         { name: "Time Table", path: `/${role}/timetable`, role: ["student", "faculty"] },
//         { name: "Assignments", path: `/${role}/assignments`, role: ["student", "faculty"] },
//         { name: "Quiz", path: `/${role}/quiz`, role: ["student", "faculty"] },
//         { name: "Live Chat", path: `/${role}/livechat`, role: ["student", "faculty"] },
//         { name: "Group Chat", path: `/${role}/groupchat`, role: ["student", "faculty"] },
//         { name: "Notes", path: `/${role}/notes`, role: ["student", "faculty"] },
//         { name: "Teachers", path: `/${role}/faculties`, role: ["student", "faculty"] }
//     ]
//     return (
//         <div className="w-48 bg-[#13202d] text-gray-50">
//             <div className="fji flex-col my-4 w-full gap-3 h-full">
//                 <div className="h-7">
//                     <span className="font-medium text-lg">
//                         <Link href={`/${role}`}>College Connect</Link>
//                     </span>
//                 </div>
//                 <div className="seprator h-[0.5px] bg-gray-300 block w-10/12"></div>
//                 <div className='fcji h-full w-full [&>div]:w-3/5 text-left'>
//                     <div className="h-[87%] whitespace-nowrap scroll flex flex-col gap-2">
//                         {tabs.map((tab, index) => {
//                             return (
//                                 <Link key={index} href={tab.path} className='whitespace-nowrap hover:bg-[#13202d] hover:opacity-60 cursor-pointer'>{tab.name}</Link>
//                             )
//                         })}
//                     </div>
//                     <div className='whitespace-nowrap hover:bg-[#13202d] hover:opacity-60 cursor-pointer'>
//                         <button className="ul cursor-pointer text-center w-11/12" type="button">Sign Out</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar

import { AppSidebar } from "@/components/shadcn/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/shadcn/ui/breadcrumb"
import { Separator } from "@/components/shadcn/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/shadcn/ui/sidebar"
import { useRouter } from "next/navigation"

export default function Sidebar({ children }) {
    const router = useRouter();
    const { pathname } = router;
    console.log('[Sidebar.js]: ', pathname);

    const role = "student"; //replace with role from session
    const tabs = [
        { name: "Notices", path: `/${role}/notices`, role: ["student", "faculty"] },
        { name: "Time Table", path: `/${role}/timetable`, role: ["student", "faculty"] },
        { name: "Assignments", path: `/${role}/assignments`, role: ["student", "faculty"] },
        { name: "Quiz", path: `/${role}/quiz`, role: ["student", "faculty"] },
        { name: "Live Chat", path: `/${role}/livechat`, role: ["student", "faculty"] },
        { name: "Group Chat", path: `/${role}/groupchat`, role: ["student", "faculty"] },
        { name: "Notes", path: `/${role}/notes`, role: ["student", "faculty"] },
        { name: "Teachers", path: `/${role}/faculties`, role: ["student", "faculty"] }
    ]
    const user = {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatar/avatar.svg",
    }
    return (
        <SidebarProvider>
            <AppSidebar tabs={tabs} user={user} role={role} />
            <SidebarInset>
                <header className="bg-[#13202d] flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 invert" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block text-gray-50">
                                    <BreadcrumbLink href={`/${role}`} className="text-gray-50 hover:text-gray-50">
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbLink href={`/${role}`} className="text-gray-50 hover:text-gray-50">
                                    {pathname}
                                </BreadcrumbLink>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-slate-100">
                    <div className='bg-white px-6 py-4 m-6 rounded-lg shadow-md text-slate-950 h-full flex flex-col items-center overflow-y-auto'>
                        {children}
                    </div>
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
