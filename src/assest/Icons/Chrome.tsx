
import * as React from "react";
import { useWindowContext } from "../../Context/useWindowContext.ts";

export const Chrome: React.FC = () => {
    const { openApplication } = useWindowContext();

    return (
        <div
            className="flex items-center justify-center object-contain rounded-md hover:opacity-40 cursor-pointer"
            // Chrome dock icon
            onClick={() => openApplication("Chrome", 340, 220, "google")}
        >
            <img
                className="h-4"
                src="/assets/chrome.svg"
                alt="Chrome Icon"
            />
        </div>
    );
};