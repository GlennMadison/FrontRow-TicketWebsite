import { CarouselSingular } from "./CarouselSingular";
import { CarouselMultiple } from "./CarouselMultiple";
import { EventCard } from "./EventCard";
import { Banner } from "./Banner";

export default function Hero() {
    return (
        <div className="bg-white  h-auto flex justify-center items-center">
            <div className="flex flex-col justify-between items-center p-4 ">
                <div className="py-3">
                    <CarouselSingular></CarouselSingular>
                </div>
                <div className="  ">
                    <h1 className="text-primaryred font-bold text-3xl pb-2 px-8">
                        Event Pilihan
                    </h1>
                    <CarouselMultiple>
                        <div className="drop-shadow-xl hover:shadow-primaryred hover:shadow-lg rounded-lg transition-all duration-600">
                            <EventCard />
                        </div>
                    </CarouselMultiple>
                </div>

                <div>
                    <Banner src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/temporary/20240513/1715595700_AENa5W.jpg"></Banner>
                </div>
            </div>
        </div>
    );
}
