import { useEffect, useState, useRef } from "react";
import { Search, ShoppingBag, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGameDeals, searchGames } from "@/Services/Games";
import SearchResults from "./searchResults";
import { Game } from "@/models/Game";
import GameDeal from "../../models/GameDeal";
import GameCard from "./GameCard";
import { RootState } from "@/store/redux";
import { useSelector } from "react-redux";

const gameData: GameDeal[] = [];

export default function GameSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topDealsResults, setTopDeals] = useState(gameData);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingTopDeals, setIsLoadingTopDeals] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const userData = useSelector((state: RootState) => state.user.userData);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Fetch top deals on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingTopDeals(true);
        const data = await fetchGameDeals();
        setTopDeals(data);
        setIsLoadingTopDeals(false);
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
        setShowResults(false);
        setIsLoadingSearch(false);
        return;
      }

      try {
        setIsLoadingSearch(true);
        const data = await searchGames(debouncedQuery);
        setSearchResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Error searching for games:", error);
      } finally {
        setIsLoadingSearch(false);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery]);

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12  text-gray-100 min-h-screen">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 tracking-tight text-white select-none">
          Hi {userData.Firstname}, Let&apos;s find you a{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Good deal.
            </span>
          </span>
        </h1>

        <div ref={searchContainerRef} className="w-full max-w-2xl relative">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <AnimatePresence mode="wait">
                  {isLoadingSearch ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
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
                onFocus={handleInputFocus}
              />

              {searchQuery && (
                <Button
                  variant={"outline"}
                  size="icon"
                  className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center gap-1"
                  onClick={handleClearSearch}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Clear</span>
                </Button>
              )}
            </div>
          </form>

          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full z-50">
              <SearchResults games={searchResults} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Top Game Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoadingTopDeals
            ? Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="flex flex-col space-y-11">
                  <Skeleton className="h-[125px] w-full rounded-xl mb-2 bg-gray-600" />
                  <div className="space-y-2 ">
                    <Skeleton className="h-4 w-2/3 bg-gray-600" />
                    <Skeleton className="h-4 w-1/2 bg-gray-600" />
                    <Skeleton className="h-4 w-1/3 bg-gray-600" />
                  </div>
                </div>
              ))
            : topDealsResults.map((game, idx) => (
                <GameCard key={idx} game={game} index={idx} />
              ))}
        </div>
      </div>
    </div>
  );
}