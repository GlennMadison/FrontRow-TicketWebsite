"use client"
import React, { useEffect, useState } from 'react';
import { getSession } from '@/action';
import { redirect } from 'next/navigation';
import LogoutForm from '@/app/(components)/LogoutForm';
import axios from 'axios';
import jwt from 'jsonwebtoken';

interface User {
  ID: string;
  email: string;
  password: string;
  avatar: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const session = await getSession();
      try {
        // Retrieve the token from the session
        const token = session.password;
        console.log("Token:", token);
        const decodeToken = jwt.decode(token);
        console.log("Decoded token:", decodeToken);
        const userId = decodeToken?.Uid;
        // Make a request to retrieve the events data with Axios
        const response = await axios.get<Event | Event[]>(
          `http://localhost:5000/account/${userId}`,
          {
            headers: {
              token: token, // Include the token in the Authorization header
            },
          }
        );

        const user = response.data.data;
        console.log("User data:", user);
        setUser(user);
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
    <div>
      {/* <h2 className='text-white'>Profile Page</h2>
      <h1 className='text-white'>{session.email}</h1>
      <h1 className='text-white'>{session.userId}</h1>
      <h1 className='text-white'>{session.password}</h1>
      {session.isLoggedIn && <LogoutForm></LogoutForm>} */}

      <h1 className='text-white'>{user?.email}</h1>
      <h1 className='text-white'>{user?.ID}</h1>
      <img src={user?.avatar} alt='avatar' />
      {loading && <div>Loading...</div>}

    </div>
  );
};

export default ProfilePage;
