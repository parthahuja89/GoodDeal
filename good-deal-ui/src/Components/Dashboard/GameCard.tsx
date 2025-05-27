// components/GameCard.tsx
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useEffect } from "react";

interface GameCardProps {
  game: any;
  index: number;
}

export default function GameCard({ game, index }: GameCardProps) {
  const imageControls = useAnimation();

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onHoverStart={() => imageControls.start({ scale: 1.05 })}
      onHoverEnd={() => imageControls.start({ scale: 1 })}
      className="group bg-slate-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <motion.img
          src={game.asset_url}
          alt={game.title}
          animate={imageControls}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-2 text-gray-100">
          {game.title}
        </h3>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-white">
            <span className="text-orange-500 mr-1">|</span>${game.price_new}
          </span>
          <span className="text-gray-400 line-through text-sm">
            ${game.price_regular}
          </span>
          <div className="flex items-end mt-10 gap-2 justify-end">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => (window.location.href = `game/${game.id}`)}
            >
              More Info
            </Button>
            <Button
              size="sm"
              onClick={() => {
                window.location.href = game.url;
              }}
            >
              <ShoppingBag />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
