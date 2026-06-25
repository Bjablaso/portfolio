import {useReducer, useRef} from "react";
import * as React from "react";
import {initialWindowStructure, windowReducer} from "../Reducer/WindowReducer.ts";
import { WindowContext } from "./WindowContext.ts";

interface WindowControlProps {
    children: React.ReactNode;
}

export const WindowControlContextProvider:React.FC<WindowControlProps> = ({children}) => {
    const [windowState, dispatch]= useReducer( windowReducer,initialWindowStructure )
    const windowRef = useRef<HTMLDivElement | null>(null);
    const parentRef = useRef<HTMLDivElement | null>(null);

    function canCreateWindow(appName: string): boolean {
        const app = windowState.runningApplication.find(
            app => app.applicationName === appName
        );

        if (!app?.windowState) return false;

        return app.windowState.runningWindows.length < app.windowState.maxWindow;
    }

    function openApplication(appName: string, width: number, height: number) {
        if (!canCreateWindow(appName)) return;

        dispatch({
            type: "CREATE_WINDOW",
            payload: { app: appName, windowWidth: width, windowHeight: height },
        });
    }

    return(
       <WindowContext.Provider
           value={
               {
                   windowState,
                   dispatch,
                   windowRef,
                   parentRef,
                   openApplication,
                   canCreateWindow,
               }
           }
       >
           {children}
       </WindowContext.Provider>
    )
}

