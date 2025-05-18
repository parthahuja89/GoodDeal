import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import GameDeal from "@/models/GameDeal"; 
import { <Win></Win> } from "lucide-react";

interface DealsTableProps {
  gameDeals: GameDeal[];
}

export default function DealsTable({ gameDeals }: DealsTableProps) {
  useEffect(() => {
    console.log("Fetched Game Deals:", gameDeals);
  }, [gameDeals]);

  return (
    <Card className="p-4 mt-4 shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Regular Price</TableHead>
            <TableHead>Discounted Price</TableHead>
            <TableHead>Platforms</TableHead>
            <TableHead>Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gameDeals.map((deal) => (
            <TableRow key={deal.id}>
              <TableCell className="flex items-center gap-2">
                <img src={deal.asset_url} alt={deal.title} className="w-10 h-10 rounded" />
                {deal.title}
              </TableCell>
              <TableCell>{deal.store}</TableCell>
              <TableCell>${deal.price_regular.toFixed(2)}</TableCell>
              <TableCell className="text-green-600 font-semibold">
                ${deal.price_new.toFixed(2)}
              </TableCell>
              <TableCell>
                {deal.platforms.includes("Windows") && <Windows className="inline w-4 h-4" />}
                {deal.platforms.filter((p) => p !== "Windows").join(", ")}
              </TableCell>
              <TableCell>
                <a
                  href={deal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Deal
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
