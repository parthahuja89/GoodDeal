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
} from "@/components/ui/command"


import {
  Card,
  CardContent,
  CardDescription
} from "@/components/ui/card";
import { SecondaryButton } from "../ui/buttons/buttonVariants";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex justify-center ">
      <Card className="bg-neutral-900 text-white border-neutral-800 w-3/5 h-[40vh] shadow-xl">
        <CardContent>
          <CardDescription className="mt-20 font-bold text-xl text-slate-200 flex gap-2 flex-col items-center justify-center">
            Authenticating
            <Button onClick={toggleTheme} className="mt-4">
              {theme === "dark" ? (
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" /> Light Mode
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4" /> Dark Mode
                </div>
              )}
            </Button>
          </CardDescription>
        </CardContent>
      </Card>

      <Button variant="secondary" onClick={() => setOpen(true)}>
        {" "}
        <Search />
        Search (Cmd + K)
      </Button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="border-slate-600">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

