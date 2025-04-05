import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes"; // Import useTheme hook
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { SecondaryButton } from "../ui/buttons/buttonVariants";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">Discover</h1>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Search size={12} />
          Search ({navigator.platform.includes("Mac") ? "⌘" : "Ctrl"} + K)
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList className="border-slate-600">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Search game</CommandItem>
              <CommandItem>Account settings</CommandItem>
              <CommandItem>Watchlist</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        </div>
      ))}
      </div>
    </div>
    </>
  );
}
