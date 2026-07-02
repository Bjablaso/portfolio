import * as React from "react";
import {useWindowContext} from "../../../Context/useWindowContext.ts";
import type {RunningTab} from "../../../Interfaces/WindowIteface.ts";
import {Chrome} from "../../../assest/Icons/Chrome.tsx";


interface WindowTabProps {
    background: string;
    hashParent: number;
    item: RunningTab;
}

export const WindowTab: React.FC<WindowTabProps> = ({background, hashParent, item}) => {
    const {windowState, dispatch} = useWindowContext();

    const targetApp = windowState.runningApplication.find(app =>
        app.windowState?.runningWindows.some(win => win.hash === hashParent)
    );

    const currentWindow = targetApp?.windowState?.runningWindows.find(
        win => win.hash === hashParent
    );

    if (!targetApp?.windowState || !currentWindow) return null;


    // useEffect(() => {
    //
    // }, []);

    function MinusIcon() {
        const Icon = targetApp?.windowState?.tabControl.iconMinus;
        if (!Icon) return null;
        return (
            <Icon
                className="w-[0.3rem] h-[0.3rem]"
                onClick={(e) => {
                    if (!currentWindow) return;
                    e.stopPropagation();
                    if (currentWindow.windowTab.length > 1) {
                        dispatch({ type: "DELETE_TAB", payload: { windowHash: hashParent, tabHash: item.hash } });
                    } else {
                        dispatch({ type: "EXIT", payload: { hash: hashParent } });
                    }
                }}
            />
        );
    }

    return (
        <div
            className="grid grid-cols-[80%_20%] h-full items-center rounded-t-sm min-w-10 relative top-0.5 p-1 cursor-pointer"
            style={{backgroundColor: background}}
            onClick={() => {

                dispatch({
                    type: "SWITCH_TAB",
                    payload: {windowHash: hashParent, tabHash: item.hash}
                });
            }}
        >
            <div className="flex flex-row gap-1 text-white text-[0.2rem] truncate">
                <div>
                    <Chrome size="size-icon-sm"/>
                </div>

                <div>
                    {item.title}
                </div>
            </div>

            <div className="text-white hover:opacity-70 ">
                {MinusIcon()}
            </div>
        </div>
    );
};

