import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"; // Import useTheme hook
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription
} from "@/components/ui/card";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex justify-center"> 

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
    </div>
  );
}

