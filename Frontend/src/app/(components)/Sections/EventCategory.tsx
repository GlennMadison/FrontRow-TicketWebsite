import { CarouselMultiple } from "../CarouselMultiple";



export function EventCategory() {
    return (
        <div className=" h-auto  flex justify-center  ">
            <div className="  rounded-2xl pt-5 bg-white shadow-2xl drop-shadow-2xl shadow-black/25  ">
                <h1 className="text-primaryred font-bold text-3xl pb-3 px-8">
                    Event Category
                </h1>
                <div>
                    <CarouselMultiple carouselItemClass="md:basis-1/2 lg:basis-1/6">
                        <div className="group drop-shadow-lg relative m-2 hover:m-0 transition-all rounded-lg bg-cover bg-center aspect-square flex items-end justify-center">
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity rounded-lg"></div>
                            
                        </div>
                    </CarouselMultiple>
                </div>
            </div> 
        </div>
    );
}
