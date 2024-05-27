import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const desc =
    "Nulla deserunt amet cupidatat eiusmod proident consequat sunt adipisicing pariatur. Veniam mollit eiusmod laboris aute proident ipsum id nostrud. Eiusmod ipsum cillum nisi laborum veniam. Eiusmod id ea amet et incididunt culpa sunt est id non. Quis laborum reprehenderit labore amet exercitation velit fugiat Lorem eiusmod sint. Officia eiusmod non occaecat laboris adipisicing fugiat Lorem ea veniam ipsum laboris duis. Sunt eu duis eu cupidatat ea esse nisi nisi et occaecat ad enim. Sunt elit quis amet non anim incididunt ex magna consequat nisi in deserunt. Est aliquip cupidatat magna sint. Officia voluptate cillum enim tempor pariatur Lorem. Et aliqua veniam excepteur dolor officia tempor ullamco eiusmod amet laborum. Voluptate occaecat amet incididunt laboris elit aute dolor fugiat duis non enim consectetur excepteur occaecat. Veniam consequat cupidatat minim occaecat in dolore. Dolore proident excepteur deserunt ea sit amet. Dolore aliqua quis nostrud laborum irure deserunt aliqua magna consectetur nulla enim. Amet reprehenderit veniam aute dolor nostrud. Ex aliquip excepteur eiusmod non qui. Ullamco minim incididunt irure nostrud veniam magna esse pariatur ea velit excepteur sint amet elit. Non commodo amet commodo qui in anim quis labore anim. Tempor commodo deserunt ea dolor aliqua enim anim ipsum duis veniam pariatur consectetur fugiat cupidatat. Veniam id est voluptate laborum fugiat adipisicing commodo non. Occaecat occaecat amet id est dolore nostrud anim labore cupidatat velit ullamco. Consequat culpa cupidatat nulla occaecat sunt nisi adipisicing ad.";

export default function event() {
    return (
        <div className="h-auto bg-primarycolor flex justify-center max-w">
            <div className="flex-col justify-center">
                <div className="w-[40vw] py-5  ">
                    <img
                        className="rounded-lg "
                        src="https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240512181214_6640a40e4f368.jpg"
                    ></img>
                </div>
                <Tabs defaultValue="description">
                    <TabsList className="grid w-full grid-cols-2 bg-primarycolor">
                        <TabsTrigger value="description" className="">
                            Description
                        </TabsTrigger>
                        <TabsTrigger value="ticket" className="">
                            Ticket
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="description">
                        <ScrollArea className="max-w-3xl h-[40vw] rounded-md py-4 text-white ">
                            {desc}
                            {desc}
                            {desc}
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="ticket">
                        <ScrollArea className="max-w-3xl h-[40vw] rounded-md py-4 text-white ">
                            <div className="border-secondarycolor shadow-lg shadow-secondarycolor border-2 font-semibold m-3 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xl">
                                            <h1>PROMO BCA - VVIP LEFT</h1>
                                        </div>
                                        <div className="text-md font-light">
                                            <h1>
                                                Berakhir 28 July 2024 12:00 WIB
                                            </h1>
                                        </div>
                                    </div>
                                    <div>
                                        <Button variant="outline" size="icon" >
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <Separator className="my-4 " />
                                <div className="flex items-center justify-between">
                                    <div className="text-lg font-bold">
                                        <h1>Rp 1.000.000</h1>
                                    </div>
                                    <div className="text-secondarycolor">
                                        <h1>Available</h1>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
