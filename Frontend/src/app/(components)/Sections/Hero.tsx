"use client";
import { CarouselSingular } from "../CarouselSingular";
import { CarouselMultiple } from "../CarouselMultiple";
import { EventCard } from "../EventCard";
import { Banner } from "./Banner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { getSession } from "@/action";
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
    const fetchEvents = async () => {
      const session = await getSession();
      try {
        // Retrieve the token from the session

        const token = session.password;
        console.log("Token:", token);
        // Make a request to retrieve the events data with Axios
        const response = await axios.get<Event | Event[]>(
          "http://localhost:5000/events",
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-auto flex justify-center items-center p-10">
      {/* <h1>{session.}</h1> */}
      <div className="flex flex-col   justify-between items-center p-10  border-secondarycolor rounded-2xl border-4 shadow-lg shadow-secondarycolor">
        <div className="py-3  ">
          <motion.div
            initial={{ opacity: 0.0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <CarouselSingular />
          </motion.div>
        </div>
        <div>
          <h1 className="text-white font-bold text-3xl pb-2 px-8">
            Featured Events
          </h1>
          <CarouselMultiple>
            {events.map((event, index) => (
              <div key={index}>
                <motion.div
                  initial={{ opacity: 0.0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                  <EventCard event={event} />
                </motion.div>
              </div>
            ))}
          </CarouselMultiple>
        </div>

        {/* <div>
                    <Banner src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/temporary/20240513/1715595700_AENa5W.jpg" />
                </div> */}
      </div>
    </div>
  );
}
