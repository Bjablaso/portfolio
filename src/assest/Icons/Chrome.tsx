
import * as React from "react";
import { useWindowContext } from "../../Context/useWindowContext.ts";

export const Chrome: React.FC = () => {
    const { openApplication } = useWindowContext();

    return (
        <div
            className="flex items-center justify-center object-contain rounded-md hover:opacity-40 cursor-pointer"
            onClick={()=> openApplication("Chrome", 280, 180)}
        >
            <img
                className="h-4"
                src="/assets/edge-svgrepo-com.svg"
                alt="Chrome Icon"
            />
        </div>
    );
};