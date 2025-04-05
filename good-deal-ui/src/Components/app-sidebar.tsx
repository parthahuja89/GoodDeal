import { Calendar, Stars, AudioLines, Search, Settings } from "lucide-react";

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

// Menu items.
const items = [
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
    <Sidebar
      collapsible="icon"
    >
      <SidebarContent className="mt-5">
      <SidebarGroup>
        <SidebarGroupContent>
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
      <SidebarTrigger className="w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}
