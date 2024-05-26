import React from "react";
import Hero from "./(components)/Hero";
import Navbar from "./(components)/navbar";
import Footer from "./(components)/Footer";
import { EventCategory } from "./(components)/EventCategory";
import { PopularEvent } from "./(components)/PopularEvent";


export default function Home() {
  return (
    <div className="font-poppins"> 
      <Navbar />
      <Hero />
      <PopularEvent />
      <EventCategory />
      <div className="bg-white h-screen"></div>
      <Footer />
    </div>
  );
}
