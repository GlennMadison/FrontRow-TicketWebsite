import { Combobox } from "../Combobox";
import { EventCard } from "../EventCard";

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
}

interface EventCardProps {
    event: Event | undefined;
}

export function PopularEvent() {
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
        <div className="h-auto flex justify-center items-center">
            <div className="flex-col justify-center p-4 overflow-hidden w-[80vw] rounded-2xl">
                <div className="px-4 py-3">
                    <Combobox />
                </div>
                <div className="flex justify-between">
                    {events.slice(0, 4).map((event) => (
                        <div
                            key={event.ID}
                            className="drop-shadow-xl hover:shadow-primaryred hover:shadow-lg rounded-lg transition-all duration-600"
                        >
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
