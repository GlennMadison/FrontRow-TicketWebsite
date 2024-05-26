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
    
    const { image_url, title, start_date, description, location} = event;

    const formattedDate = new Date(start_date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <Card>
            <CardHeader>
                <img
                    className="rounded-lg w-full h-48 object-cover"
                    src={image_url}
                    alt={title}
                />
                <CardTitle className="py-2">{title}</CardTitle>
                <CardDescription>{formattedDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
                <CardDescription>{location}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Daftar</Button>
                <Button variant="outline">Detail</Button>
            </CardFooter>
        </Card>
    );
}
