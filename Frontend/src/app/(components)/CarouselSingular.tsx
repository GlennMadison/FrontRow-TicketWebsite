import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSingular() {
    return (
        <Carousel className="max-w-6xl">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div>
                            <div className="flex items-center justify-center ">
                                <img
                                    className="rounded-lg"
                                    src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1715920542_Om8rLV.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
