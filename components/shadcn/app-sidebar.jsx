"use client"

import * as React from "react"
import { AudioWaveform, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart } from "lucide-react"
import { NavSub } from "@/components/shadcn/nav-sub"
import { NavUser } from "@/components/shadcn//nav-user"
import { LogoHeader } from "@/components/shadcn/logo-header"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/shadcn/ui//sidebar"

export function AppSidebar({ user, role, ...props }) {
  const tabs = [
    {
      label: "Chat",
      subheadings: [
        {
          name: "Group Chat",
          url: `${`/${role}/groupchat`}`,
          icon: AudioWaveform,
        },
        {
          name: "Live Chat",
          url: `${`/${role}/livechat`}`,
          icon: Command,
        },
      ],
    },
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
      ]
    }
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoHeader info={{ name: "College Connect", logo: GalleryVerticalEnd, plan: "student" }} />
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
