"use client";
import { CarouselSingular } from "../CarouselSingular";
import { CarouselMultiple } from "../CarouselMultiple";
import { EventCard } from "../EventCard";
import { Banner } from "./Banner";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
export default function Hero() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get<Event | Event[]>("http://localhost:5000/events")
            .then((response) => {
                const eventData = response.data.data;
                console.log("Event data:", eventData);
                setEvents(eventData);
            })
            .catch((error) => {
                console.error("There was an error fetching the events!", error);
                setError("There was an error fetching the events");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="h-auto flex justify-center items-center">
            <div className="flex flex-col   justify-between items-center p-4">
                <div className="py-3  ">
                    <CarouselSingular />
                </div>
                <div>
                    <h1 className="text-white font-bold text-3xl pb-2 px-8">
                        Featured Events
                    </h1>
                    <CarouselMultiple>
                        {events.map((event) => (
                            <EventCard event={event} />
                        ))}
                    </CarouselMultiple>
                </div>

                <div>
                    <Banner src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/temporary/20240513/1715595700_AENa5W.jpg" />
                </div>
            </div>
        </div>
    );
}
