import { Calendar, Stars, AudioLines, Search, Settings, UserRound, CircleUser } from "lucide-react";

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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "./ui/button";

// Menu items.
const items = [
  {
    title: "Search",
    url: "search",
    icon: Search,
  },
  {
    title: "Discover",
    url: "home",
    icon: Stars,
  },
  {
    title: "Watchlist",
    url: "settings",
    icon: AudioLines,
  },
  {
    title: "Account Settings",
    url: "settings",
    icon: Settings,
  },
  
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="mt-5">
        <SidebarGroup>
          <SidebarGroupContent>
          <SidebarTrigger className="w-full" />
            <SidebarMenu className="mt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-2 last:mb-0">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon size={70} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex items-center">
        <Button
        variant="ghost"
        className="w-full"
          onClick={() => {
            console.log("User logged out");
          }}
        >
        <CircleUser size={20}/>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
