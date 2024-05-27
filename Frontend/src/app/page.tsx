"use client";
import Hero from "./(components)/Sections/Hero";
import { EventCategory } from "./(components)/Sections/EventCategory";
import { PopularEvent } from "./(components)/Sections/PopularEvent";

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

export default function Home() {
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

    useEffect(() => {
        console.log("Events:", events);
    }, [events]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="font-poppins bg-primarycolor ">
            <Hero />
            <PopularEvent />
            <EventCategory />
            <div className="h-screen"></div>
        </div>
    );
}
