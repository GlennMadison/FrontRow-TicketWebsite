import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function EventCard() {
    return (
        <Card >
            <CardHeader>
                <img
                    className="rounded-lg w-full h-48  object-cover"
                    src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1715920542_Om8rLV.png"
                    alt=""
                />
                <CardTitle className="py-2">Ignite Your Thrills</CardTitle>
                <CardDescription>28 Jul 2024</CardDescription>
                <CardDescription className="font-bold">
                    Rp. 1.277.000
                </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
                <Button>Daftar</Button>
                <Button variant="outline">Detail</Button>
            </CardFooter>
        </Card>
    );
}
