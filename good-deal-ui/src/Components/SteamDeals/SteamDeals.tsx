"use client";

import { useState, useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import { calculateGameSavings, syncSteamWishlist } from "@/Services/Games";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag, Percent, DollarSign, CircleOff, RefreshCcw } from "lucide-react";
import { SteamDeal } from "@/models/SteamDeal";
import SteamDealsTable from "./SteamDealsTable";

export default function SteamDeals() {
  const [totalGames, setTotalGames] = useState("--");
  const [totalSavings, setTotalSavings] = useState("--");
  const [averageDiscount, setAverageDiscount] = useState("--");
  const [steamId, setSteamId] = useState("");
  const [gameData, setGameData] = useState<SteamDeal[]>([]);
  const [syncLoader, setSyncLoader] = useState(false);
  const { toast } = useToast()


  async function syncSteamDeals() {
    setSyncLoader(true);
    try {
      const games = await syncSteamWishlist(steamId);
      if (!games || games.length === 0) {
        toast({
          title: "No games found",
          description: "Please make sure the SteamID is correct and your profile is set to public.",
        });
        return;
      }
      const [savings, discount] = calculateGameSavings(games);
      setTotalGames(games.length.toString());
      setTotalSavings(savings.toString());
      setAverageDiscount(discount.toFixed(2).toString());
      setGameData(games);
    } catch (error) {
      toast({
        title: "Error syncing Steam library",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setSyncLoader(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Steam Integration</h1>
      <Card className="border-gray-800 bg-gray-900 mt-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">Steam Account</CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            Enter your Steam ID to sync your wishlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              syncSteamDeals();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="steamId" className="text-gray-400 text-sm">
                  Steam ID
                </Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <span className="text-blue-400 text-xs cursor-pointer hover:underline">
                      How to find your Steam ID?
                    </span>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-gray-100">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">
                        Finding Your Steam ID
                      </DialogTitle>
                    </DialogHeader>
                    <ul className="list-disc space-y-2 pl-4">
                      <li>
                        Open the Steam client and go to your profile section.{" "}
                        <br /> The steam id is the numerical value following{" "}
                        <p className="inline font-mono"> /profiles/</p>
                      </li>
                      <li>
                        Alternatively, you can use the{" "}
                        <a
                          href="https://steamid.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          steamid.io
                        </a>{" "}
                        website to find your Steam ID.
                      </li>
                      <li>
                        Your profile must be set to{" "}
                        <a
                          href="https://help.steampowered.com/en/faqs/view/588C-C67D-0251-C276"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          public
                        </a>{" "}
                        including the game details section. You can revert these
                        changes after syncing.
                      </li>
                    </ul>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative">
                <Input
                  value={steamId}
                  maxLength={17}
                  onChange={(event) => {
                    setSteamId(event.target.value);
                  }}
                  required
                  minLength={17}
                  placeholder="Enter your Steam ID"
                  className="bg-gray-800 border-gray-700 text-white pr-24"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-xs text-gray-500">
                    https://steamcommunity.com/profiles/id{" "}
                  </span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white self-end"
            >
              {syncLoader ? (
                <div className="flex items-center gap-2">
                  <span>Syncing Games</span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <RefreshCcw size={16} />
                  </motion.div>
                </div>
              ) : (
                <div>Sync Games</div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-3 mt-10">
        <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg hover:shadow-blue-900/20 transition-shadow duration-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Games in Wishlist
            </CardTitle>
            <Tag className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalGames}</div>
            <p className="text-xs text-gray-400 mt-1">Games you want to buy</p>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg hover:shadow-green-900/20 transition-shadow duration-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Potential Savings
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalSavings}</div>
            <p className="text-xs text-gray-400 mt-1">
              By buying at best prices
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg hover:shadow-purple-900/20 transition-shadow duration-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Average Discount
            </CardTitle>
            <Percent className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {averageDiscount}%
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Average savings per game
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-3">
        {gameData.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-lg border border-gray-800">
            <CircleOff className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-400">
              No games imported yet
            </h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Enter your Steam ID and click the "Sync from Steam" button to
              import your wishlist.
            </p>
          </div>
        ) : (
          <SteamDealsTable gameData={gameData} />
        )}
      </div>
      <Toaster /> 
    </div>
  );
}
