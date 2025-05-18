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
  
  );
}
