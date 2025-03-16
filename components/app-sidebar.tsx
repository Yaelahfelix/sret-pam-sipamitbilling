"use client"

import * as React from "react"
import {
  AudioWaveform,
  Book,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavLaporan } from "./nav-laporan"


const data = {
  teams: [
    {
      name: "SRET-PAM",
      logo: GalleryVerticalEnd,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
      
    },
    {
      title: "Calon Pel. PRetribusi",
      url: "/admin/capel-ret",
      icon: User,
    },
    {
      title: "Pel. PRetribusi",
      url: "/admin/pelanggan",
      icon: User,
    },
    {
      title: "Tarif",
      url: "/admin/tarif",
      icon: User,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: User,
    },
  ],
  laporan: [
    {
      title: "Calon Pel. PRetribusi",
      url: "/admin/cetakcalon-pungutan",
      icon: Book,
      isActive: true,
      
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavLaporan items={data.laporan} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
