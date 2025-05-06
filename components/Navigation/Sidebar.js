"use client";
import { AppSidebar } from "@/components/shadcn/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/shadcn/ui/breadcrumb"
import { Separator } from "@/components/shadcn/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/shadcn/ui/sidebar"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react";

export default function Sidebar({ children, session, role }) {
    const pathname = usePathname();

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
        name: session?.name,
        email: session?.email,
        avatar: session?.picture,
        role: session?.role,
    }
    return (
        <SidebarProvider>
            <AppSidebar tabs={tabs} user={user} role={role} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block text-gray-800">
                                    <BreadcrumbLink href={`/${role}`} className="text-gray-800 hover:text-gray-800">
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbLink href={`${pathname}`} className="text-gray-800 hover:text-gray-800">
                                    {!pathname.split("/").slice(-1)[0].includes(["student", "faculty"]) && pathname.split("/").slice(-1)[0].replace(/-/g, " ")}
                                </BreadcrumbLink>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-slate-100 scroll">
                    <div className="bg-white h-full px-6 py-4 m-6 rounded-lg shadow-md text-slate-950 max-sm:m-0 max-sm:mt-4">
                        <div className='h-full flex flex-col items-center overflow-y-auto min-[768px]:max-w-[calc(100vw-24rem)]'>
                            {children}
                        </div>
                    </div>
                    {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
