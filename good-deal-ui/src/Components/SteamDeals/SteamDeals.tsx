"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/redux";
import { setUser } from "@/store/slices/userSlice";
import {
  calculateGameSavings,
  getGameDeals,
  syncSteamWishlist,
} from "@/Services/Games";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Tag,
  Percent,
  DollarSign,
  RefreshCcw,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import SteamIcon from "../../assets/SteamIcon.svg";
import type { SteamDeal } from "@/models/SteamDeal";
import SteamDealsTable from "./SteamDealsTable";
import getUserInfo from "@/Services/User";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  delay?: number;
}

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  delay = 0,
}: StatsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50 hover:bg-zinc-800/30 hover:border-zinc-600/50 transition-all duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium text-zinc-300 group-hover:text-zinc-200 transition-colors">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg bg-zinc-800/50 ${iconColor} group-hover:scale-110 transition-transform`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <p className="text-xs text-zinc-400">{subtitle}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center py-20"
  >
    <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50">
      <CardContent className="p-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-zinc-800/50 flex items-center justify-center">
          <img
            src={SteamIcon}
            alt="Steam"
            className="h-8 w-8 brightness-0 invert"
          />
        </div>
        <h3 className="text-xl font-semibold text-zinc-200 mb-2">
          No games imported yet
        </h3>
        <p className="text-zinc-400 max-w-md mx-auto mb-6">
          Enter your Steam ID and click the "Sync Games" button to import your
          wishlist and start tracking deals.
        </p>
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
          Get started by syncing your Steam account
        </Badge>
      </CardContent>
    </Card>
  </motion.div>
);

