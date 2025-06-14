"use client"
import { Button } from "@/components/ui/button"
import { LogIn, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="text-center py-20">

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
      >
        Never Pay Full Price for{" "}
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 text-transparent bg-clip-text">
          Games
        </span>{" "}
        Again
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl md:text-2xl text-zinc-400 mt-8 max-w-4xl mx-auto leading-relaxed"
      >
        Track game prices across all major platforms.
        Sync your Steam library and discover the best deals automatically.
      </motion.p>

      {/* Features List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-6 mt-8 text-zinc-300"
      >
        {["Steam Integration", "Multi-Platform", "Always Free"].map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            <span className="text-sm font-medium">{feature}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold group"
          onClick={() => (window.location.href = "/login")}
        >
          <LogIn className="mr-2 h-5 w-5" />
          Start Saving Now
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>

      </motion.div>

      {/* GitHub Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-sm text-zinc-500 mt-8"
      >
        Open source on{" "}
        <a
          href="https://github.com/partha-huja/GameWrecks"
          target="_blank"
          rel="noreferrer"
          className="text-purple-400 hover:text-purple-300 transition-colors underline"
        >
          GitHub
        </a>
      </motion.p>
    </div>
  )
}
