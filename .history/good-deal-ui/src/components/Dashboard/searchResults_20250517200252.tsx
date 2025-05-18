"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

// Temporary data
const results = [
  {
    title: "Cyberpunk 2077",
    id: "018d937f-2997-7131-b8b9-7c8af4825fa8",
    asset_url: "https://assets.isthereanydeal.com/018d937f-2997-7131-b8b9-7c8af4825fa8/banner600.jpg?t=1746524713",
  },
  {
    title: "VA-11 Hall-A: Cyberpunk Bartender Action",
    id: "018d937f-2998-7044-874d-26ecb30c4e4b",
    asset_url: "https://assets.isthereanydeal.com/018d937f-2998-7044-874d-26ecb30c4e4b/banner600.jpg?t=1732216812",
  },
  {
    title: "E.Y.E: Divine Cybermancy",
    id: "01939826-74c9-7352-9adc-79f40dfa92b2",
    asset_url: "https://assets.isthereanydeal.com/01939826-74c9-7352-9adc-79f40dfa92b2/banner600.jpg?t=1733437583",
  },
  {
    title: "Bomb Rush Cyberfunk",
    id: "018d937f-443d-7383-bede-c4e0d42b7cfd",
    asset_url: "https://assets.isthereanydeal.com/018d937f-443d-7383-bede-c4e0d42b7cfd/banner600.jpg?t=1732737306",
  },
  {
    title: "Cyberpunk 2077: Phantom Liberty",
    id: "018d937f-6ed7-7164-8fc3-5390f976e531",
    asset_url: "https://assets.isthereanydeal.com/018d937f-6ed7-7164-8fc3-5390f976e531/banner600.jpg?t=1746524721",
  },
]

export default function SearchResults() {
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
        staggerChildren: 0.1,
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
      className="w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {results.length > 0 ? (
          <motion.ul
            className="divide-y divide-gray-700"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {results.map((game) => (
              <motion.li
                key={game.id}
                className="cursor-pointer bg-gray-800 hover:bg-gray-700 relative overflow-hidden"
                variants={itemVariants}
                whileTap="tap"
                onMouseEnter={() => setSelectedId(game.id)}
                onMouseLeave={() => setSelectedId(null)}
              >
                <div className="flex items-center p-4">
                  <motion.div
                    className="h-16 w-28 relative flex-shrink-0 rounded-md overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.img
                      src={game.asset_url}
                      alt={game.title}
                      className="object-cover h-full w-full"
                      initial={{ filter: "brightness(0.9)" }}
                      animate={{
                        filter: selectedId === game.id ? "brightness(1.1)" : "brightness(0.9)",
                        scale: selectedId === game.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <motion.div
                    className="ml-4 flex-1 min-w-0"
                    animate={{
                      x: selectedId === game.id ? 5 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.p
                      className="text-sm font-medium truncate text-gray-200"
                      animate={{
                        color: selectedId === game.id ? "#ffffff" : "#d1d5db",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {game.title}
                    </motion.p>
                  </motion.div>

                  
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: selectedId === game.id ? 1 : 0,
                      x: selectedId === game.id ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mr-2"
                  >
                    <ChevronRight className="h-5 w-5 text-cyan-400" />
                  </motion.div>
                </div>


                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500"
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: selectedId === game.id ? 1 : 0,
                    opacity: selectedId === game.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />

                
                {selectedId === game.id && (
                  <motion.div
                    className="absolute inset-0 bg-cyan-500 pointer-events-none"
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
          <motion.div className="py-6 px-4 text-center" variants={emptyVariants} initial="hidden" animate="visible">
            <p className="text-gray-400">No results found for "...."</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
