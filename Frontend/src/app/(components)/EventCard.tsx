"use client"; 


import { useRouter } from 'next/navigation';
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Ticket {
    ID: string;
    category: string;
    price: number;
    quantity: number;
}

interface Event {
    ID: string;
    title: string;
    start_date: string;
    end_date: string;
    image_url: string;
    description: string;
    location: string;
    available_ticket: number;
    tickets: Ticket[];
    publishername: string;
}

interface EventCardProps {
    event: Event | undefined;
}

export function EventCard({ event }: EventCardProps) {
    
    if (!event) {
        console.error("Event is undefined or has missing properties!");
        return null;
    }

    const { image_url, title, start_date, location , ID } =
        event;

    const formattedDate = new Date(start_date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const router = useRouter();

    const handleDetailClick = () => {
        router.push(`/pages/event?Id=${ID}`);
    };

    return (
        <Card className="w-[350px] flex flex-col border-4 bg-gradient-to-br from-secondarycolor to-orange-500 border-none  shadow-lg shadow-secondarycolor ">
            <CardHeader className="flex flex-col ">
                <img className="rounded-lg" src={image_url} alt={title} />
                <CardTitle className="text-white pt-2 text text-xl font-bold w-full truncate ">
                    {title}
                </CardTitle>
                <CardDescription className="text-md ">
                    <div className="text-white truncate">{location} </div>
                    <div className="flex justify-between items-center pt-5 text-white">
                        <div className="font-semibold">PricePlaceholder</div>
                        <div>{formattedDate}</div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
                <Button variant="outline" className="w-24 bg-white text-secondarycolor border-none " onClick={handleDetailClick}>
                    Detail
                </Button>
            </CardFooter>
        </Card>
    );
}
