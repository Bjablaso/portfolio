
import * as React from "react";
import { useWindowContext } from "../../../Context/useWindowContext.ts";
import type {WindowHeaderPosition} from "../AdaptiveWindow.tsx";

type Padding = "none" | "sm" | "md" | "lg" | "xl";

const paddingSizeMap: Record<Padding, string> = {
    none: "p-0",
    sm: "p-0.2",
    md: "p-1",
    lg: "p-1.5",
    xl: "p-2",
};

type BorderRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

const borderRadiusMap: Record<BorderRadius, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
};
export interface WindowHeaderProps {
    hashParent: number;
    dock: WindowHeaderPosition;
    control: React.ReactNode | null;
    headerBody: React.ReactNode | null;
    searchBarBody?: React.ReactNode | null;
    padding: Padding;
   // outerBgColor?: string;
  //  innerBgColor?: string;
    borderRadius: BorderRadius

}


export const WindowHeader: React.FC<WindowHeaderProps> = ({
                                                              hashParent,
                                                              dock,
                                                              control,
                                                              headerBody,
    searchBarBody,
                                                              padding = "none",
                                                             // innerBgColor = "#222222",
                                                              borderRadius = "none",
                                                          }) => {
    const { windowState } = useWindowContext();

    const targetApp = windowState.runningApplication.find(app =>
        app.windowState?.runningWindows.some(win => win.hash === hashParent)
    );

    const currentWindow = targetApp?.windowState?.runningWindows.find(
        win => win.hash === hashParent
    );

    if (!targetApp?.windowState || !currentWindow) return null;
   // const windowHashX = currentWindow?.hash;

    const isHorizontalHeader = dock === "top" || dock === "bottom";

    const headerDirection = isHorizontalHeader
        ? "flex-row"
        : "flex-col";


    const controlSize = isHorizontalHeader
        ? "basis-[40px] shrink-0 h-full"
        : "basis-[20px] shrink-0 w-full";

    const bodySize = isHorizontalHeader
        ? "flex-1 min-w-0 h-full"
        : "flex-1 min-h-0 w-full";

    const extraSize = isHorizontalHeader
        ? "basis-[10%] shrink-0 h-full"
        : "basis-[10%] shrink-0 w-full";

    const paddingSize = paddingSizeMap[padding];
    const radiusSize = borderRadiusMap[borderRadius];

    return (
        <div
            className={`flex flex-col
            w-full 
            h-full 
            overflow-hidden 
            ${paddingSize}
            flex items-center justify-center
            window-outerbody-color
           `
        }
            // style={{
            //     backgroundColor: outerBgColor,
            // }}
        >
            <div
                className={`
                    flex ${headerDirection}
                    w-full h-full
                    overflow-hidden
              
                    items-center justify-center
                   
                  
                    ${radiusSize}
                `}
                // style={{
                //     backgroundColor: innerBgColor,
                // }}
            >
                <div className={`${controlSize} top-0.5 `}>
                         {control}
                </div>

                <div className={`${bodySize} overflow-hidden `}>
                    {headerBody}
                </div>

                <div className={`${extraSize} flex items-center justify-center`}>
                </div>
            </div>
            {searchBarBody ? (
                <div className={` flex ${headerDirection}
                    w-full h-full
                    overflow-hidden`}>
                    {searchBarBody}
                </div>
            ) : null}


        </div>
    );
};