export default function SteamDeals() {
  const [totalGames, setTotalGames] = useState("--");
  const [totalSavings, setTotalSavings] = useState("--");
  const [averageDiscount, setAverageDiscount] = useState("--");
  const [steamId, setSteamId] = useState("");
  const [gameData, setGameData] = useState<SteamDeal[]>([]);
  const [syncLoader, setSyncLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);
  const { toast } = useToast();

  const isLoading = syncLoader || pageLoader;

  async function updateUserGames() {
    setPageLoader(true);
    try {
      const res = await getGameDeals();
      setGameData(res);
      const [savings, discount] = calculateGameSavings(res);

      setTotalGames(res.length.toString());
      setTotalSavings(savings.toString());
      setAverageDiscount(discount.toFixed(2).toString());

      return res;
    } catch (error) {
      toast({
        title: "Error loading games",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
      setGameData([]);
    } finally {
      setPageLoader(false);
    }
  }

  function updateSteamId() {
    if (userData.steam_id) {
      setSteamId(userData.steam_id);
    }
  }

  useEffect(() => {
    updateUserGames();
  }, []);

  useEffect(() => {
    updateSteamId();
  }, [userData]);

  async function syncSteamDeals() {
    setSyncLoader(true);
    try {
      await syncSteamWishlist(steamId);
      const games = await updateUserGames();

      if (!games || games.length === 0) {
        toast({
          title: "No games found",
          description:
            "Please make sure the SteamID is correct and your profile is set to public.",
        });
        return;
      }

      toast({
        title: "Sync completed!",
        description: `Successfully synced ${games.length} games from your Steam wishlist.`,
      });
    } catch (error) {
      toast({
        title: "Error syncing Steam library",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setSyncLoader(false);
      const userInfo = await getUserInfo();
      dispatch(setUser(userInfo));
    }
  }

  const LoadingSpinner = ({ size = 16, className = "" }) => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      className={className}
    >
      <RefreshCcw size={size} />
    </motion.div>
  );

  const PageLoader = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center py-20"
    >
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size={32} className="text-purple-400" />
        <p className="text-zinc-400">Loading your games...</p>
      </div>
    </motion.div>
  );

  const renderMainContent = () => {
    if (pageLoader) return <PageLoader />;
    if (Number(totalGames) === 0) return <EmptyState />;
    return <SteamDealsTable gameData={gameData} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <img
                src={SteamIcon}
                alt="Steam"
                className="h-6 w-6 text-purple-400"
              />
            </div>
            <h1 className="text-3xl font-bold text-white">Steam Integration</h1>
          </div>
          <p className="text-zinc-400">
            Sync your Steam wishlist and discover the best deals across all
            platforms
          </p>
        </motion.div>

        {/* Steam Account Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-white text-xl">
                    Steam Account
                  </CardTitle>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    Limited to 50 games
                  </Badge>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-white"
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-zinc-900/95 backdrop-blur-xl border-zinc-700 text-zinc-100">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                        <img
                          src={SteamIcon}
                          alt="Steam"
                          className="h-5 w-5 text-purple-400"
                        />
                        Finding Your Steam ID
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                        <h4 className="font-medium text-zinc-200 mb-2">
                          Method 1: Steam Profile URL
                        </h4>
                        <p className="text-sm text-zinc-400">
                          Open Steam client → Go to your profile → The Steam ID
                          is the numerical value following{" "}
                          <code className="bg-zinc-700 px-1 rounded text-zinc-300">
                            /profiles/
                          </code>
                        </p>
                      </div>
                      <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                        <h4 className="font-medium text-zinc-200 mb-2">
                          Method 2: External Tool
                        </h4>
                        <p className="text-sm text-zinc-400 mb-2">
                          Use the steamid.io website to find your Steam ID
                          easily:
                        </p>
                        <a
                          href="https://steamid.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
                        >
                          steamid.io <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <h4 className="font-medium text-amber-300 mb-2">
                          ⚠️ Important
                        </h4>
                        <p className="text-sm text-zinc-400">
                          Your Steam profile must be set to{" "}
                          <a
                            href="https://help.steampowered.com/en/faqs/view/588C-C67D-0251-C276"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            public
                          </a>{" "}
                          including the game details section. You can revert
                          these changes after syncing.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription className="text-zinc-400">
                Connect your Steam account to automatically track deals on your
                wishlist games
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  syncSteamDeals();
                }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-1 space-y-2">
                  <Label
                    htmlFor="steamId"
                    className="text-zinc-300 text-sm font-medium"
                  >
                    Steam ID
                  </Label>
                  <div className="relative">
                    <Input
                      id="steamId"
                      value={steamId}
                      maxLength={17}
                      onChange={(event) => setSteamId(event.target.value)}
                      required
                      minLength={17}
                      placeholder="76561198000000000"
                      className="bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-500 focus:border-purple-500/50 focus:ring-purple-500/20 pr-32"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-xs text-zinc-500">17 digits</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end">
                  <Button
                    type="submit"
                    disabled={isLoading || steamId.length !== 17}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                  >
                    <AnimatePresence mode="wait">
                      {syncLoader ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span>Syncing</span>
                          <LoadingSpinner size={14} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="sync"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <img
                            src={SteamIcon}
                            alt="Steam"
                            className="h-4 w-4 "
                          />
                          <span>Sync Games</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        {!pageLoader && Number(totalGames) > 0 && (
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <StatsCard
              title="Games in Wishlist"
              value={totalGames}
              subtitle="Games you want to buy"
              icon={Tag}
              iconColor="text-blue-400"
              delay={0.3}
            />
            <StatsCard
              title="Potential Savings"
              value={`$${totalSavings}`}
              subtitle="By buying at best prices"
              icon={DollarSign}
              iconColor="text-green-400"
              delay={0.4}
            />
            <StatsCard
              title="Average Discount"
              value={`${averageDiscount}%`}
              subtitle="Average savings per game"
              icon={Percent}
              iconColor="text-purple-400"
              delay={0.5}
            />
          </div>
        )}

        {/* Main Content */}
        {renderMainContent()}

        <Toaster />
      </div>
    </div>
  );
}
