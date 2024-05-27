"use client"; // Add this line at the top

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
    // Check if event is undefined or has missing properties
    if (!event) {
        console.error("Event is undefined or has missing properties!");
        return null;
    }

    const { image_url, title, start_date, description, location, tickets } =
        event;

    const formattedDate = new Date(start_date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <Card className="w-[350px] flex flex-col bg-secondarycolor shadow-lg shadow-secondarycolor border-none">
            <CardHeader className="flex flex-col ">
                <img
                    className="rounded-lg  "
                    src={image_url}
                    alt={title}
                />
                <CardTitle className="text-primaryblack pt-2 text text-lg font-bold w-full truncate">
                    {title}
                </CardTitle>
                <CardDescription className="text-md text-primaryblack">
                    <div className="truncate">{location}</div>
                    <div className="flex justify-between items-center pt-5">
                        <div className="font-semibold">a</div>
                        <div>{formattedDate}</div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
                {/* <Button className="w-24 bg-primaryred">Daftar</Button> */}
                <Button variant="outline" className="w-24 ">
                    Detail
                </Button>
            </CardFooter>
        </Card>
    );
}
