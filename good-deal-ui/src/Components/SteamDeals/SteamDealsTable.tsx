"use client"

import React, { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink, Download, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { SteamDeal } from "@/models/SteamDeal"

interface SteamDealsTableProps {
  gameData: SteamDeal[]
}

export default function SteamDealsTable({ gameData }: SteamDealsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 6

  // Filter games based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return gameData
    }
    return gameData.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [gameData, searchTerm])

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const exportData = (format: "csv" | "json") => {
    let content: string
    let mimeType: string
    let fileName: string

    // Export filtered data if search is active
    const dataToExport = searchTerm.trim() ? filteredData : gameData

    if (format === "csv") {
      const headers = "ID,Title,Steam Price,Best Price\n"
      const rows = dataToExport
        .map((game) => `${game.itad_id},${game.title},${game.steam_price.toFixed(2)},${game.best_price.toFixed(2)}`)
        .join("\n")
      content = headers + rows
      mimeType = "text/csv;charset=utf-8;"
      fileName = searchTerm.trim() ? "filtered_wishlist.csv" : "wishlist.csv"
    } else {
      content = JSON.stringify(dataToExport, null, 2)
      mimeType = "application/json;charset=utf-8;"
      fileName = searchTerm.trim() ? "filtered_wishlist.json" : "wishlist.json"
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    link.style.display = "none"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Pagination logic
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6 mt-8">
      {/* Header Controls */}
      <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-sm text-zinc-300">
                <span className="font-medium text-white">{filteredData.length}</span> of{" "}
                <span className="font-medium text-white">{gameData.length}</span> games
                {searchTerm.trim() && (
                  <Badge className="ml-2 bg-purple-500/20 text-purple-300 border-purple-500/30">Filtered</Badge>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData("json")}
                className="border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
                disabled={filteredData.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData("csv")}
                className="border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
                disabled={filteredData.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700/50 hover:bg-zinc-800/30">
                <TableHead className="w-32"></TableHead>
                <TableHead className="text-zinc-200 font-semibold">Game Title</TableHead>
                <TableHead className="text-right text-zinc-200 font-semibold">Steam Price</TableHead>
                <TableHead className="text-right text-zinc-200 font-semibold">Best Deal</TableHead>
                <TableHead className="text-right text-zinc-200 font-semibold">Savings</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((game, index) => (
                  <motion.tr
                    key={game.itad_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-zinc-700/50 hover:bg-zinc-800/30 transition-colors group"
                  >
                    <TableCell className="p-4">
                      <div className="relative w-24 h-14 rounded-md overflow-hidden bg-zinc-800/50">
                        {game.asset_url ? (
                          <img
                            src={game.asset_url || "/placeholder.svg"}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            alt={game.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-zinc-500 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-200 font-medium group-hover:text-white transition-colors">
                      {game.title}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-zinc-300 font-medium">${game.steam_price.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-green-400 font-semibold">${game.best_price.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-green-400 font-semibold">
                          ${Math.max(0, game.steam_price - game.best_price).toFixed(2)}
                        </span>
                        {game.steam_price > game.best_price && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            -{Math.round(((game.steam_price - game.best_price) / game.steam_price) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <a
                        href={`${window.location.origin}/game/${game.itad_id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-zinc-700/50 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 text-zinc-400 hover:text-purple-400 transition-colors" />
                      </a>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center">
                        <Search className="h-6 w-6 text-zinc-500" />
                      </div>
                      <div className="text-zinc-400">
                        {searchTerm.trim() ? `No games found matching "${searchTerm}"` : "No games in wishlist"}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-700/50 bg-zinc-800/10">
            <Button
              size="sm"
              variant="outline"
              className="border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
