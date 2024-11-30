// main-sidebar.tsx
"use client";

import * as React from "react";
import { Home, Rocket, HelpCircle, Settings, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

interface MainSidebarProps {
  user: {
    email: string;
    is_superuser?: boolean;
  };
}

export function MainSidebar({ user }: MainSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">SmartHub</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="pb-6">
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 shadow-none"
            />
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                // href="/dashboard"
                isActive={pathname === "/dashboard"}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                // href="/how-to-use"
                isActive={pathname === "/how-to-use"}
              >
                <Rocket className="mr-2 h-4 w-4" />
                How to use
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                // href="/support"
                isActive={pathname === "/support"}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </SidebarMenuButton>
            </SidebarMenuItem>
            {user.is_superuser && (
              <SidebarMenuItem>
                <SidebarMenuButton
                //   href="/settings"
                  isActive={pathname === "/settings"}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}