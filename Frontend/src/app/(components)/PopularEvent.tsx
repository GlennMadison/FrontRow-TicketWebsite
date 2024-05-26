import { Combobox } from "./Combobox";
import { EventCard } from "./EventCard";

const eventCount = 4;

export function PopularEvent() {
    return (
        <div className="h-auto flex justify-center items-center">
            <div className="flex-col justify-center item max-w-6xl rounded-2xl">
                <div className="px-8">
                    <Combobox />
                </div>
                <div className="flex justify-between">
                    {[...Array(eventCount)].map((_, index) => (
                        <div className="p-2" key={index}>
                            <EventCard />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
