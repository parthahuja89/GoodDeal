"use client"
import { motion } from "framer-motion"
import { Zap, Gamepad2 as Steam, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Smart Price Tracking",
    icon: TrendingDown,
    description:
      "Monitor prices across Steam, Epic Games, GOG, and 20+ other platforms. Never miss a deal again with our comprehensive tracking system.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Steam Integration",
    icon: Steam,
    description:
      "Seamlessly sync your Steam wishlist. Automatically track deals for games you already own or want to buy.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Always Free",
    icon: Zap,
    description:
      "100% free forever. No premium tiers, no hidden costs. Open source and community-driven. Built by gamers, for gamers.",
    gradient: "from-yellow-500 to-orange-500",
  },
]

export default function Features() {
  return (
    <div id="features">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Everything You Need to Save Money</h2>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
          Powerful features designed to help you find the best game deals across all platforms
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50 hover:bg-zinc-800/30 hover:border-zinc-600/50 transition-all duration-300 group h-full">
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform`}
                >
                  <div className="w-full h-full bg-zinc-900 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
