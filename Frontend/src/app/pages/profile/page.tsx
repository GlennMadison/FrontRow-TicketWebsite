"use client";
import React, { use, useEffect, useState } from "react";
import { getSession } from "@/action";
import { redirect } from "next/navigation";
import LogoutForm from "@/app/(components)/LogoutForm";
import axios from "axios";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Card } from "antd";
import { Button } from "@/components/ui/button";
import { GearIcon } from "@radix-ui/react-icons";
import AnimatedDiv from "@/app/(components)/simpleAnimate";

interface User {
    ID: string;
    email: string;
    password: string;
    avatar: string;
    username: string;
    createdAt: string;
    phone: string;
    age: number;
    point: number;
}

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

interface Ticket {
    ticket_id: string;
    quantity: number;
}

interface OrderHistory {
    id: string;
    event_id: string;
    total_ticket: number;
    booking_date: string;
    tickets: Ticket[];
}

const ProfilePage = () => {
    const [orderHistory, setOrderHistory] = useState<OrderHistory[]>();
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
                console.log(user);

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

    useEffect(() => {
    }, [user]);

    useEffect(() => {
        const fetchHistory = async () => {
            const session = await getSession();
            try {
                const token = session.password;

                const decodeToken = jwt.decode(token);

                const userId = decodeToken?.Uid;
                const response = await axios.get<Event | Event[]>(
                    `http://localhost:5000/orders/${userId}`,
                    {
                        headers: {
                            token: token,
                        },
                    }
                );

                const data = response.data.data;

                setOrderHistory(data);
            } catch (error) {
                setError("There was an error fetching the History");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    useEffect(() => {
        console.log(orderHistory);
    }, [orderHistory]);

   

    return (
        <div className="h-auto items-start flex p-10">
            <div className="grid grid-cols-3 w-full gap-10">
                <AnimatedDiv direction="top" duration={0.8}>
                    <CardContainer className="inter-var ">
                        <CardBody className="flex-col w-full items-start bg-gradient-to-br from-orange-500 to-secondarycolor relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  h-auto rounded-xl p-6 border  ">
                            <div className="flex-grow grid grid-cols-2 gap-4 text-white font-bold text-xl ">
                                <CardItem
                                    className="col-span-2 mx-auto"
                                    translateZ={50}
                                >
                                    <div className="flex justify-center items-center">
                                        <img
                                            src={user?.avatar ?? ""}
                                            alt="avatar"
                                            width={250}
                                            className="rounded-full border-4  "
                                        />
                                    </div>
                                </CardItem>
                                <CardItem translateZ={20} className="p-2">
                                    <h1 className="">Username</h1>
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    className="flex justify-end items-end border-2 rounded-xl p-2 w-auto hover:border-none hover:bg-white hover:text-secondarycolor transition-all"
                                >
                                    <h1 className="flex font-medium">
                                        {user?.username}
                                    </h1>
                                </CardItem>
                                <CardItem translateZ={20} className="p-2">
                                    <h1>Email</h1>
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    className="flex justify-end items-end border-2 rounded-xl p-2 w-auto hover:border-none hover:bg-white hover:text-secondarycolor transition-all"
                                >
                                    <h1 className="font-medium">
                                        {user?.email}
                                    </h1>
                                </CardItem>
                                <CardItem translateZ={20} className="p-2">
                                    <h1>Phone</h1>
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    className="flex justify-end items-end border-2 rounded-xl p-2 w-auto hover:border-none hover:bg-white hover:text-secondarycolor transition-all"
                                >
                                    <h1 className="font-medium">
                                        {user?.phone}
                                    </h1>
                                </CardItem>
                                <CardItem translateZ={20} className="p-2">
                                    <h1>Age</h1>
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    className="flex justify-end items-end border-2 rounded-xl p-2 w-auto hover:border-none hover:bg-white hover:text-secondarycolor transition-all"
                                >
                                    <h1 className="font-medium ">
                                        {user?.age}
                                    </h1>
                                </CardItem>
                            </div>
                            <CardItem
                                translateZ={20}
                                className=" w-auto justify-end flex py-4 "
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="group bg-no border-2 hover:border-none hover:bg-white hover:text-secondarycolor transition-all"
                                >
                                    <GearIcon className="h-7 w-7 text-white group-hover:text-secondarycolor transition-all" />
                                </Button>
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                </AnimatedDiv>
                <AnimatedDiv
                    direction="right"
                    duration={0.8}
                    className="col-span-2 "
                >
                    <div className=" bg-secondarycolor p-5 ">
                        <h1>Recent purchases</h1>
                        <div>
                            {orderHistory?.map((order) => (
                                <Card
                                    key={order.id}
                                    title={order.event_id}
                                    style={{ width: 300 }}
                                >
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </AnimatedDiv>
                <AnimatedDiv direction="top" duration={0.8}>
                    <div className="flex flex-col items-center justify-center bg-secondarycolor p-5 text-white rounded-xl">
                        <div className="border-4 p-2 rounded-lg w-full ">
                            <h1 className="text-center font-semibold text-[1vw]">
                                FrontRow Points
                            </h1>
                            <h2 className="text-center font-bold text-[3vw]">
                                {user?.point ?? 0}
                            </h2>
                        </div>
                        <div className="w-full ">
                            <h1 className="text-center font-semibold text-2xl py-2">
                                Claimable Rewards
                            </h1>
                            <div className="grid grid-cols-2 gap-4 text-secondarycolor font-bold ">
                                <div className="flex justify-between bg-white p-2 rounded-lg hover:bg-secondarycolor hover:border-white hover:border-4 hover:text-white transition-all">
                                    <h1 className="text-xl">10% OFF</h1>
                                    <h1 className="text-lg">100 pts</h1>
                                </div>
                                <div className="flex justify-between bg-white p-2 rounded-lg hover:bg-secondarycolor hover:border-white hover:border-4 hover:text-white transition-all">
                                    <h1 className="text-xl">10% OFF</h1>
                                    <h1 className="text-lg">100 pts</h1>
                                </div>
                                <div className="flex justify-between bg-white p-2 rounded-lg hover:bg-secondarycolor hover:border-white hover:border-4 hover:text-white transition-all">
                                    <h1 className="text-xl">10% OFF</h1>
                                    <h1 className="text-lg">100 pts</h1>
                                </div>
                                <div className="flex justify-between bg-white p-2 rounded-lg hover:bg-secondarycolor hover:border-white hover:border-4 hover:text-white transition-all">
                                    <h1 className="text-xl">10% OFF</h1>
                                    <h1 className="text-lg">100 pts</h1>
                                </div>
                            </div>
                            <div>
                                <Button
                                    asChild
                                    variant="link"
                                    className="text-white p-0 font-bold text-lg"
                                >
                                    <Link href="/pages/points">Point page</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedDiv>
            </div>
        </div>
    );
};

export default ProfilePage;
