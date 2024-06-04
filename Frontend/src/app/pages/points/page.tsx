import { useEffect, useState } from "react";

export default function Points() {
    return (
        <div className="min-h-screen p-10 text-white flex flex-col items-center">
            <div className=" p-2 rounded-lg w-[60vw] bg-secondarycolor   ">
                <h1 className="text-center font-semibold text-[1vw]">
                    FrontRow Points
                </h1>
                <h2 className="text-center font-bold text-[3vw]">1423</h2>
            </div>
            <div className="py-6">
                <h1 className="text-4xl text-center ">
                    Redeem Points For Rewards
                </h1>
                <div className="grid grid-cols-3 w-[60vw] gap-4 ">
                    <div className=" group m-2 hover:m-0 transition-all bg-gradient-to-tr from-orange-500 to-secondarycolor flex flex-col justify-center items-center rounded-lg p-5">
                        <h1 className="text-3xl font-semibold group-hover:text-4xl transition-all">
                            10% OFF
                        </h1>
                        <h1 className="pt-2 pb-1 text-lg font-medium">
                            100 Points
                        </h1>
                        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border-2  bg-[linear-gradient(110deg,#FFC94A,50%,#F29B72,55%,#FFC94A)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-secondarycolor">
                            REDEEM
                        </button>
                    </div>
                    <div className=" group m-2 hover:m-0 transition-all bg-gradient-to-tr from-orange-500 to-secondarycolor flex flex-col justify-center items-center rounded-lg p-5">
                        <h1 className="text-3xl font-semibold group-hover:text-4xl transition-all">
                            10% OFF
                        </h1>
                        <h1 className="pt-2 pb-1 text-lg font-medium">
                            100 Points
                        </h1>
                        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border-2  bg-[linear-gradient(110deg,#FFC94A,50%,#F29B72,55%,#FFC94A)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-secondarycolor">
                            REDEEM
                        </button>
                    </div>
                    <div className=" group m-2 hover:m-0 transition-all bg-gradient-to-tr from-orange-500 to-secondarycolor flex flex-col justify-center items-center rounded-lg p-5">
                        <h1 className="text-3xl font-semibold group-hover:text-4xl transition-all">
                            10% OFF
                        </h1>
                        <h1 className="pt-2 pb-1 text-lg font-medium">
                            100 Points
                        </h1>
                        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border-2  bg-[linear-gradient(110deg,#FFC94A,50%,#F29B72,55%,#FFC94A)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-secondarycolor">
                            REDEEM
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-4xl text-center ">Points Activity</h1>
                <div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
