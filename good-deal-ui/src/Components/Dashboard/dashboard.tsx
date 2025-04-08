import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Search, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes"; // Import useTheme hook

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TopDeals from "./topDeals";
import Popular from "./popular";

export default function Dashboard() {

  
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
    const { theme, setTheme } = useTheme();
    setTheme("dark");
  }, [])

  const layout = [
    {
      title: "Popular Games",
      content: <Popular />,
      className: " col-span-4 lg:col-span-2 row-span-4",
    },
    {
      title: "Top deals",
      content: <TopDeals />,
      className: "col-span-4 lg:col-span-2 row-span-4 lg:col-start-3",
    },
  ];

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-col ">
        <div className="header flex justify-between p-4">
          <h1 className="text-2xl font-bold">Discover</h1>

          <Button onClick={() => setOpen(true)} className="w-48 gap-2">
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
          <div className="grid grid-cols-4 grid-rows-4 gap-4 p-4 w-full">
            {layout.map((card, index) => (
              <Card key={index} className={card.className}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center justify-between gap-1">
                    {card.title}
                    <a className="cursor-pointer underline underline-offset-4 text-slate-300 text-sm flex items-center gap-1">
                      <span className="underline">Explore More Deals</span>{" "}
                      <ExternalLink size={15} />
                    </a>
                  </CardTitle>
                </CardHeader>
                {card.content && (
                  <CardContent className="flex justify-center items-center overflow-hidden">
                    {card.content}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
