import * as React from "react";

export const Cube: React.FC = () => {
    return (
        <div className="flex items-center justify-center object-contain
        rounded-md relative bottom-3
        ">
            <img   className="
                       h-8
                       h-8
                       text-white
                "
                   src="/assets/box.svg"
                   alt="Edge Icon"
            />

        </div>
    );
};