"use client"

import * as React from "react"
import { AudioWaveform, Bot, Command, Frame, GalleryVerticalEnd, Map, MessageSquareLock, PieChart, Users } from "lucide-react"
import { NavSub } from "@/components/shadcn/nav-sub"
import { NavUser } from "@/components/shadcn//nav-user"
import { LogoHeader } from "@/components/shadcn/logo-header"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/shadcn/ui//sidebar"
import { NavMain } from "./nav-main"

export function AppSidebar({ user, role, ...props }) {
  const tabs = [
    {
      label: "Academics",
      subheadings: [
        {
          name: "Notices",
          url: `${`/${role}/notices`}`,
          icon: Frame,
        },
        {
          name: "Time Table",
          url: `${`/${role}/timetable`}`,
          icon: Map,
        },
        {
          name: "Assignments",
          url: `${`/${role}/assignments`}`,
          icon: Map,
        },
        {
          name: "Notes",
          url: `${`/${role}/notes`}`,
          icon: PieChart,
        },
        {
          name: "Quiz",
          url: `${`/${role}/quiz`}`,
          icon: PieChart,
        },
        {
          name: "Teachers",
          url: `${`/${role}/faculties`}`,
          icon: Bot,
        },
      ],
    },
    {
      label: "Chat",
      subheadings: [
        {
          name: "Live Chat",
          url: `${`/${role}/livechat`}`,
          icon: Command,
        },
        {
          name: "Private Chat",
          url: `${`/${role}/privatechat`}`,
          icon: MessageSquareLock,
        },
        {
          name: "Group Chat",
          url: `${`/${role}/groupchat`}`,
          icon: Users,
        },
      ],
    },
  ]

  const tabs1 = [
    {
      label: "Academics",
      items: [
        {
          name: "Notices",
          url: `${`/${role}/notices`}`,
          icon: Frame,
        },
        {
          name: "Time Table",
          url: `${`/${role}/timetable`}`,
          icon: Map,
        },
        {
          name: "Assignments",
          url: `${`/${role}/assignments`}`,
          icon: Map,
        },
        {
          name: "Notes",
          url: `${`/${role}/notes`}`,
          icon: PieChart,
        },
        {
          name: "Quiz",
          url: `${`/${role}/quiz`}`,
          icon: PieChart,
        },
        {
          name: "Teachers",
          url: `${`/${role}/faculties`}`,
          icon: Bot,
        },
      ],
    },
    {
      label: "Chat",
      items: [
        {
          name: "Live Chat",
          url: `${`/${role}/livechat`}`,
          icon: Command,
        },
        {
          name: "Private Chat",
          url: `${`/${role}/privatechat`}`,
          icon: MessageSquareLock,
        },
        {
          name: "Group Chat",
          url: `${`/${role}/groupchat`}`,
          icon: Users,
        },
      ],
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoHeader info={{ name: "College Connect", logo: GalleryVerticalEnd, plan: role }} />
      </SidebarHeader>
      <SidebarContent>
        {tabs.map((item) => (
          <NavSub key={item.label} projects={item.subheadings} label={item.label} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}