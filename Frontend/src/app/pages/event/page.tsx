"use client";

import { getSession } from "@/action";
import { useEffect, useState } from "react";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import axios from "axios";
import AnimatedDiv from "@/app/(components)/simpleAnimate";
import { Calendar, MapPin, Contact } from "lucide-react";

interface Ticket {
    ID: string;
    category: string;
    price: number;
    quantity: number;
}

interface Description {
    description: string;
    ImageURL: string;
    syarat_ketentuan: string;
}

interface Event {
    ID: string;
    title: string;
    start_date: string;
    end_date: string;
    image_url: string;
    description: Description[];
    location: string;
    available_ticket: number;
    tickets: Ticket[];
    publisher_name: string;
}

export default function event() {
    const searchParams = useSearchParams();

    const eventId = searchParams.get("Id");
    // console.log(eventId);

    const [events, setEvents] = useState<Event>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const session = await getSession();
            try {
                const token = session.password;

                const response = await axios.get<Event | Event[]>(
                    "http://localhost:5000/event/" + eventId,
                    {
                        headers: {
                            token: token, // Include the token in the Authorization header
                        },
                    }
                );

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

    function formatDate(inputDate: string | undefined): string {
        if (!inputDate) return "";

        const formattedDate = new Date(inputDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        return formattedDate;
    }

    return (
        <div className="h-auto bg-primarycolor flex justify-center ">
            <div className="flex border- border-white p-5">
                <div className="flex-col justify-center ">
                    <div className="w-[60vw] flex ">
                        <div>
                            <img
                                className="rounded-lg border-4 border-secondarycolor"
                                src={events?.image_url}
                            ></img>
                        </div>

                        <div className="flex px-5 min-w-[20vw] ">
                            <div className="flex flex-col justify-between font-semibold text-lg  p-4 bg-gradient-to-br from-secondarycolor to-orange-500 rounded-lg text-white">
                                <div>
                                    <div className="flex py-2 w-max">
                                        <Calendar />
                                        <div className="pl-2">
                                            {formatDate(events?.start_date)} -{" "}
                                            {formatDate(events?.end_date)}
                                        </div>
                                    </div>
                                    <div className="flex py-2">
                                        <MapPin />
                                        <div className="pl-2">
                                            {events?.location}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

                                    <div className="flex py-2">
                                        <Contact />
                                        <div className="pl-2">
                                            {events?.publisher_name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 pt-8 pb-4">
                        <h1 className="text-white font-bold text-4xl">
                            {events?.title}
                        </h1>
                    </div>
                    <Tabs defaultValue="description">
                        <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-secondarycolor to-orange-500">
                            <TabsTrigger value="description" className="">
                                Description
                            </TabsTrigger>
                            <TabsTrigger value="ticket" className="">
                                Ticket
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="description">
                            <AnimatedDiv
                                direction="top"
                                delay={0.1}
                                duration={0.8}
                            >
                                <ScrollArea className="max-w-[50vw] h-[20vw]  rounded-md  py-4 pb-8 text-white ">
                                    {events?.description[0].description}
                                </ScrollArea>
                                <h1 className="text-secondarycolor text-2xl font-semibold">
                                    Syarat dan Ketentuan
                                </h1>
                                <ScrollArea className="max-w-[50vw] min-h-[15vw] rounded-md py-4 text-white ">
                                    {events?.description[0].syarat_ketentuan}
                                </ScrollArea>
                            </AnimatedDiv>
                        </TabsContent>
                        <TabsContent value="ticket">
                            <ScrollArea className="max-w-3xl h-[40vw] rounded-md py-4 text-white ">
                                {events?.tickets.map((event, index) => (
                                    <div
                                        key={index}
                                        className="p-2 m-1 hover:m-0 transition-all"
                                    >
                                        <AnimatedDiv
                                            direction="top"
                                            delay={0.1 * index}
                                            duration={0.8}
                                        >
                                            <div className="border-secondarycolor shadow-lg shadow-secondarycolor border-2 font-semibold m-3 p-3 rounded-lg">
                                                <div className="flex items-center justify-between min-w-[25vw]">
                                                    <div>
                                                        <div className="text-xl">
                                                            <h1>
                                                                {event.category}
                                                            </h1>
                                                        </div>
                                                        <div className="text-md font-light">
                                                            <h1>
                                                                Berakhir pada{" "}
                                                                {formatDate(
                                                                    events?.end_date
                                                                )}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <ChevronRightIcon className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Separator className="my-4 " />
                                                <div className="flex items-center justify-between">
                                                    <div className="text-lg font-bold">
                                                        <h1>
                                                            Rp {event.price}
                                                        </h1>
                                                    </div>
                                                    <div className="text-secondarycolor">
                                                        <h1>Available</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </AnimatedDiv>
                                    </div>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
