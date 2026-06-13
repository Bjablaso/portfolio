import * as React from "react";
import {useWindowContext} from "../../../Context/useWindowContext.ts";
import type {RunningTab} from "../../../Interfaces/WindowIteface.ts";


interface WindowTabProps {
    background: string;
    hashParent: number;
    item: RunningTab;
}

export const WindowTab: React.FC<WindowTabProps> = ({background, hashParent, item}) => {
    const {windowState, dispatch} = useWindowContext();
    const currentWindow = windowState.runningWindows.find(
        win => win.hash === hashParent  // ✅ always points to the right window
    );


    function MinusIcon() {
        const Icon = windowState.tabControl.iconMinus;
        return (
            <Icon
                className="w-[0.3rem] h-[0.3rem]"
                onClick={(e) => {
                    if(!currentWindow) return
                    e.stopPropagation();
                    if(currentWindow?.windowTab.length > 1) {
                        dispatch({
                            type: "DELETE_TAB",
                            payload: {windowHash: hashParent, tabHash: item.hash}
                        });
                    }else {
                        dispatch({
                            type: "EXIT",
                            payload: {hash: hashParent}
                        })

                    }

                }}
            />
        );
    }

    return (
        <div
            className="grid grid-cols-[80%_20%] h-full items-center rounded-t-sm min-w-10 relative top-0.5 p-0.5 cursor-pointer"
            style={{backgroundColor: background}}
            onClick={() => {

                dispatch({
                    type: "SWITCH_TAB",
                    payload: {windowHash: hashParent, tabHash: item.hash}
                });
            }}
        >
            <div className="text-white text-[0.2rem] truncate">{item.title}</div>
            <div className="text-white hover:opacity-70">
                {MinusIcon()}
            </div>
        </div>
    );
};

