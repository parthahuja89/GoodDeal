import React, { useEffect, useState } from "react";
import severance from "../../assets/sev.jpg";
import { BellIcon, ArrowBigLeft, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchGame } from "@/Services/Games";
import { Game } from "@/models/Game";

import DealsTable from "./DealsTable";

const tags = [
  "RPG",
  "Character Customization",
  "Choices Matter",
  "Story Rich",
  "Turn-Based Combat",
  "Dungeons & Dragons",
  "CRPG",
  "Fantasy",
  "Adventure",
  "Romance",
];

const ratingsData = [
  { name: "Steam", positive: 92, negative: 8, reviews: 650459 },
  { name: "OpenCritic", positive: 93, negative: 7, reviews: 218 },
  { name: "Metascore", positive: 34, negative: 60, reviews: 94 },
  { name: "Metacritic User Score", positive: 92, negative: 8, reviews: 27815 },
];

function getRatingColor(percentage: number) {
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
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  const [animatedWidths, setAnimatedWidths] = useState(
    ratingsData.map(() => 0)
  );

  useEffect(() => {
    console.log(game_id);
    if (game_id) {
      setLoading(true);
      fetchGame(game_id)
        .then((game) => {
          console.log(game)
          setGame(game);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching game:", error);
          setLoading(false);
        });
    }

    const timer = setTimeout(() => {
      setAnimatedWidths(ratingsData.map((rating) => rating.positive));
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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

                <span className="ml-2">Good deals</span>

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
                <div className="absolute bottom-4 left-4">
                  <div>
                    <h1 className="text-4xl font-bold">{game?.title}</h1>
                    <p className="text-lg text-slate-200">2023</p>
                  </div>
                  <div className="mt-2">
                    {tags.slice(0, 3).map((tag, index) => (
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
                  {game?.developers ?? "N/A"}
                </span>
                <p className="text-sm text-gray-400">Studio</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <p className="text-sm">
                <strong>Release Date:</strong> 25 Oct 2018
              </p>
              <p className="text-sm">
                <strong>Developers:</strong> Rockstar Games
              </p>
              <p className="text-sm">
                <strong>Publishers:</strong> Rockstar Games, TAKE-TWO
                INTERACTIVE
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-200">
              Developed by the creators of Grand Theft Auto V and Red Dead
              Redemption, Red Dead Redemption 2 is an epic tale of life in
              America's unforgiving heartland. The game's vast and atmospheric
              wo
            </p>
            <div className="ratings mt-4 overflow-hidden">
              <div className="space-y-2 p-2">
                {ratingsData.map((rating, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="flex justify-between text-md items-center">
                      <span>{rating.name}</span>
                      <span className="text-gray-400 text-sm">
                        {rating.positive}% Positive
                      </span>
                    </div>

                    <div className="flex items-center w-full mt-2">
                      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className={`${getRatingColor(
                            rating.positive
                          )} h-full transition-all duration-1000`}
                          style={{ width: `${animatedWidths[index]}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mt-5">
                <span className="text-lg font-semibold">How Long to Beat</span>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span>Main Story</span>
                    <span>50½ Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Main + Sides</span>
                    <span>83½ Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completionist</span>
                    <span>188 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>All Styles</span>
                    <span>78 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}