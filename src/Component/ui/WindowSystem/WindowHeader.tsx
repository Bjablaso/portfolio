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
    control: React.ReactNode | null;
    headerBody: React.ReactNode | null;

}

export const WindowHeader: React.FC<WindowHeaderProps> = ({
                                                              hashParent,
                                                              dock,
                                                              control,
                                                              headerBody,
                                                          }) => {
    const { windowState, dispatch } = useWindowContext();

    const targetApp = windowState.runningApplication.find(app =>
        app.windowState?.runningWindows.some(win => win.hash === hashParent)
    );

    const currentWindow = targetApp?.windowState?.runningWindows.find(
        win => win.hash === hashParent
    );

    if (!targetApp?.windowState || !currentWindow) return null;
    const windowHashX = currentWindow?.hash;

    const isHorizontalHeader = dock === "top" || dock === "bottom";

    const headerDirection = isHorizontalHeader
        ? "flex-row"
        : "flex-col";

    const sectionCrossSize = isHorizontalHeader
        ? "h-full"
        : "w-full";

    const controlSize = isHorizontalHeader
        ? "basis-[40px] shrink-0 h-full"
        : "basis-[40px] shrink-0 w-full";

    const bodySize = isHorizontalHeader
        ? "flex-1 min-w-0 h-full"
        : "flex-1 min-h-0 w-full";

    const extraSize = isHorizontalHeader
        ? "basis-[10%] shrink-0 h-full"
        : "basis-[10%] shrink-0 w-full";

    const tabDirection = isHorizontalHeader
        ? "flex-row"
        : "flex-col";

    const controlDirection = isHorizontalHeader
        ? "row"
        : "column";

    function PlusIcon() {
        const Icon = targetApp?.windowState?.tabControl.iconAdd;
        if (!Icon) return null;

        return (
            <Icon
                className="w-[0.3rem] h-[0.3rem] text-white hover:opacity-70 "
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
            className={`flex ${headerDirection} 
            w-full 
            h-full 
            overflow-hidden 
            border-2 border-white`
        }
        >
            <div className={`${controlSize} border-2 border-blue-600`}>
                {control}
            </div>

            <div className={`${bodySize} border-2 border-amber-200 overflow-hidden`}>
                {/* tabs/body */}
            </div>

            <div className={`${extraSize} border-2 border-green-500 flex items-center justify-center`}>
                {/* add button/search/extra */}
            </div>

            {/*<div className={isHorizontalHeader ? "basis-[60%]" : "basis-[35%]"}>*/}
            {/*    <div*/}
            {/*        className={`*/}
            {/*            w-full*/}
            {/*            h-full*/}
            {/*            items-center*/}
            {/*            ${*/}
            {/*            isHorizontalHeader*/}
            {/*                ? "grid grid-cols-[40px_1fr_10%]"*/}
            {/*                : "flex flex-col"*/}
            {/*        }*/}
            {/*        `}*/}
            {/*    >*/}

                    {/*<div className="flex w-full h-full items-center justify-center text-white p-1 gap-0.5 rounded-sm min-w-[40px] min-h-[16px]">*/}
                    {/*    <WindowControl*/}
                    {/*        hashParent={hashParent}*/}
                    {/*        direction={controlDirection}*/}
                    {/*    />*/}
                    {/*</div>*/}

            {/*        <div className="w-full h-full min-w-0 min-h-0 overflow-hidden">*/}
            {/*            <div*/}
            {/*                className={`*/}
            {/*                    flex*/}
            {/*                    ${tabDirection}*/}
            {/*                    w-full*/}
            {/*                    h-full*/}
            {/*                    overflow-auto*/}
            {/*                    gap-1*/}
            {/*                `}*/}
            {/*            >*/}
            {/*                {currentWindow?.windowTab.map((item) => {*/}
            {/*                    if (!item.isRunning) return null;*/}

            {/*                    const background = item.isCurrentTab*/}
            {/*                        ? "#373a3c"*/}
            {/*                        : "#111111";*/}

            {/*                    return (*/}
            {/*                        <div*/}
            {/*                            className={`*/}
            {/*                                flex*/}
            {/*                                ${tabDirection}*/}
            {/*                                items-center*/}
            {/*                                gap-1*/}
            {/*                            `}*/}
            {/*                            key={item.hash}*/}
            {/*                        >*/}
            {/*                            <WindowTab*/}
            {/*                                background={background}*/}
            {/*                                item={item}*/}
            {/*                                hashParent={hashParent}*/}
            {/*                            />*/}

            {/*                            {item.isCurrentTab && (*/}
            {/*                                <div className="flex w-full h-full items-center justify-center text-white relative top-0.5">*/}
            {/*                                    {PlusIcon()}*/}
            {/*                                </div>*/}
            {/*                            )}*/}
            {/*                        </div>*/}
            {/*                    );*/}
            {/*                })}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div*/}
            {/*    className={`*/}
            {/*        ${isHorizontalHeader ? "basis-[40%]" : "basis-[65%]"}*/}
            {/*        w-full*/}
            {/*        h-full*/}
            {/*        bg-[#373a3c]*/}
            {/*        rounded-t-sm*/}
            {/*        p-0.5*/}
            {/*        min-w-0*/}
            {/*        min-h-0*/}
            {/*    `}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        className={`*/}
            {/*            flex*/}
            {/*            ${isHorizontalHeader ? "flex-row" : "flex-col"}*/}
            {/*            w-full*/}
            {/*            h-full*/}
            {/*        `}*/}
            {/*    >*/}
            {/*        <div className={isHorizontalHeader ? "basis-[15%]" : "basis-[10%]"} />*/}

            {/*        <div className="flex items-center justify-center basis-[80%]">*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                className="*/}
            {/*                    bg-[#111111]*/}
            {/*                    rounded-full*/}
            {/*                    text-[#d9dbd8]*/}
            {/*                    text-[0.2rem]*/}
            {/*                    w-full*/}
            {/*                    h-full*/}
            {/*                    pl-1*/}
            {/*                    caret-white*/}
            {/*                     outline-none*/}
            {/*                "*/}
            {/*                onMouseDown={e => e.stopPropagation()}*/}
            {/*                placeholder="Ask google something"*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div className={isHorizontalHeader ? "basis-[15%]" : "basis-[10%]"} />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};
