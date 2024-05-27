import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "react-feather";
import { Separator } from "@/components/ui/separator";

const Navbar: React.FC = () => {
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
                </div>
            </nav>
            
        </div>
    );
};

export default Navbar;
