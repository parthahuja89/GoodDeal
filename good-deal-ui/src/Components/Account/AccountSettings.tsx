"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Bell, BellOff, AlertTriangle, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const initialWatchlist = [
  {
    id: 1,
    title: "Elden Ring",
    platform: "PC",
    currentPrice: 39.99,
    targetPrice: 29.99,
    lastUpdated: "2 hours ago",
    image: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 2,
    title: "Starfield",
    platform: "Xbox",
    currentPrice: 49.99,
    targetPrice: 39.99,
    lastUpdated: "1 day ago",
    image: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 3,
    title: "Spider-Man 2",
    platform: "PlayStation",
    currentPrice: 54.99,
    targetPrice: 44.99,
    lastUpdated: "3 days ago",
    image: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 4,
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Switch",
    currentPrice: 49.99,
    targetPrice: 39.99,
    lastUpdated: "5 days ago",
    image: "/placeholder.svg?height=60&width=40",
  },
]

export default function GameWatchlist() {
  const [watchlist, setWatchlist] = useState(initialWatchlist)
  const maxSubscriptions = 5
  const remainingSlots = maxSubscriptions - watchlist.length

  const handleRemoveGame = (gameId) => {
    setWatchlist(watchlist.filter((game) => game.id !== gameId))
  }

  return (
    <div className="container mx-auto px-4 py-8 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Game Watchlist</h1>

      <Alert className="mb-6 border-amber-600 select-none">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <AlertTitle className="text-amber-500">Subscription Limit</AlertTitle>
        <AlertDescription className="text-amber-300">
          Due to service limitations, you can only subscribe to price updates for {maxSubscriptions} games at a time.
          {remainingSlots > 0 ? (
            <span>
              {" "}
              You have <strong>{remainingSlots}</strong> subscription slot{remainingSlots !== 1 ? "s" : ""} remaining.
            </span>
          ) : (
            <span> You have reached your maximum subscription limit.</span>
          )}
        </AlertDescription>
      </Alert>

      <div className="rounded-md border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700">
            <TableRow className="border-gray-800">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlist.length > 0 ? (
              watchlist.map((game) => (
                <TableRow key={game.id} className="border-gray-800">
                  <TableCell>
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{game.title}</TableCell>
                  <TableCell>{game.platform}</TableCell>
                  <TableCell className="text-right">${game.currentPrice}</TableCell>
                  
                  <TableCell className="text-gray-400">{game.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-rose-400 hover:bg-rose-950/30"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove {game.title}</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className=" border-gray-800 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove from watchlist?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            You will no longer receive price drop notifications for{" "}
                            <span className="text-rose-400 font-medium">{game.title}</span>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-rose-600 hover:bg-rose-700 text-white"
                            onClick={() => handleRemoveGame(game.id)}
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <BellOff className="h-8 w-8 mb-2 text-gray-600" />
                    <p>Your watchlist is empty</p>
                    <p className="text-sm">Add games to get notified when prices drop</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {remainingSlots > 0 && watchlist.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <Bell className="h-4 w-4 text-amber-500" />
            You'll receive notifications when there are any updates to the price
          </p>
            <Button onClick={() => window.location.href = '/home'}>Add More Games</Button>
        </div>
      )}
    </div>
  )
}
