"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Search, Calendar, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Game } from "@/models/Game"

interface SearchResultsProps {
  games: Game[]
}

export default function SearchResults({ games }: SearchResultsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Simulate search results loading
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  }

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    tap: { scale: 0.98 },
  }

  // Empty state animation variants
  const emptyVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 },
    },
  }

  return (
    <motion.div
      className="w-full bg-zinc-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-700/50 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-zinc-700/50 bg-zinc-800/50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-300">Search Results</h3>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">{games.length} found</Badge>
        </div>
      </div>

      <AnimatePresence>
        {games.length > 0 ? (
          <motion.ul
            className="divide-y divide-zinc-700/50"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {games.map((game, index) => (
              <motion.li
                key={game.id}
                className="cursor-pointer bg-zinc-800/50 hover:bg-zinc-700/50 relative overflow-hidden group"
                variants={itemVariants}
                whileTap="tap"
                onMouseEnter={() => setSelectedId(index.toString())}
                onMouseLeave={() => setSelectedId(null)}
                onClick={() => {
                  window.location.href = `game/${game.id}`
                }}
              >
                <div className="flex items-center p-4 gap-4">
                  {/* Game Image */}
                  <motion.div
                    className="h-20 w-16 relative flex-shrink-0 rounded-md overflow-hidden bg-zinc-700/50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {game.asset_url ? (
                      <motion.img
                        src={game.asset_url || "/placeholder.svg"}
                        alt={game.title}
                        className="object-cover h-full w-full"
                        initial={{ filter: "brightness(0.9)" }}
                        animate={{
                          filter: selectedId === index.toString() ? "brightness(1.1)" : "brightness(0.9)",
                          scale: selectedId === index.toString() ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-zinc-500 text-xs">No Image</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Game Info */}
                  <motion.div
                    className="flex-1 min-w-0"
                    animate={{
                      x: selectedId === index.toString() ? 5 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.h4
                      className="font-semibold text-sm line-clamp-2 mb-1"
                      animate={{
                        color: selectedId === index.toString() ? "#ffffff" : "#e4e4e7",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {game.title}
                    </motion.h4>

                    {/* Developers */}
                    {game.developers && game.developers.length > 0 && (
                      <p className="text-xs text-zinc-400 mb-1">by {game.developers[0].name}</p>
                    )}

                    {/* Release Date */}
                    {game.release_date && (
                      <div className="flex items-center gap-1 mb-2">
                        <Calendar className="h-3 w-3 text-zinc-500" />
                        <span className="text-xs text-zinc-500">{new Date(game.release_date).getFullYear()}</span>
                      </div>
                    )}

                    {/* Tags */}
                    {game.tags && game.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {game.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="bg-zinc-800/50 border-zinc-600/50 text-zinc-400 text-xs px-2 py-0.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {game.tags.length > 2 && (
                          <Badge
                            variant="outline"
                            className="bg-zinc-800/50 border-zinc-600/50 text-zinc-400 text-xs px-2 py-0.5"
                          >
                            +{game.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Reviews */}
                    {game.reviews && game.reviews.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-zinc-400">{game.reviews[0].score}</span>
                        </div>
                        <span className="text-xs text-zinc-500">{game.reviews[0].source}</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Arrow Icon */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: selectedId === index.toString() ? 1 : 0,
                      x: selectedId === index.toString() ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronRight className="h-5 w-5 text-purple-400" />
                  </motion.div>
                </div>

                {/* Left Border Accent */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400"
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: selectedId === index.toString() ? 1 : 0,
                    opacity: selectedId === index.toString() ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Hover Overlay */}
                {selectedId === index.toString() && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div className="py-12 px-4 text-center" variants={emptyVariants} initial="hidden" animate="visible">
            <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-zinc-500" />
            </div>
            <p className="text-zinc-400 font-medium">No results found</p>
            <p className="text-zinc-500 text-sm mt-1">Try adjusting your search terms</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
