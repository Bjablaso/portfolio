// @flow
import * as React from 'react';
import {useWindowContext} from "../../../Context/useWindowContext.ts";
import type {WindowHeaderProps} from "./WindowHeader.tsx";


// interface WindowControlProps {
//     windowHash: number;
// }

export const WindowControl:React.FC<WindowHeaderProps> =({hashParent}) => {

    const {windowState, dispatch} = useWindowContext();
    const currentWindow = windowState.runningWindows.find(
        win => win.hash === hashParent  // ✅ always points to the right window
    );
    const windowHash = currentWindow?.hash;


    return (
        <div className="flex flex-row w-full h-full items-center gap-0.5 ">
            {windowState.windowControl.map((control) => {
                const Icon = control.icon;


                return (
                    <div
                        className=" rounded-full p-0.5 text-black  hover:opacity-70"
                        style={{
                            backgroundColor: control.color,
                        }}
                        key={control.id}
                        onClick={()=>{
                            if (!windowHash) return;

                            dispatch({
                                type: control.description.toUpperCase() as "EXIT" | "MINIMIZE" | "EXPAND",
                                payload: {hash: windowHash}
                            })
                        }}
                    >
                        <Icon width="3" height="3" />
                    </div>
                );
            })}
        </div>
    );
};