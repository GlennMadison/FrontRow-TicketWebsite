"use client";

import * as React from "react";
import { Map, MapPin } from "react-feather";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
    value: string;
    label: string;
};

const statuses: Status[] = [
    {
        value: "jakarta",
        label: "Jakarta",
    },
    {
        value: "Bandung",
        label: "Bandung",
    },
];

const currentLocation = statuses[0];

export function Combobox() {
    const [open, setOpen] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
        null
    );

    return (
        <div className="flex items-center space-x-4">
            <p className="text-3xl text-white font-semibold">Popular Event in</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="justify-center  bg-primarycolor text-white text-2xl border-secondarycolor border-2 "
                    >
                        {selectedStatus ? (
                            <>{selectedStatus.label}</>
                        ) : (
                            <>{currentLocation.label}</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 " side="right" align="start">
                    <Command>
                        <CommandInput placeholder="Cari Lokasi..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {statuses.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        value={status.value}
                                        onSelect={(value) => {
                                            setSelectedStatus(
                                                statuses.find(
                                                    (priority) =>
                                                        priority.value === value
                                                ) || null
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        <div className="flex py-2 group ">
                                            <MapPin size={20} className="opacity-50 group-hover:text-secondarycolor transition-colors" />
                                            <div className="px-2 group-hover:text-secondarycolor  transition-colors">{status.label}</div>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
