"use client";
import React, { useEffect, useState } from "react";
import { AceLabel } from "@/components/ui/ace-label";
import { Input } from "@/components/ui/ace-input";
import { cn } from "@/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { IconCreditCard } from "@tabler/icons-react";
import { getSession } from "@/action";
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

const Payment = () => {
    const searchParams = useSearchParams();

    const ticketId = searchParams.get("Id");
    const eventId = searchParams.get("eventId");

    const [events, setEvents] = useState<Event>();
    const [tickets, setTickets] = useState<Ticket>();
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
                            token: token, 
                        },
                    }
                );

                const eventData = response.data.data;
                
                setEvents(eventData);
            } catch (error) {
                console.error("There was an error fetching the events!", error);
                setError("There was an error fetching the events");
            } finally {
                setLoading(false);
            }
            try {
                const token = session.password;
                const response = await axios.get<Event | Event[]>(
                    "http://localhost:5000/GetTicketID/" + eventId,
                    {
                        headers: {
                            token: token,
                        },
                    }
                );
                const ticketData = response.data.data;
                setTickets(ticketData);

            }
            catch (error) {
                console.error("There was an error fetching the tickets!", error);
                setError("There was an error fetching the tickets");
            }
        };

        fetchEvents();
    }, []);

    console.log(events);
    console.log(tickets);
    function formatDate(inputDate: string | undefined): string {
        if (!inputDate) return "";

        const formattedDate = new Date(inputDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        return formattedDate;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted!");
    };
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="flex gap-4">
                    <div className="flex flex-col justify-between w-[30vw] bg-white h-[18vw] rounded-3xl p-4 px-8 shadow-lg shadow-secondarycolor object-contain overflow-hidden ">
                        <div className="flex justify-between  items-center">
                            <AceLabel className="text-2xl ">
                                Payment Information
                            </AceLabel>
                            <IconCreditCard size={60} />
                        </div>
                        <form className="" onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer>
                                    <AceLabel htmlFor="cardNumber">
                                        Card number*
                                    </AceLabel>
                                    <Input
                                        id="cardNumber"
                                        name="cardNumber"
                                        placeholder="0000 0000 0000 0000"
                                        type="text"
                                    />
                                </LabelInputContainer>
                                <LabelInputContainer className="max-w-[5vw]">
                                    <AceLabel htmlFor="lastname">CVV*</AceLabel>
                                    <Input
                                        id="cvv"
                                        name="cvv"
                                        placeholder="123"
                                        type="text"
                                    />
                                </LabelInputContainer>
                            </div>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer>
                                    <AceLabel htmlFor="Name*">Name*</AceLabel>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Smith"
                                        type="text"
                                    />
                                </LabelInputContainer>
                                <LabelInputContainer className="max-w-[10vw]">
                                    <AceLabel htmlFor="ExpireDate">
                                        Expiration Date*
                                    </AceLabel>
                                    <Input
                                        id="expireDate"
                                        name="expireDate"
                                        placeholder="MM/YY"
                                        type="text"
                                    />
                                </LabelInputContainer>
                            </div>
                        </form>
                    </div>
                    <div className="flex px-5 min-w-[20vw] ">
                        <div className="flex flex-col justify-between font-semibold text-lg  p-4 bg-gradient-to-br from-secondarycolor to-orange-500 rounded-lg text-white">
                            <div>
                                <div className="flex py-2 w-max">
                                    
                                    <div className="pl-2">
                                        {formatDate(events?.start_date)} -{" "}
                                        {formatDate(events?.end_date)}
                                    </div>
                                </div>
                                <div className="flex py-2">
                                   
                                    <div className="pl-2">
                                        {events?.location}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

                                <div className="flex py-2">
                                    
                                    <div className="pl-2">
                                        {events?.publisher_name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
