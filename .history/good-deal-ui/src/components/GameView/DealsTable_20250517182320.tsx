import { useEffect, useMemo, useState } from "react";
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
import { ArrowLeft, ArrowRight } from "lucide-react";
import GameDeal from "@/models/GameDeal";

type DealsTableProps = {
  gameDeals: GameDeal[];
};

export default function DealsTable(gameDeals: GameDeal[]) {

  const [searchTerm, setSearchTerm] = useState("");
  const [rowLimit, setRowLimit] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered deals
  const filteredDeals = useMemo(() => {
    return gameDeals.filter((deal) =>
      deal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, gameDeals]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDeals.length / rowLimit);
  const startIndex = (currentPage - 1) * rowLimit;
  const paginatedDeals = filteredDeals.slice(startIndex, startIndex + rowLimit);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Platform(s)</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedDeals.map((deal) => (
            <TableRow key={deal.id}>
              <TableCell>
                <a href={deal.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {deal.title}
                </a>
              </TableCell>
              <TableCell>{deal.store}</TableCell>
              <TableCell>{deal.platforms.join(", ")}</TableCell>
              <TableCell className="text-right">
                <span className="line-through text-gray-400 mr-2">${deal.price_regular.toFixed(2)}</span>
                <span className="font-semibold text-green-600">${deal.price_new.toFixed(2)}</span>
              </TableCell>
            </TableRow>
          ))}
          {paginatedDeals.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No deals found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Prev
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
