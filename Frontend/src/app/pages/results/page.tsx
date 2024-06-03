"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { getSession } from '@/action'

interface Event {
    ID: string;
    title: string;
    start_date: string;
    end_date: string;
    image_url: string;
    location: string;
    available_ticket: number;
    publisher_name: string;
}

const ResultPage = () => {
    const [events, setEvents] = useState<Event []>()
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('query');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const session = await getSession();
                const token = session.password;

                const response = await axios.get<Event | Event[]>(
                    `http://localhost:5000/search/${searchQuery}`,
                    {
                      headers: {
                        token: token, 
                      },
                    }
                  );

                setEvents(response.data.data);
                console.log(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

  return (
    <div>
        <h1 className='text-white'>Result Page</h1>

        {loading ? (
            <h1>Loading...</h1>
        ) : (
            <div className='text-white'>
                {events?.map((event) => (
                    <div key={event.ID}>
                        <h1>{event.title}</h1>
                        <h2>{event.location}</h2>
                        <h3>{event.publisher_name}</h3>
                    </div>
                ))}
            </div>
        )}
        
    </div>
  )
}

export default ResultPage