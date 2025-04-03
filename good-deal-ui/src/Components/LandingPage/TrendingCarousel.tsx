import MovieCard from "./MovieCard";
import { motion } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "../ui/button";


interface carouselProps{
  cardTitle: string
}

export default function TrendingCarousel(props: carouselProps){
    return (
      <>
        <div className="flex font-bold text-white justify-between">
          <h3 className="text-3xl">
            {props.cardTitle}
          </h3>
          <a href="/login" className="text-lg font-semibold underline">Show More</a>
          
        </div>
        
        <Carousel className="py-8">
        <CarouselContent>
            <CarouselItem className="sm:1/2 md:basis-1/3 xl:basis-1/4"><MovieCard/></CarouselItem>
            <CarouselItem className="sm:1/2 md:basis-1/3 xl:basis-1/4"><MovieCard/></CarouselItem>
            <CarouselItem className="sm:1/2 md:basis-1/3 xl:basis-1/4"><MovieCard/></CarouselItem>
            <CarouselItem className="sm:1/2 md:basis-1/3 xl:basis-1/4"><MovieCard/></CarouselItem>
            <CarouselItem className="sm:1/2 md:basis-1/3 xl:basis-1/4"><MovieCard/></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
        {/* <div className="flex py-5 gap-10">
          {cards.map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <MovieCard />
            </motion.div>
          ))}
        </div> */}
      </>
    );
}