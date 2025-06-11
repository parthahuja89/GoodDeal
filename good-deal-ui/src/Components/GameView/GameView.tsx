"use client";

import { useEffect, useState } from "react";
import {
  ArrowBigLeft,
  Loader2,
  Share2,
  Clock,
  Users,
  MonitorSmartphone,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { fetchGame, fetchGameDealsById } from "@/Services/Games";
import type { Game } from "@/models/Game";
import type GameDeal from "@/models/GameDeal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import DealsTable from "./DealsTable";
import { Toaster } from "../ui/toaster";

function getRatingColor(percentage: number) {
  if (percentage <= 30) {
    return "bg-red-500";
  } else if (percentage > 30 && percentage <= 65) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
}

export default function GameView() {
  const { game_id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [deals, setDeals] = useState<GameDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [animatedWidths, setAnimatedWidths] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { toast } = useToast();

  const totalPages = Math.ceil(deals.length / itemsPerPage);

  const getCurrentPageDeals = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return deals.slice(startIndex, endIndex);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        description: "Share link copied to clipboard",
        duration: 1300,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        variant: "destructive",
        description: "Failed to copy link",
      });
    }
  };

  function loadGame(game_id: string) {
    if (game_id) {
      setLoading(true);

      const gamePromise = fetchGame(game_id);
      const dealsPromise = fetchGameDealsById(game_id);

      Promise.all([gamePromise, dealsPromise])
        .then(([gameData, gameDeals]) => {
          setGame(gameData);
          setAnimatedWidths(new Array(gameData?.reviews?.length || 0).fill(0));
          setDeals(gameDeals);
        })
        .catch((error) => {
          console.error("Error loading game or deals:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (game_id) {
      loadGame(game_id);
    }
  }, [game_id]);

  useEffect(() => {
    if (game?.reviews && animatedWidths.length > 0) {
      const timer = setTimeout(() => {
        setAnimatedWidths(game.reviews.map((rating) => rating.score));
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [game]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-zinc-900 to-black">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-400" />
          <p className="text-lg text-zinc-300">Loading game details...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-zinc-900 to-black">
        <div className="text-center">
          <p className="text-lg text-zinc-300">Game not found</p>
        </div>
      </div>
    );
  }

  const bestDeal =
    deals.length > 0
      ? deals.reduce((prev, current) =>
          prev.price_new < current.price_new ? prev : current
        )
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-zinc-100">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 z-10" />
        {game.asset_url && (
          <img
            src={game.asset_url || "/placeholder.svg"}
            alt={`${game.title} banner`}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}

        {/* Action buttons - moved to top left */}
        <div className="absolute top-6 left-6 z-20">
          <div className="flex gap-2">
            {window.history.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/50 border-zinc-600"
                onClick={() => window.history.back()}
              >
                <ArrowBigLeft className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-zinc-600"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="relative w-24 h-32 md:w-32 md:h-44 rounded-md overflow-hidden shadow-xl border border-zinc-700">
                {game.boxart_url ? (
                  <img
                    src={game.boxart_url || "/placeholder.svg"}
                    alt={`${game.title} cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {bestDeal && (
                    <Badge
                      variant="outline"
                      className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                    >
                      Best Deal
                    </Badge>
                  )}
                  {game.tags?.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 text-zinc-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {game.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-zinc-300">
                  {game.release_date && (
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Released{" "}
                      {new Date(game.release_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    Single-player
                  </span>
                  <span className="flex items-center gap-1">
                    <MonitorSmartphone size={14} />
                    PC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="pricing" className="w-full">
              <TabsList className="bg-zinc-800/50 border border-zinc-700">
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
              </TabsList>
              <TabsContent value="pricing" className="mt-6 space-y-6">
                {bestDeal && (
                  <Card className="bg-zinc-800/50 border-zinc-700">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-zinc-100">
                          Best Price
                        </h3>
                        {bestDeal.price_regular > bestDeal.price_new && (
                          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                            -
                            {Math.round(
                              ((bestDeal.price_regular - bestDeal.price_new) /
                                bestDeal.price_regular) *
                                100
                            )}
                            %
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-white">
                            ${bestDeal.price_new.toFixed(2)}
                          </div>
                          {bestDeal.price_regular > bestDeal.price_new && (
                            <div className="text-sm text-zinc-400 line-through">
                              ${bestDeal.price_regular.toFixed(2)}
                            </div>
                          )}
                        </div>
                        <Button
                          className="bg-yellow-500 hover:bg-yellow-600 text-black"
                          onClick={() => window.open(bestDeal.url, "_blank")}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Buy at {bestDeal.store || "Store"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-zinc-100">
                      Available Stores
                    </h3>
                    <DealsTable gameDeals={getCurrentPageDeals()} />

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="border-zinc-600 text-zinc-200"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-zinc-300 px-3">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="border-zinc-600 text-zinc-200"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-zinc-100">About the Game</h2>
                  <p className="text-zinc-300">
                    {game.title} offers an immersive gaming experience with
                    cutting-edge graphics and engaging gameplay. Explore vast
                    worlds, complete challenging missions, and discover the
                    story that unfolds in this remarkable adventure.
                  </p>
                </div>
                <div className="space-y-6">
                  {game.reviews && game.reviews.length > 0 && (
                    <>
                      <div className="flex flex-wrap gap-4">
                        {game.reviews.slice(0, 4).map((review, index) => (
                          <div
                            key={index}
                            className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex items-center justify-center w-24 h-24"
                          >
                            <div className="text-center">
                              <div className="text-3xl font-bold text-yellow-400">
                                {review.score}
                              </div>
                              <div className="text-xs text-zinc-300">
                                {review.source}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-zinc-100">
                          Score Breakdown
                        </h3>
                        <div className="space-y-3">
                          {game.reviews.map((review, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <a
                                  href={review.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-zinc-200 hover:text-yellow-400 transition-colors"
                                >
                                  {review.source}
                                </a>
                                <span className="text-zinc-300 font-medium">
                                  {review.score}
                                </span>
                              </div>
                              <div className="w-full bg-zinc-700 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`${getRatingColor(
                                    review.score
                                  )} h-full transition-all duration-1000`}
                                  style={{ width: `${animatedWidths[index]}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-zinc-100">Game Details</h3>

                <div className="space-y-2 text-sm">
                  {game.developers && game.developers.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Developer</span>
                      <span className="text-zinc-200">
                        {game.developers[0].name}
                      </span>
                    </div>
                  )}
                  {game.developers && game.developers.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Publisher</span>
                      <span className="text-zinc-200">
                        {game.developers[0].name}
                      </span>
                    </div>
                  )}
                  {game.release_date && (
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Release Date</span>
                      <span className="text-zinc-200">
                        {new Date(game.release_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-300">Platform</span>
                    <span className="text-zinc-200">PC</span>
                  </div>
                </div>

                <Separator className="bg-zinc-700" />

                {game.tags && game.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-zinc-200">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-zinc-900 border-zinc-700 text-zinc-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {game.developers && game.developers.length > 0 && (
                  <div className="pt-4">
                    <div className="text-center">
                      <span className="text-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-transparent bg-clip-text font-bold">
                        {game.developers[0].name}
                      </span>
                      <p className="text-sm text-zinc-400">Studio</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
