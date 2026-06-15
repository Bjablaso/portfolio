// import * as React from "react";
// import {WindowTab} from "./WindowTab.tsx";
// import {WindowControl} from "./WindowControl.tsx";
import * as React from "react";
import { WindowTab } from "./WindowTab.tsx";
import { WindowControl } from "./WindowControl.tsx";
import { useWindowContext } from "../../../Context/useWindowContext.ts";
import type {WindowHeaderPosition} from "../AdaptiveWindow.tsx";

export interface WindowHeaderProps {
    hashParent: number;
    dock: WindowHeaderPosition;
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({
                                                              hashParent,
                                                              dock,
                                                          }) => {
    const { windowState, dispatch } = useWindowContext();

    const currentWindow = windowState.runningWindows.find(
        (win) => win.hash === hashParent
    );

    const windowHashX = currentWindow?.hash;

    const isHorizontalHeader = dock === "top" || dock === "bottom";

    const headerDirection = isHorizontalHeader
        ? "flex-col"
        : "flex-row";

    const tabDirection = isHorizontalHeader
        ? "flex-row"
        : "flex-col";

    const controlDirection = isHorizontalHeader
        ? "row"
        : "column";

    function PlusIcon() {
        const Icon = windowState.tabControl.iconAdd;

        return (
            <Icon
                className="w-[0.3rem] h-[0.3rem] text-white hover:opacity-70"
                onClick={(e) => {
                    e.stopPropagation();

                    if (!windowHashX) return;

                    dispatch({
                        type: "CREATE_TAB",
                        payload: {
                            title: "newTab",
                            windowHash: windowHashX,
                        },
                    });
                }}
            />
        );
    }

    return (
        <div
            className={`
                flex
                ${headerDirection}
                w-full
                h-full
                overflow-hidden
            `}
        >
            <div className={isHorizontalHeader ? "basis-[60%]" : "basis-[35%]"}>
                <div
                    className={`
                        w-full
                        h-full
                        items-center
                        ${
                        isHorizontalHeader
                            ? "grid grid-cols-[30px_1fr_10%]"
                            : "flex flex-col"
                    }
                    `}
                >
                    <div className="flex items-center justify-center text-white p-0.5 gap-0.5 rounded-sm">
                        <WindowControl
                            hashParent={hashParent}
                            direction={controlDirection}
                        />
                    </div>

                    <div className="w-full h-full min-w-0 min-h-0 overflow-hidden">
                        <div
                            className={`
                                flex
                                ${tabDirection}
                                w-full
                                h-full
                                overflow-auto
                                gap-1
                            `}
                        >
                            {currentWindow?.windowTab.map((item) => {
                                if (!item.isRunning) return null;

                                const background = item.isCurrentTab
                                    ? "#373a3c"
                                    : "#111111";

                                return (
                                    <div
                                        className={`
                                            flex
                                            ${tabDirection}
                                            items-center
                                            gap-1
                                        `}
                                        key={item.hash}
                                    >
                                        <WindowTab
                                            background={background}
                                            item={item}
                                            hashParent={hashParent}
                                        />

                                        {item.isCurrentTab && (
                                            <div>
                                                {PlusIcon()}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`
                    ${isHorizontalHeader ? "basis-[40%]" : "basis-[65%]"}
                    w-full
                    h-full
                    bg-[#373a3c]
                    rounded-t-sm
                    p-0.5
                    min-w-0
                    min-h-0
                `}
            >
                <div
                    className={`
                        flex
                        ${isHorizontalHeader ? "flex-row" : "flex-col"}
                        w-full
                        h-full
                    `}
                >
                    <div className={isHorizontalHeader ? "basis-[15%]" : "basis-[10%]"} />

                    <div className="flex items-center justify-center basis-[80%]">
                        <input
                            type="text"
                            className="
                                bg-[#111111]
                                rounded-full
                                text-[#d9dbd8]
                                text-[0.2rem]
                                w-full
                                h-full
                                pl-1
                                caret-white
                            "
                            placeholder="Ask google something"
                        />
                    </div>

                    <div className={isHorizontalHeader ? "basis-[15%]" : "basis-[10%]"} />
                </div>
            </div>
        </div>
    );
};

// import {useWindowContext} from "../../../Context/useWindowContext.ts";
//
// export interface WindowHeaderProps {
//     hashParent: number;
// }
//
// export const WindowHeader: React.FC<WindowHeaderProps> = ({hashParent}) => {
//     const {windowState, dispatch} = useWindowContext();
//
//     const currentWindow = windowState.runningWindows.find(
//         win => win.hash === hashParent
//     );
//     const windowHashX = currentWindow?.hash;
//
//     function PlusIcon() {
//         const Icon = windowState.tabControl.iconAdd;
//         return (
//             <Icon
//                 className="w-[0.3rem] h-[0.3rem] text-white hover:opacity-70"
//                 onClick={() => {
//                     if (!windowHashX) return;
//                     dispatch({
//                         type: "CREATE_TAB",
//                         payload: {title: "newTab", windowHash: windowHashX}
//                     });
//                 }}
//             />
//         );
//     }
//
//     return (
//         <div className="flex flex-col w-full h-full">
//
//             <div className="basis-[60%]">
//                 <div className="grid grid-cols-[30px_1fr_10%] w-full h-full items-center">
//
//                     <div className="flex items-center text-white p-0.5 gap-0.5 rounded-sm">
//                         <WindowControl hashParent={hashParent}/>
//                     </div>
//
//                     <div className="w-full h-full">
//                         <div className="flex flex-row w-full h-full overflow-hidden">
//                             {currentWindow?.windowTab.map((item) => {
//                                 if (!item.isRunning) return null;
//
//                                 const background = item.isCurrentTab
//                                     ? '#373a3c'
//                                     : '#111111';
//
//                                 return (
//                                     <div
//                                         className="flex flex-row items-center gap-1"
//                                         key={item.hash}
//                                     >
//                                         <WindowTab
//                                             background={background}
//                                             item={item}
//                                             hashParent={hashParent}
//                                         />
//                                         {item.isCurrentTab && (
//                                             <div className="relative top-0.5">
//                                                 {PlusIcon()}
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="basis-[40%] w-full h-full bg-[#373a3c] rounded-t-sm p-0.02">
//                 <div className="flex flex-row w-full h-full">
//                     <div className="basis-[15%]"></div>
//                     <div className="basis-[70%] p-0.5 flex items-center justify-center">
//                         <input
//                             type="text"
//                             className="
//                                 bg-[#111111] rounded-full
//                                 text-[#d9dbd8] text-[0.2rem]
//                                 w-full h-full pl-1
//                                 caret-white
//                             "
//                             placeholder="Ask google something"
//                         />
//                     </div>
//                     <div className="basis-[15%]"></div>
//                 </div>
//             </div>
//
//         </div>
//     );
// };
