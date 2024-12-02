"use client"

import * as React from "react"
import Link from 'next/link'
import { Home, Settings, HelpCircle, User, LogOut } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  user: {
    email: string;
    is_superuser?: boolean;
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  const items = [
    {
      title: "Home",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "My Notes",
      icon: HelpCircle,
      href: "/notes",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <Sidebar className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 text-white p-4 hidden lg:block">
      <SidebarHeader className="bg-gray-800 mb-4">
        <div className="space-y-1 bg-gray-800">
          <p className="text-sm font-medium leading-none">{user.email}</p>
          <p className="text-xs leading-none text-white">
            {user.is_superuser ? "Admin" : "User"}
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gray-800" >
        <SidebarMenu className="space-y-4">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto bg-gray-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/logout" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

