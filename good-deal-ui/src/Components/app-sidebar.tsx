import {
  Calendar,
  Stars,
  AudioLines,
  Search,
  Settings,
  ListCheck,
  CircleUser,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "./ui/button";

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
  return (
    <>
      <div className="fixed top-0 start-0 z-50 bg-background border-none flex md:hidden">
        <SidebarTrigger className="w-full p-4"/>
      </div>
      <Sidebar collapsible="icon">
        <SidebarContent className="mt-5">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarTrigger className="w-full" />
              <SidebarMenu className="mt-5">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="mb-2 last:mb-0">
                    <SidebarMenuButton
                      asChild
                    >
                      <a href={`/${item.url}`}>
                        <item.icon size={160} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center"
            onClick={() => {
              console.log("User logged out");
            }}
          >
            <CircleUser size={20} className="min-w-[20px]" />
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
