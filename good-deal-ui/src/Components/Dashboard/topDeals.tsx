import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import severance from "../../assets/sev.jpg";

const dealData = [
  {
    gamePlatform: "PlayStation",
    gameName: "God of War",
    oldPrice: "$60.00",
    newPrice: "$40.00",
    discountPercentage: "33%",
  },
  {
    gamePlatform: "Xbox",
    gameName: "Halo Infinite",
    oldPrice: "$70.00",
    newPrice: "$50.00",
    discountPercentage: "29%",
  },
  {
    gamePlatform: "PC",
    gameName: "Cyberpunk 2077",
    oldPrice: "$80.00",
    newPrice: "$45.00",
    discountPercentage: "44%",
  },
  {
    gamePlatform: "Nintendo Switch",
    gameName: "The Legend of Zelda: Breath of the Wild",
    oldPrice: "$59.99",
    newPrice: "$39.99",
    discountPercentage: "33%",
  },
  {
    gamePlatform: "PC",
    gameName: "Elden Ring",
    oldPrice: "$69.99",
    newPrice: "$49.99",
    discountPercentage: "29%",
  },
  {
    gamePlatform: "Xbox",
    gameName: "Forza Horizon 5",
    oldPrice: "$59.99",
    newPrice: "$29.99",
    discountPercentage: "50%",
  },
  {
    gamePlatform: "PlayStation",
    gameName: "The Last of Us Part II",
    oldPrice: "$69.99",
    newPrice: "$39.99",
    discountPercentage: "43%",
  },
  {
    gamePlatform: "PlayStation",
    gameName: "The Last of Us Part II",
    oldPrice: "$69.99",
    newPrice: "$39.99",
    discountPercentage: "43%",
  },
  {
    gamePlatform: "PlayStation",
    gameName: "The Last of Us Part II",
    oldPrice: "$69.99",
    newPrice: "$39.99",
    discountPercentage: "43%",
  },
  {
    gamePlatform: "PlayStation",
    gameName: "The Last of Us Part II",
    oldPrice: "$69.99",
    newPrice: "$39.99",
    discountPercentage: "43%",
  },
  {
    gamePlatform: "PlayStation",
    gameName: "The Last of Us Part II",
    oldPrice: "$69.99",
    newPrice: "$39.99",
    discountPercentage: "43%",
  },
];

export default function topDeals() {
  return (
    <div className="w-full h-[80vh] relative overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-purple-500 text-slate-50">
          <TableRow>
            <TableHead>Tags</TableHead>
            <TableHead>Game</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dealData.slice(0, 12).map((deal, index) => (
            <TableRow key={index}>
              <TableCell>{deal.gamePlatform}</TableCell>
              <TableCell className="underline cursor-pointer">
                {deal.gameName}
              </TableCell>

              <TableCell>
                <span
                  className={`text-black text-xs font-semibold px-2 py-1 rounded-sm h-6 flex items-center justify-center w-2/3 ${
                    parseInt(deal.discountPercentage) >= 45
                      ? "bg-green-400"
                      : parseInt(deal.discountPercentage) >= 30
                      ? "bg-yellow-300"
                      : "bg-red-300"
                  }`}
                >
                  {deal.discountPercentage}
                </span>
              </TableCell>

              <TableCell className="flex justify-end gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-green-300 font-bold text-lg mt-2">
                    {deal.newPrice}
                  </span>
                  <span className=" text-slate-400 text-sm">
                    {deal.oldPrice}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TableRow>
          <TableCell colSpan={12} className="text-center cursor-pointer">Load More Games</TableCell>
          
        </TableRow>
      </TableFooter>
      </Table>
    </div>
  );
}
