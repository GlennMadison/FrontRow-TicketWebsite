import * as React from "react";
import { EventCard } from "./EventCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselMultiple({
  children,
  carouselItemClass = " md:basis-1/3 lg:basis-1/4 ",
}: {
  children: React.ReactNode;
  carouselItemClass?: string;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
        
      }}
      className="w-[80vw]"
    >
      <CarouselContent>
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={index} className={carouselItemClass}>
            {child}
            
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
