import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenuDemo } from "./NavigationMenu";
import { Input } from "@/components/ui/input";

const Navbar: React.FC = () => {
    return (
        <nav className="flex items-center  justify-between p-3 bg-slate-800 py-3 ">
            <h1 className="text-white px-10">FrontRow</h1>
            <Input className="max-w-xl	" placeholder="Cari event seru..." />
            <div className="flex items-center content-between">
                <div className="px-10">
                    <NavigationMenuDemo />
                </div>
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};

export default Navbar;
