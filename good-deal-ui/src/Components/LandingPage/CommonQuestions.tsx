"use client"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const questions = [
  {
    question: "How is my data stored and protected?",
    answer:
      "Your data is encrypted using industry-standard AES-256 encryption. We only store your Steam ID (encrypted) and email address. You can delete your account and all associated data at any time. We never sell your information to third parties.",
  },
  {
    question: "Which platforms and stores do you track?",
    answer:
      "We track prices across 20+ major platforms including Steam, Epic Games Store, GOG, Humble Bundle, Microsoft Store, PlayStation Store, Xbox Store, Nintendo eShop, and many more. Our database is constantly expanding.",
  },
  {
    question: "How accurate are the price notifications?",
    answer:
      "Our system checks prices every 15 minutes using official APIs and web scraping. Notifications are sent within minutes of a price drop. We maintain 99.9% accuracy across all tracked platforms.",
  },
  {
    question: "Can I set custom price alerts?",
    answer:
      "Yes! You can set specific price thresholds for any game. Get notified when a game drops below your target price, reaches a certain discount percentage, or hits an all-time low.",
  },
  {
    question: "Is there a limit to how many games I can track?",
    answer:
      "No limits! Track as many games as you want across all platforms. Whether you have 10 games or 1000 games on your wishlist, we've got you covered.",
  },
  {
    question: "How do I connect my Steam account?",
    answer:
      "Simply enter your Steam ID in the dashboard. Your profile must be set to public temporarily for the initial sync. After syncing, you can make your profile private again. We only read your wishlist and library data.",
  },
  {
    question: "Will this always be free?",
    answer:
      "Yes, absolutely! Good Deals will always be 100% free. We're open source and community-driven. No premium tiers, no hidden costs, no ads. Built by gamers, for gamers.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes! You can export all your tracked games, price history, and account data in CSV or JSON format at any time. Your data belongs to you.",
  },
]

export default function CommonQuestions() {
  return (
    <div id="faq" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">Everything you need to know about Good Deals</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-zinc-800/20 backdrop-blur-md border-zinc-700/50">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {questions.map((question, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-zinc-700/50">
                  <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-purple-300 transition-colors">
                    {question.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 leading-relaxed pt-2">{question.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
