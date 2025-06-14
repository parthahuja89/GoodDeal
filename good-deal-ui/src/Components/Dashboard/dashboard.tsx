"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Search, ShoppingBag, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGameDeals, searchGames } from "@/Services/Games";
import SearchResults from "./searchResults";
import type { Game } from "@/models/Game";
import type GameDeal from "../../models/GameDeal";
import GameCard from "./GameCard";
import type { RootState } from "@/store/redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const gameData: GameDeal[] = [];

export default function GameSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topDealsResults, setTopDeals] = useState(gameData);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingTopDeals, setIsLoadingTopDeals] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const userData = useSelector((state: RootState) => state.user.userData);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => {
    const activeDeals = topDealsResults.length;

    const dealsWithDiscount = topDealsResults.filter(
      (game) =>
        game.price_regular &&
        game.price_new &&
        game.price_regular > game.price_new
    );

    const totalDiscount = dealsWithDiscount.reduce((sum, game) => {
      const discount =
        ((game.price_regular! - game.price_new!) / game.price_regular!) * 100;
      return sum + discount;
    }, 0);

    const avgDiscount =
      dealsWithDiscount.length > 0
        ? Math.round(totalDiscount / dealsWithDiscount.length)
        : 0;

    const totalSavings = dealsWithDiscount.reduce((sum, game) => {
      return sum + (game.price_regular! - game.price_new!);
    }, 0);

    return [
      {
        label: "Active Deals",
        value: activeDeals.toString(),
        change: activeDeals > 0 ? `+${Math.min(activeDeals, 99)}` : "0",
      },
      {
        label: "Avg. Discount",
        value: avgDiscount > 0 ? `${avgDiscount}%` : "0%",
        change: avgDiscount > 0 ? `+${Math.min(avgDiscount, 99)}%` : "0%",
      },
      {
        label: "Total Savings",
        value: totalSavings > 0 ? `$${Math.round(totalSavings)}` : "$0",
        change:
          dealsWithDiscount.length > 0
            ? `${dealsWithDiscount.length} games`
            : "0 games",
      },
    ];
  }, [topDealsResults]);

  // Fetch top deals on initial load
  useEffect(() => {
    const cached = sessionStorage.getItem("topDeals");
    if (cached) {
      setTopDeals(JSON.parse(cached));
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoadingTopDeals(true);
        const data = await fetchGameDeals();
        sessionStorage.setItem("topDeals", JSON.stringify(data));

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
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        </div>

        <div className="relative container mx-auto px-4 py-16">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                Hi {userData?.Firstname},{" "}
                <span className="block">
                  Let's find you a{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 text-transparent bg-clip-text">
                    Good deal.
                  </span>
                </span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Discover the best gaming deals across all platforms. Save big on
                your favorite titles.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto"
            >
              {isLoadingTopDeals
                ? // Loading skeletons for stats
                  Array.from({ length: 3 }).map((_, index) => (
                    <Card
                      key={index}
                      className="bg-zinc-800/30 backdrop-blur-md border-zinc-700/50"
                    >
                      <CardContent className="p-4 text-center">
                        <Skeleton className="h-8 w-16 mx-auto mb-2 bg-zinc-700/50" />
                        <Skeleton className="h-4 w-20 mx-auto mb-1 bg-zinc-700/50" />
                        <Skeleton className="h-3 w-12 mx-auto bg-zinc-700/50" />
                      </CardContent>
                    </Card>
                  ))
                : stats.map((stat, index) => (
                    <Card
                      key={index}
                      className="bg-zinc-800/30 backdrop-blur-md border-zinc-700/50"
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-sm text-zinc-400">
                          {stat.label}
                        </div>
                        <div className="text-xs text-green-400">
                          {stat.change}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              ref={searchContainerRef}
              className="w-full max-w-3xl mx-auto relative"
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-zinc-800/80 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-2">
                    <div className="flex items-center">
                      <span className="absolute left-6 text-zinc-400">
                        <AnimatePresence mode="wait">
                          {isLoadingSearch ? (
                            <motion.div
                              key="loader"
                              initial={{ opacity: 0, rotate: 0 }}
                              animate={{ opacity: 1, rotate: 360 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Loader2 className="h-5 w-5 animate-spin" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="search"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Search className="h-5 w-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </span>
                      <Input
                        type="text"
                        placeholder="Start typing to search for games..."
                        className="w-full h-14 pl-14 pr-14 text-lg bg-transparent border-0 text-white placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleInputFocus}
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 h-10 w-10 text-zinc-400 hover:text-white hover:bg-zinc-700"
                          onClick={handleClearSearch}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>

              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-4 w-full z-50">
                  <SearchResults games={searchResults} />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Smooth gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-zinc-900" />
      </div>

      {/* Main Content */}
      <div className="relative bg-zinc-900">
        <div className="container mx-auto px-4 pb-16">
          {/* Categories and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Top Game Deals
                </h2>
                <p className="text-zinc-400">Best deals on trending games</p>
              </div>
            </div>

            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {isLoadingTopDeals
                    ? Array.from({ length: 12 }).map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="group"
                        >
                          <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50 overflow-hidden hover:bg-zinc-800/30 transition-all duration-300">
                            <div className="aspect-[16/9] relative">
                              <Skeleton className="w-full h-full bg-zinc-700/50" />
                            </div>
                            <CardContent className="p-4 space-y-3">
                              <Skeleton className="h-5 w-3/4 bg-zinc-700/50" />
                              <div className="flex items-center justify-between">
                                <Skeleton className="h-6 w-16 bg-zinc-700/50" />
                                <Skeleton className="h-4 w-12 bg-zinc-700/50" />
                              </div>
                              <div className="flex gap-2">
                                <Skeleton className="h-8 flex-1 bg-zinc-700/50" />
                                <Skeleton className="h-8 flex-1 bg-zinc-700/50" />
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    : topDealsResults.map((game, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="group"
                        >
                          <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50 overflow-hidden hover:bg-zinc-800/30 hover:border-zinc-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10">
                            <div className="aspect-[16/9] relative overflow-hidden">
                              {game.asset_url ? (
                                <img
                                  src={game.asset_url || "/placeholder.svg"}
                                  alt={game.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full bg-zinc-700/50 flex items-center justify-center">
                                  <span className="text-zinc-400 text-sm">
                                    No Image
                                  </span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <CardContent className="p-4 space-y-3">
                              <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-purple-300 transition-colors">
                                {game.title}
                              </h3>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-green-400">
                                    ${game.price_new?.toFixed(2) || "N/A"}
                                  </span>
                                  {game.price_regular &&
                                    game.price_regular > game.price_new && (
                                      <span className="text-sm text-zinc-400 line-through">
                                        ${game.price_regular.toFixed(2)}
                                      </span>
                                    )}
                                </div>
                                {game.price_regular &&
                                  game.price_regular > game.price_new && (
                                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                                      -
                                      {Math.round(
                                        ((game.price_regular - game.price_new) /
                                          game.price_regular) *
                                          100
                                      )}
                                      %
                                    </Badge>
                                  )}
                              </div>
                              <div className="flex gap-2">
                                <Link to={`/game/${game.id}`}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-white text-xs"
                                  >
                                    More Info
                                  </Button>
                                </Link>
                                <Button
                                  size="sm"
                                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs"
                                  onClick={() =>
                                    game.url && window.open(game.url, "_blank")
                                  }
                                >
                                  Buy Now
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                </div>
              </TabsContent>

              <TabsContent value="trending" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {topDealsResults.slice(0, 8).map((game, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group"
                    >
                      <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50 overflow-hidden hover:bg-zinc-800/30 hover:border-zinc-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10">
                        <GameCard game={game} index={idx} />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bestsellers" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {topDealsResults.slice(0, 6).map((game, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group"
                    >
                      <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50 overflow-hidden hover:bg-zinc-800/30 hover:border-zinc-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10">
                        <GameCard game={game} index={idx} />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Featured Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border-purple-500/20 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Get good deals on your steam wishlist
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      Link your steam wishlist and get the best deals.
                    </p>
                    <Link to="/steam-deals">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Get Started
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-purple-500/30 text-purple-400"
                    >
                      New Feature
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
