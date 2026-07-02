

import { useWindowContext } from "../../Context/useWindowContext.ts";


export const Chrome = ({size}: {size: string}) => {
    const { openApplication } = useWindowContext();

    return (
        <div
            className="flex items-center justify-center object-contain rounded-md hover:opacity-40 cursor-pointer"
            // Chrome dock icon
            onClick={() => openApplication("Chrome", 340, 220, "google")}
        >
            <img
                className={`${size}`}
                src="/assets/chrome.svg"
                alt="Chrome Icon"
            />
        </div>
    );
};
//"h-4"

//{item.title}