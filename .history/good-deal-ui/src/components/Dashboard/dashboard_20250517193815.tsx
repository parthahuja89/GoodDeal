"use client"

import { useEffect, useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { GameDeal } from "@/models/GameDeal"
import { fetchGameDeals } from "@/Services/Games"
import SearchResults from "./search-results"

export default function GameSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [topDealsResults, setTopDeals] = useState<GameDeal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await fetchGameDeals()
      setTopDeals(data)
    } catch (error) {
      console.error("Error fetching game deals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch game data from the API
  useEffect(() => {
    fetchData()
  }, [])

  // Filter results as user types
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return topDealsResults

    const query = searchQuery.toLowerCase()
    return topDealsResults.filter((game) => game.title.toLowerCase().includes(query))
  }, [searchQuery, topDealsResults])

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-12 text-gray-100 min-h-screen">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 tracking-tight text-white select-none">
          Let&apos;s find you a{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Good deal.
            </span>
          </span>
        </h1>

        <div className="w-full max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for games..."
              className="w-full h-14 pl-4 pr-12 text-lg rounded-lg border-2 card text-white placeholder:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={handleClearSearch}
                className="absolute right-12 top-2 h-10 w-10"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Clear search</span>
              </Button>
            ) : null}
            <Button type="button" size="icon" className="absolute right-2 top-2 h-10 w-10">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="mt-8">
          {searchQuery ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-bold mb-6 text-white">
                Search Results for "{searchQuery}"
                <span className="ml-2 text-sm font-normal text-gray-400">({filteredResults.length} results)</span>
              </h2>
              <SearchResults results={filteredResults} searchQuery={searchQuery} />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-bold mb-6 text-white">Top Game Deals</h2>
              <SearchResults results={topDealsResults} searchQuery={searchQuery} />
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
