import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ComputerIcon as Windows,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GameDeal from "@/models/GameDeal";
interface GamePrice {
  id: number;
  store: string;
  region: string;
  platform: string;
  storeLowPrice: number;
  priceDifference: number;
  isPriceBetter: boolean;
  discountPercentage: number;
  currentPrice: number;
  originalPrice: number;
}

export default function DealsTable(gameDeals: GameDeal[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowLimit, setRowLimit] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("yur", gameDeals);
  }, [gameDeals]);

  // Calculate pagination values
  const totalPages = Math.ceil(gameDeals.length / rowLimit);
  const startIndex = (currentPage - 1) * rowLimit;
  const endIndex = startIndex + rowLimit;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search stores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />

        <div className="flex gap-2"></div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="select-none">
              <TableHead className="w-[250px]">Store</TableHead>
              <TableHead>Platforms</TableHead>
              <TableHead className="text-right cursor-pointer hover:bg-zinc-700">
                <div className="flex items-center justify-end gap-1">
                  Store Low
                </div>
              </TableHead>
              <TableHead className="text-right cursor-pointer hover:bg-zinc-700">
                <div className="flex items-center justify-end gap-1">
                  Current
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gameDeals.length > 0 ? (
              gameDeals.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-800 cursor-pointer"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-semibold">{item.store}</div>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <div className="h-3 w-3 rounded-full bg-green-500" />
                          {/* {item.platform} */}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Windows className="h-5 w-5" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="text-amber-500 font-bold">
                      ${item.price_new.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      better by ${item.price_new.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <div className="bg-gray-200 text-gray-700 mb-1 rounded-md w-12 text-center">
                        <span className="text-xs">-{0}%</span>
                      </div>
                      <div className="font-bold">
                        ${item.price_new.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${item.price_regular.toFixed(2)}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No deals found. Try again later.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {/* Showing {startIndex + 1}-{Math.min(endIndex, allFilteredData.length)} of {allFilteredData.length} */}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                {rowLimit} per page
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[3, 5, 9].map((limit) => (
                <DropdownMenuCheckboxItem
                  key={limit}
                  checked={rowLimit === limit}
                  onCheckedChange={() => {
                    setRowLimit(limit);
                    setCurrentPage(1);
                  }}
                >
                  {limit} rows
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
