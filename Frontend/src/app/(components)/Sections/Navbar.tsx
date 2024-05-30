"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "react-feather";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/action"
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
    const [email, setEmail] = useState<string | undefined>();
    useEffect(() => {
        // Fetch session data when the component mounts
        const fetchSessionData = async () => {
            try {
                const session = await getSession();
                setEmail(session.email); // Set the username from the session data
            } catch (error) {
                console.error('Error fetching session data:', error);
            }
        };

        fetchSessionData();
    }, []);

    return (
        <div className="flex-col justify-center items-center">
            <nav className="flex items-center justify-between p-3 py-5 ">
                <h1 className="text-white">FrontRow</h1>

                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        className="max-w-xl"
                        placeholder="Cari event seru..."
                    />
                    <Button type="submit" variant="outline" size="icon">
                        <Search className=" size-4"></Search>
                    </Button>
                </div>

                <div className="flex items-center content-between">

                    
                    <Button
                        className="text-white border-white border-2"
                        variant={"ghost"}
                    >
                        Masuk
                    </Button>
                    
                    {/* <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}
                <h1 className="text-white">{email}</h1>
                </div>
            </nav>
            
        </div>
    );
};

export default Navbar;
