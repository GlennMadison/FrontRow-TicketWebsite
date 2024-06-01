"use client";
import * as React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SearchTab from "@/app/(components)/SearchTab";
import AnimatedDiv from "@/app/(components)/simpleAnimate";
import { useState, useEffect } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { EventCard } from "@/app/(components)/EventCard";
import axios from "axios";
import { getSession } from "@/action";

type Option = {
    value: string;
    label: string;
};

const locations: Option[] = [
    { value: "1", label: "Location 1" },
    { value: "2", label: "Location 2" },
    { value: "3", label: "Location 3" },
];
const types: Option[] = [
    { value: "1", label: "Type 1" },
    { value: "2", label: "Type 2" },
    { value: "3", label: "Type 3" },
];

const topics: Option[] = [
    { value: "1", label: "Topic 1" },
    { value: "2", label: "Topic 2" },
    { value: "3", label: "Topic 3" },
];

const times: Option[] = [
    { value: "1", label: "Time 1" },
    { value: "2", label: "Time 2" },
    { value: "3", label: "Time 3" },
];

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

export default function Discover() {
    const [selectedLocation, setSelectedLocation] = useState<Option | null>(
        null
    );
    const [selectedType, setSelectedType] = useState<Option | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Option | null>(null);
    const [selectedTime, setSelectedTime] = useState<Option | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<Option | null>(null);

    const resetSelection = (
        setSelected: React.Dispatch<React.SetStateAction<Option | null>>
    ) => {
        setSelected(null);
    };

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
          const session = await getSession();
          try {
            const token = session.password;
            console.log("Token:", token);
            const response = await axios.get<Event | Event[]>(
              "http://localhost:5000/events",
              {
                headers: {
                  token: token, // Include the token in the Authorization header
                },
              }
            );
            console.log("Response:", response);
    
            const eventData = response.data.data;
            console.log("Event data:", eventData);
            setEvents(eventData);
          } catch (error) {
            console.error("There was an error fetching the events!", error);
            setError("There was an error fetching the events");
          } finally {
            setLoading(false);
          }
        };
    
        fetchEvents();
      }, []);
    
    return (
        <div className="h-screen flex justify-center p-10">
            <div className="flex">
                <div className="px-8">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full text-white min-w-72 border-2 border-secondarycolor p-4 rounded-lg "
                    >
                        <h1 className="font-semibold">Filter</h1>
                        <AnimatedDiv direction="bottom" delay={0.1}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Location</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex items-center justify-between">
                                        <AnimatedDiv
                                            direction="left"
                                            duration={0.3}
                                        >
                                            <SearchTab
                                                placeholder="Location"
                                                options={locations}
                                                selectedOption={
                                                    selectedLocation
                                                }
                                                onOptionSelect={
                                                    setSelectedLocation
                                                }
                                            />
                                        </AnimatedDiv>

                                        {selectedLocation && (
                                            <AnimatedDiv direction="right">
                                                <div className="p-2">
                                                    <Cross1Icon
                                                        className="w-6 h-6 text-secondarycolor hover:text-white transition-colors cursor-pointer"
                                                        onClick={() =>
                                                            resetSelection(
                                                                setSelectedLocation
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </AnimatedDiv>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </AnimatedDiv>

                        <AnimatedDiv direction="bottom" delay={0.2}>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Type</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex items-center justify-between">
                                        <AnimatedDiv
                                            direction="left"
                                            duration={0.3}
                                        >
                                            <SearchTab
                                                placeholder="Type"
                                                options={types}
                                                selectedOption={selectedType}
                                                onOptionSelect={setSelectedType}
                                            />
                                        </AnimatedDiv>

                                        {selectedType && (
                                            <AnimatedDiv direction="right">
                                                <div className="p-2">
                                                    <Cross1Icon
                                                        className="w-6 h-6 text-secondarycolor hover:text-white transition-colors cursor-pointer"
                                                        onClick={() =>
                                                            resetSelection(
                                                                setSelectedType
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </AnimatedDiv>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </AnimatedDiv>

                        <AnimatedDiv direction="bottom" delay={0.3}>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Topic</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex items-center justify-between">
                                        <AnimatedDiv
                                            direction="left"
                                            duration={0.3}
                                        >
                                            <SearchTab
                                                placeholder="Topic"
                                                options={topics}
                                                selectedOption={selectedTopic}
                                                onOptionSelect={
                                                    setSelectedTopic
                                                }
                                            />
                                        </AnimatedDiv>

                                        {selectedTopic && (
                                            <AnimatedDiv direction="right">
                                                <div className="p-2">
                                                    <Cross1Icon
                                                        className="w-6 h-6 text-secondarycolor hover:text-white transition-colors cursor-pointer"
                                                        onClick={() =>
                                                            resetSelection(
                                                                setSelectedTopic
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </AnimatedDiv>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </AnimatedDiv>

                        <AnimatedDiv direction="bottom" delay={0.4}>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Time</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex items-center justify-between">
                                        <AnimatedDiv
                                            direction="left"
                                            duration={0.3}
                                        >
                                            <SearchTab
                                                placeholder="Time"
                                                options={times}
                                                selectedOption={selectedTime}
                                                onOptionSelect={setSelectedTime}
                                            />
                                        </AnimatedDiv>

                                        {selectedTime && (
                                            <AnimatedDiv direction="right">
                                                <div className="p-2">
                                                    <Cross1Icon
                                                        className="w-6 h-6 text-secondarycolor hover:text-white transition-colors cursor-pointer"
                                                        onClick={() =>
                                                            resetSelection(
                                                                setSelectedTime
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </AnimatedDiv>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </AnimatedDiv>

                        <AnimatedDiv direction="bottom" delay={0.5}>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>Price</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex items-center justify-between">
                                        <AnimatedDiv
                                            direction="left"
                                            duration={0.3}
                                        >
                                            <SearchTab
                                                placeholder="Topic"
                                                options={topics}
                                                selectedOption={selectedPrice}
                                                onOptionSelect={
                                                    setSelectedPrice
                                                }
                                            />
                                        </AnimatedDiv>

                                        {selectedPrice && (
                                            <AnimatedDiv direction="right">
                                                <div className="p-2">
                                                    <Cross1Icon
                                                        className="w-6 h-6 text-secondarycolor hover:text-white transition-colors cursor-pointer"
                                                        onClick={() =>
                                                            resetSelection(
                                                                setSelectedPrice
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </AnimatedDiv>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </AnimatedDiv>
                    </Accordion>
                </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
                        {events.slice(0, 8).map((event, index) => (
                            <div
                                key={event.ID}
                                className="drop-shadow-xl hover:shadow-primaryred hover:shadow-lg rounded-lg transition-all duration-600"
                            >
                                <AnimatedDiv
                                    direction="bottom"
                                    delay={(0.1 * index) + 1}
                                    duration={0.3}
                                >
                                    <EventCard event={event} />
                                </AnimatedDiv>
                            </div>
                        ))}
                    </div>
                
            </div>
        </div>
    );
}
