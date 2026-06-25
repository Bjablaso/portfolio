// src/Component/ui/WindowSystem/EdgeTab.tsx

import * as React from "react";
import { WindowTab } from "./WindowTab.tsx";
import { useWindowContext } from "../../../Context/useWindowContext.ts";
import type { WindowHeaderPosition } from "../AdaptiveWindow.tsx";

interface EdgeTabProps {
    hashParent: number;
    dock: WindowHeaderPosition;
}

export const EdgeTab: React.FC<EdgeTabProps> = ({
                                                    hashParent,
                                                    dock,
                                                }) => {
    const { windowState, dispatch } = useWindowContext();

    const targetApp = windowState.runningApplication.find(app =>
        app.windowState?.runningWindows.some(win => win.hash === hashParent)
    );

    const currentWindow = targetApp?.windowState?.runningWindows.find(
        win => win.hash === hashParent
    );

    if (!targetApp?.windowState || !currentWindow) return null;

    const isHorizontalHeader = dock === "top" || dock === "bottom";

    const tabDirection = isHorizontalHeader ? "flex-row" : "flex-col";

    const AddIcon = targetApp.windowState.tabControl.iconAdd;

    const addTab = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();

        dispatch({
            type: "CREATE_TAB",
            payload: {
                title: "newTab",
                windowHash: hashParent,
            },
        });
    };

    return (
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
                {currentWindow.windowTab.map(item => {
                    if (!item.isRunning) return null;

                    const background = item.isCurrentTab
                        ? "#373a3c"
                        : "#111111";

                    return (
                        <div
                            key={item.hash}
                            className={`
                                flex
                                ${tabDirection}
                                items-center
                                gap-1
                            `}
                        >
                            <WindowTab
                                background={background}
                                item={item}
                                hashParent={hashParent}
                            />

                            {item.isCurrentTab && (
                                <div className="flex w-full h-full items-center justify-center text-white relative top-0.5">
                                    <AddIcon
                                        className="w-[0.3rem] h-[0.3rem] text-white hover:opacity-70 cursor-pointer"
                                        onMouseDown={e => e.stopPropagation()}
                                        onClick={addTab}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};