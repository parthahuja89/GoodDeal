import React from "react";
import { Button } from "../ui/button";
import { ClapperboardIcon, LogIn, Info } from "lucide-react";

export default function Navbar() {
  return (
    <header className="">
      <nav className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <ClapperboardIcon className="h-8 w-8 text-purple-500" />
          <span className="text-2xl select-none font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Movie Recs
          </span>
        </div>
        <div className="space-x-2">
          <Button variant="secondary">
            Learn More
            <Info className="h-5 w-5" />
          </Button>
          <Button className="mt-10" onClick={()=>window.location.href="/login"}>
            Login
            <LogIn className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
