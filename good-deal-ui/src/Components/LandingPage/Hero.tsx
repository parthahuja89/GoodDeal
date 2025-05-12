import React from "react";
import { Button } from "../ui/button";
import { Info, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="text-center">
      {/* Smooth Fade-in Heading */}
      <motion.h1 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-5xl md:text-7xl font-bold text-white text-clip"
      >
        Video games are expensive. Game Deals makes it easy to find
        <span className="mx-2" />
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Cheap
        </span>
        <span className="mx-2" />
        Games.
      </motion.h1>

      
      <motion.h2 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
        className="text-xl md:text-2xl font-light text-slate-400 mt-5"
      >
        Dead simple to use. Search a game, and add it to your watchlist. You'll receive email notifications when the game goes on sale.
        You can also view the current best deals.
        This project is also completely free to use and open source. You can check out the code on{" "}
        <a
          href="https://github.com/partha-huja/GameWrecks"
          target="_blank"
          rel="noreferrer"
          className="text-blue-300"
        >
          GitHub
        </a>.
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
        className="flex justify-center gap-4"
      >
        <Button variant="secondary" className="mt-10">
          Learn More
          <Info className="h-5 w-5" />
        </Button>
        <Button className="mt-10" onClick={()=>window.location.href="/login"}>
          Login
          <LogIn className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}
