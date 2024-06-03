"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "@/action";
import { redirect } from "next/navigation";
import LogoutForm from "@/app/(components)/LogoutForm";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

interface User {
    ID: string;
    email: string;
    password: string;
    avatar: string;
    username: string;
    createdAt: string;
    phone: string;
    age: number;
}

const ProfilePage = () => {
    const [editMode, setEditMode] = useState<boolean>(true);
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const session = await getSession();
            try {
                const token = session.password;

                const decodeToken = jwt.decode(token);

                const userId = decodeToken?.Uid;
                const response = await axios.get<Event | Event[]>(
                    `http://localhost:5000/account/${userId}`,
                    {
                        headers: {
                            token: token,
                        },
                    }
                );

                const user = response.data.data;

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
        <div className="h-screen flex justify-center items-center p-10">
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem>
                        <div className="flex justify-center items-center">
                            <img
                                src={user?.avatar ?? ''}
                                alt="avatar"
                                width={150}
                                height={150}
                                className="rounded-full"
                            />
                        </div>
                    </CardItem>
                    <CardItem>
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl font-bold">{user?.username}</h1>
                        </div>
                    </CardItem>

                    <CardItem>
                        <div className="flex justify-center items-center">
                            <h1 className="text-lg font-bold">{user?.email}</h1>
                        </div>
                    </CardItem>
                    <CardItem>
                        <div className="flex justify-center items-center">
                            <h1 className="text-lg font-bold">{user?.phone}</h1>
                        </div>
                    </CardItem>
                    <CardItem>
                        <div className="flex justify-center items-center">
                            <h1 className="text-lg font-bold">{user?.age}</h1>
                        </div>
                    </CardItem>
                </CardBody>
            </CardContainer>
        </div>
    );
};

export default ProfilePage;
