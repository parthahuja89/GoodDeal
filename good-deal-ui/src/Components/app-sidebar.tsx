"use client";

import {
  Search,
  Settings,
  ListChecksIcon as ListCheck,
  CircleUser,
  LogOut,
  ChevronUp,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import type { RootState } from "../store/redux";
import { Link } from "react-router-dom";
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Search",
    url: "home",
    icon: Search,
  },
  {
    title: "Steam Deals",
    url: "steam-deals",
    icon: ListCheck,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const userData = useSelector((state: RootState) => state.user.userData);
  const { open } = useSidebar();

  return (
    <>
      <div className="fixed top-0 start-0 z-50 bg-background border-none flex md:hidden">
        <SidebarTrigger className="w-full p-4" />
      </div>
      <Sidebar collapsible="icon">
        <span
          className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 ${
            open ? "p-4 text-xl" : "p-3 text-md"
          }`}
        >
          {open ? "Good Deals" : "GD"}
        </span>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="mb-2">
                  <SidebarMenuButton asChild>
                    <SidebarTrigger className="w-full justify-start"></SidebarTrigger>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="mb-2 last:mb-0">
                    <SidebarMenuButton asChild>
                      <Link to={`/${item.url}`}>
                        <item.icon size={160} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start gap-2 h-auto p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center"
                >
                  <Avatar className="h-8 w-8 border-2 border-purple-500">
                    <AvatarImage
                      src={userData.picture_url || "/placeholder.svg"}
                      alt={`${userData.Firstname} ${userData.Lastname}`}
                    />
                    <AvatarFallback className="bg-purple-100 text-purple-800">
                      {userData.Firstname ? (
                        userData.Firstname[0]
                      ) : (
                        <CircleUser className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left group-data-[collapsible=icon]:hidden">
                    <span className="font-medium text-sm">
                      {userData.Firstname} {userData.Lastname}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {userData.email || "User"}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4 shrink-0 opacity-50 group-data-[collapsible=icon]:hidden" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col justify-start gap-2 p-2 group-data-[collapsible=icon]:block">
                  <div className="font-medium">
                    {userData.Firstname} {userData.Lastname}
                  </div>
                  <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {userData.email}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/settings"
                    className="flex cursor-pointer items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500 cursor-pointer"
                  onClick={() => {
                    document.cookie.split(";").forEach((cookie) => {
                      document.cookie = cookie
                        .replace(/^ +/, "")
                        .replace(
                          /=.*/,
                          `=;expires=${new Date(0).toUTCString()};path=/`
                        );
                    });
                    window.location.reload();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
