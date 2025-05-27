import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SteamDeal } from "@/models/SteamDeal";

interface SteamDealsTableProps {
  gameData: SteamDeal[];
}

export default function SteamDealsTable({ gameData }: SteamDealsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(gameData.length / itemsPerPage);

  const exportData = (format: "csv" | "json") => {
    let content: string;
    let mimeType: string;
    let fileName: string;

    if (format === "csv") {
      const headers = "ID,Title,Steam Price,Best Price\n";
      const rows = gameData
        .map(
          (game) =>
            `${game.itad_id},${game.title},${game.steam_price.toFixed(
              2
            )},${game.best_price.toFixed(2)}`
        )
        .join("\n");
      content = headers + rows;
      mimeType = "text/csv;charset=utf-8;";
      fileName = "wishlist.csv";
    } else {
      content = JSON.stringify(gameData, null, 2);
      mimeType = "application/json;charset=utf-8;";
      fileName = "wishlist.json";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination logic
  const paginatedData = gameData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4 mt-4">
      <div className="rounded-md border border-gray-800 overflow-hidden">
        <div className="bg-gray-900 border-b border-gray-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 hidden md:inline">
              {gameData.length} games in wishlist
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData("json")}
                className="border-gray-700 text-gray-300 hover:bg-gray-800 h-8"
                disabled={gameData.length === 0}
              >
                <Download className="mr-1 h-3 w-3" />
                Export JSON
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData("csv")}
                className="border-gray-700 text-gray-300 hover:bg-gray-800 h-8"
                disabled={gameData.length === 0}
              >
                <Download className="mr-1 h-3 w-3" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        <Table className="border border-gray-800 rounded-lg overflow-hidden shadow-lg">
          <TableHeader className="bg-gray-900 text-white">
            <TableRow className="hover:bg-gray-800 border-b border-gray-800">
              <TableHead></TableHead>
              <TableHead className="text-lg font-semibold">
                Game Title
              </TableHead>
              <TableHead className="text-right text-lg font-semibold">
                Steam Price
              </TableHead>
              <TableHead className="text-right text-lg font-semibold">
                Best Deal Price
              </TableHead>
              <TableHead className="text-right text-lg font-semibold">
                Savings
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-gray-950 divide-y divide-gray-800">
            {paginatedData.map((game) => (
              <TableRow
                key={game.itad_id}
                className="hover:bg-gray-900 transition duration-150 ease-in-out"
              >
                <TableCell className="flex justify-center items-center">
                  <img
                    src={game.asset_url}
                    className="w-28 h-16 object-cover rounded shadow-md hidden md:inline"
                    alt={game.title}
                  />
                </TableCell>
                <TableCell className="text-white font-medium">
                  {game.title}
                </TableCell>
                <TableCell className="text-right text-gray-300">
                  ${game.steam_price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-gray-300">
                  ${game.best_price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-semibold text-green-400">
                  ${Math.max(0, game.steam_price - game.best_price).toFixed(2)}
                </TableCell>
                <TableCell className="w-[50px] text-right">
                  <a
                    href={`${window.location.origin}/game/${game.itad_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-5 w-5 text-gray-400 hover:text-white transition" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-4 py-3 bg-gray-900 border-t border-gray-800">
            <Button
              size="sm"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
