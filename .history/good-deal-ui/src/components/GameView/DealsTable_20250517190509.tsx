import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import windows from "@/assets/windows.svg";
import GameDeal from "@/models/GameDeal";

interface DealsTableProps {
  gameDeals: GameDeal[];
}

type SortKey = keyof GameDeal | null;
type SortOrder = "asc" | "desc";

const ITEMS_PER_PAGE = 10;

export default function DealsTable({ gameDeals }: DealsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("price_new");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedDeals = useMemo(() => {
    const sorted = [...gameDeals];
    if (sortKey) {
      sorted.sort((a, b) => {
        const aVal = a[sortKey as keyof GameDeal];
        const bVal = b[sortKey as keyof GameDeal];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortOrder === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        return 0;
      });
    }
    return sorted;
  }, [gameDeals, sortKey, sortOrder]);

  //Only recompute when on new page or when the gameDeals change
  const paginatedDeals = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedDeals.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedDeals, currentPage]);

  const totalPages = Math.ceil(gameDeals.length / ITEMS_PER_PAGE);


  const SortIcon = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? <ArrowUp className="inline w-4 h-4" /> : <ArrowDown className="inline w-4 h-4" />;
  };

  return (
    <Card className="p-4 mt-4 shadow-md">
      <Table>
        <TableHeader className="font-semibold text-lg">
          <TableRow>
            <TableHead onClick={() => handleSort("store")} className="cursor-pointer">
              Store {SortIcon("store")}
            </TableHead>
            <TableHead onClick={() => handleSort("price_regular")} className="cursor-pointer">
              Regular Price {SortIcon("price_regular")}
            </TableHead>
            <TableHead onClick={() => handleSort("price_new")} className="cursor-pointer">
              Discounted Price {SortIcon("price_new")}
            </TableHead>
            <TableHead>Platforms</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-lg">
          {paginatedDeals.map((deal) => (
            <TableRow key={deal.id} className="cursor-pointer" onClick={() => window.open(deal.url, "_blank")}>
              <TableCell>{deal.store}</TableCell>
              <TableCell>${deal.price_regular.toFixed(2)}</TableCell>
              <TableCell className="text-green-600 font-semibold border-l-4 border-green-600 h-2/3">
                ${deal.price_new.toFixed(2)}
              </TableCell>
              <TableCell>
                {deal.platforms.map((platform, index) => (
                  <span
                    key={index}
                    className={`bg-gray-300 text-black text-xs px-3 py-1 rounded-full ${
                      index > 0 ? "ml-2" : ""
                    }`}
                  >
                    {platform?.name}
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Prev
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
}
