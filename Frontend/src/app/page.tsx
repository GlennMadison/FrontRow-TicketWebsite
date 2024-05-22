import React from "react";
import Navbar from "./(components)/navbar";
import Hero from "./(components)/Hero";
import { EventCard } from "./(components)/EventCard"; 

export default function Home() {
  return (
    <div> 
      <Navbar />
      <Hero />
      <EventCard />
    </div>
  );
}
