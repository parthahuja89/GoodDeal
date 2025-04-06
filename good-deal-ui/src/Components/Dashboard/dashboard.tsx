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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <div className="flex h-full flex-col">
        <div className="header flex justify-between p-4">
          <h1 className="text-2xl font-bold">Discover</h1>
          <Button onClick={() => setOpen(true)} className="gap-2">
            <Search size={12} />
            Search ({navigator.userAgent.includes("Mac") ? "⌘" : "Ctrl"} + K)
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

        <div className="flex justify-center flex-grow">
          <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full p-4">
            <Card className="col-span-3 row-span-5">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  Popular Games
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="col-span-2 row-span-3 col-start-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  Anticipated Games
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="col-span-2 row-span-2 col-start-4 row-start-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  Top Deals
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
