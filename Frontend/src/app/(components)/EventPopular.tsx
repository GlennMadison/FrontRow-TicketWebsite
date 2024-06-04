import React, { useState } from "react";
import { PopularEvent } from "./Sections/PopularEvent"; // Adjust the path as necessary
import { Combobox } from "./Combobox"; // Adjust the path as necessary

export function EventPopular() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    return (
        <div>
            <Combobox selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
            <PopularEvent selectedRegion={selectedRegion} />
        </div>
    );
}
