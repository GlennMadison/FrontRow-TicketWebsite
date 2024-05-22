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
        <Card className="w-[350px]">
            <CardHeader>
                <img
                    className=""
                    src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1715920542_Om8rLV.png"
                    alt=""
                />
                <CardTitle>Ignite Your Thrills</CardTitle>
                <CardDescription>28 Jul 2024</CardDescription>
                <CardDescription className="font-bold">
                    Rp. 1.277.000
                </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    );
}
