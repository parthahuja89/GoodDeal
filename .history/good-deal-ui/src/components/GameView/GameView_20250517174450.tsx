import React, { useEffect, useState } from "react";
import { BellIcon, ArrowBigLeft, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchGame, fetchGameDealsById } from "@/Services/Games";
import { Game } from "@/models/Game";

import DealsTable from "./DealsTable";

function getRatingColor(percentage) {
  if (percentage <= 30) {
    return "bg-red-500";
  } else if (percentage > 30 && percentage <= 65) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

export default function GameView() {
  const { game_id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animatedWidths, setAnimatedWidths] = useState([]);

  function loadGame(game_id){
    if (game_id) {
      setLoading(true);
      fetchGame(game_id)
        .then((gameData) => {
          console.log(gameData);
          setGame(gameData);
          setAnimatedWidths(new Array(gameData?.reviews?.length || 0).fill(0));
          setLoading(false);
        })

        fetchGameDealsById(game_id)
        .then((gameDeals) => {
          console.log(gameDeals);
        })
      
    }
  }
  // Fetch the game data when the component mounts or when game_id changes
  useEffect(() => {
    loadGame(game_id);
  }, [game_id]);

  // Animate the widths of the rating bars when the game data is loaded
  useEffect(() => {
    if (game?.reviews && animatedWidths.length > 0) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setAnimatedWidths(game.reviews.map(rating => rating.score));
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [game]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg">Loading game details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-col-reverse xl:flex-row w-full p-2 gap-4">
      <div className="main xl:w-9/12">
        <div className="3">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  <ArrowBigLeft />
                </Button>

                <span className="ml-2">Game deals</span>

                <div className="ml-auto">
                  <Button>
                    <BellIcon className="mr-2" />
                    Subscribe to Game
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DealsTable />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="xl:w-3/12">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col justify-between items-start">
              <div
                className="relative bg-blue-300 rounded-lg overflow-hidden w-full h-48"
                style={{
                  backgroundImage: `url(${game?.asset_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-4 left-4">
                  <div>
                    <h1 className="text-4xl font-bold text-white">
                      {game?.title}
                    </h1>
                    <p className="text-lg text-slate-200">2023</p>
                  </div>
                  <div className="mt-2">
                    {game?.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className={`bg-gray-300 text-black text-xs px-3 py-1 rounded-full ${
                          index > 0 ? "ml-2" : ""
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex"></div>
                <span className="text-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
                  {game?.developers?.[0]?.name}
                </span>
                <p className="text-sm text-gray-400">Studio</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-sm">
                <strong>Release Date:</strong>{" "}
                {game?.release_date
                  ? new Date(game.release_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : ""}
              </p>
              <p className="text-sm">
                <strong>Developers:</strong>{" "}
                {game?.developers?.map((dev, index) => (
                  <span key={index}>
                    {dev.name}
                    {index < game.developers.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
            <div className="ratings mt-4 overflow-hidden">
              <div className="space-y-2 p-2">
                {game?.reviews?.map((rating, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="flex justify-between text-md items-center">
                        <a href={rating.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{rating.source}</a>
                      <span className="text-gray-400 text-sm">
                        {rating.score} Score
                      </span>
                    </div>

                    <div className="flex items-center w-full mt-2">
                      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className={`${getRatingColor(rating.score)} h-full transition-all duration-1000`}
                          style={{ width: `${animatedWidths[index]}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}