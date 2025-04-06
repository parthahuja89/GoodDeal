import React from "react";
import GameCard from "../Misc/GameCard";

export default function popular() {
  return (
    <div className="grid grid-cols-2 gap-10 justify-center items-center">
      {Array.from({ length: 6 }).map((_, index) => (
      <GameCard key={index} />
      ))}
    </div>
  );
}
