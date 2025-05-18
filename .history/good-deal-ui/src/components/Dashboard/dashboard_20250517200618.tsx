"use client";

import type React from "react";
import { GameDeal } from "../../models/GameDeal";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import severance from "../../assets/sev.jpg";
import { fetchGameDeals } from "@/Services/Games";
import SearchResults from "./searchResults";

// Mock data for game search results
const gameData: GameDeal[] = [];

export default function GameSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topDealsResults, setTopDeals] = useState(gameData);

  const fetchData = async () => {
    try {
      const data = await fetchGameDeals();
      setTopDeals(data);
    } catch (error) {
      console.error("Error fetching game deals:", error);
    }
  };

  // Fetch game data from the API
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    console.log("Searching for:", searchQuery);
    e.preventDefault();
  };

  return (
    <div className="container mx-auto px-4 py-12  text-gray-100 min-h-screen">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 tracking-tight text-white select-none">
          Let&apos;s find you a{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Good deal.
            </span>
          </span>
        </h1>

        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for games..."
              className="w-full h-14 pl-4 pr-12 text-lg rounded-lg border-2 card text-white placeholder:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant={"outline"}
                size="icon"
                className="absolute right-2 top-2 h-10 w-10"
                onClick={() => {
                  setSearchQuery("");
                }}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
        </form>
      </div>
      {searchQuery && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-4xl z-50">
          <SearchResults />
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Top Game Deals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topDealsResults.map((game, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group bg-slate-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={game.asset_url || severance}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-2 text-gray-100 transition-colors">
                  {game.title}
                </h3>

                <div className="flex flex-col">
                  <span className="font-bold text-lg text-white">
                    <span className="text-orange-500 mr-1">|</span>$
                    {game.price_new}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ${game.price_regular}
                  </span>
                  <div className="flex items-end mt-10 gap-2 justify-end">
                    <Button
                      size="sm"
                      onClick={() => {
                        window.location.href = game.url;
                      }}
                    >
                      <ShoppingBag />
                      Get this deal
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => (window.location.href = `game/${game.id}`)}
                    >
                      More deals
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
