import { useEffect, useState } from "react";
import { Search, ShoppingBag, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import severance from "../../assets/sev.jpg";
import { fetchGameDeals, searchGames } from "@/Services/Games";
import SearchResults from "./searchResults";
import { Game } from "@/models/Game";
import { GameDeal } from "../../models/GameDeal";

const gameData: GameDeal[] = [];

export default function GameSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topDealsResults, setTopDeals] = useState(gameData);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch top deals on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGameDeals();
        setTopDeals(data);
      } catch (error) {
        console.error("Error fetching game deals:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Trigger API when debounce is done
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await searchGames(debouncedQuery);
        setSearchResults(data);
      } catch (error) {
        console.error("Error searching for games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery]);

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

        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-2xl">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <Search className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
            <Input
              type="text"
              placeholder="Start typing to search for games..."
              className="w-full h-14 pl-12 pr-12 text-lg rounded-lg border-2 card text-white placeholder:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
              <Button
                variant={"outline"}
                size="icon"
                className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center gap-1"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                }}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Clear</span>
              </Button>
            )}
          </div>
        </form>
      </div>

      {searchResults.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-4xl z-50">
          <SearchResults games={searchResults} />
        </div>
      )}

      {/* Top Deals Section */}
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
