"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, SpellCheck2 } from "lucide-react";
import { Game } from "@/models/Game";

interface SearchResultsProps {
  games: Game[];
}

export default function SearchResults({ games }: SearchResultsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Simulate search results loading
  useEffect(() => {
    setIsVisible(true);
  }, []);

  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

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
  };

  // Empty state animation variants
  const emptyVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 },
    },
  };

  return (
    <motion.div
      className="w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {games.length > 0 ? (
          <motion.ul
            className="divide-y divide-gray-700"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {games.map((game, index) => (
              <motion.li
                key={game.id}
                className="cursor-pointer bg-gray-800 hover:bg-gray-700 relative overflow-hidden"
                variants={itemVariants}
                whileTap="tap"
                onMouseEnter={() => setSelectedId(index.toString())}
                onMouseLeave={() => setSelectedId(null)}
                onClick={() => {
                  window.location.href = `game/${game.id}`;
                } }
              >
                <div className="flex items-center p-4">
                  <motion.div
                    className="h-16 w-28 relative flex-shrink-0 rounded-md overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {game.asset_url && (
                    <motion.img
                      src={game.asset_url}
                      alt={game.title}
                      className="object-cover h-full w-full"
                      initial={{ filter: "brightness(0.9)" }}
                      animate={{
                        filter:
                          selectedId === index.toString()
                            ? "brightness(1.1)"
                            : "brightness(0.9)",
                        scale: selectedId === index.toString() ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />)}
                  </motion.div>
                  <motion.div
                    className="ml-4 flex-1 min-w-0"
                    animate={{
                      x: selectedId === index.toString() ? 5 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.p
                      className="text-sm font-medium truncate text-gray-200"
                      animate={{
                        color: selectedId === index.toString() ? "#ffffff" : "#d1d5db",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {game.title}
                    </motion.p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: selectedId === index.toString() ? 1 : 0,
                      x: selectedId === index.toString()? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mr-2"
                  >
                    <ChevronRight className="h-5 w-5 text-purple-500" />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400"
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: selectedId === index.toString() ? 1 : 0,
                    opacity: selectedId === index.toString() ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />

                {selectedId === index.toString() && (
                  <motion.div
                    className="absolute inset-0 bg-purple-500 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            className="py-6 px-4 text-center"
            variants={emptyVariants}
            initial="hidden"
            animate="visible"
          >
            <SpellCheck2/> <p className="text-gray-400"> No results found</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
