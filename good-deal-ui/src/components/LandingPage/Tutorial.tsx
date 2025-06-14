"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Link2, Gamepad2, Bell } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up for free in seconds. No credit card required, no hidden fees. Just enter your email and you're ready to start saving.",
    icon: UserPlus,
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "02",
    title: "Connect Your Steam",
    description:
      "Link your Steam account to automatically import your wishlist and library. We'll start tracking deals for all your games immediately.",
    icon: Link2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "03",
    title: "Browse & Add Games",
    description:
      "Search our database of 50,000+ games. All games have best deals available in real time.",
    icon: Gamepad2,
    color: "from-green-500 to-emerald-500",
  },
  {
    step: "04",
    title: "Start buying & Save",
    description:
      "Start saving instantly by clicking on the buy link for any games.",
    icon: Bell,
    color: "from-orange-500 to-red-500",
  },
]

export default function Tutorial() {
  return (
    <div id="tutorial" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">How It Works</Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Saving in 4 Simple Steps</h2>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
          Get up and running in minutes. No complex setup, no learning curve.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50 hover:bg-zinc-800/30 hover:border-zinc-600/50 transition-all duration-300 group h-full">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} p-0.5 group-hover:scale-110 transition-transform`}
                  >
                    <div className="w-full h-full bg-zinc-900 rounded-lg flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <Badge variant="outline" className="border-zinc-600 text-zinc-400">
                    Step {step.step}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 leading-relaxed text-lg">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
