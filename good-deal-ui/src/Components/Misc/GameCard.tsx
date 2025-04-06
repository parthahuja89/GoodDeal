import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SevImage from "../../assets/sev.jpg";

let cardStyle = {
  backgroundImage: `url(${SevImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default function GameCard() {
  return (
    <div>
    <Card
      className="w-80 h-40 bg-neutral-900 text-white border-neutral-800 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      style={cardStyle}
      onClick={() => {
        console.log("Card clicked!");
      }}
    >
      <CardHeader className="select-none">
        <CardTitle>Severance</CardTitle>
        <CardDescription className="text-slate-300">2023</CardDescription>
      </CardHeader>
    </Card>
    </div>
  );
}
