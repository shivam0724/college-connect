"use client"

import * as React from "react"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/shadcn/ui//dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/shadcn/ui//sidebar"
import Link from "next/link";
import { useSession } from "next-auth/react";

export function LogoHeader({ info }) {
  const { data: session } = useSession();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link href={`/${session?.role}`}>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <info.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{info.name}</span>
                  <span className="truncate text-xs">{info.plan}</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
