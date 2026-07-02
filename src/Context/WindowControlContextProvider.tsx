import {useReducer, useRef} from "react";
import * as React from "react";
import {initialWindowStructure, windowReducer} from "../Reducer/WindowReducer.ts";
import { WindowContext } from "./WindowContext.ts";
import type {ChromePage, SystemApplication} from "../Interfaces/WindowIteface.ts";

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

    // function openApplication(appName: string, width: number, height: number) {
    //     if (!canCreateWindow(appName)) return;
    //
    //     dispatch({
    //         type: "CREATE_WINDOW",
    //         payload: { app: appName, windowWidth: width, windowHeight: height },
    //     });
    // }
    function openApplication(
        appName: string,
        width: number,
        height: number,
        chromePage: ChromePage = null
    ) {
        if (!canCreateWindow(appName)) return;

        dispatch({
            type: "CREATE_WINDOW",
            payload: {
                app: appName,
                windowWidth: width,
                windowHeight: height,
                chromePage,
            },
        });
    }


    function systemApplications():SystemApplication[] {
        const someData = windowState.runningApplication.map(app => ({
            applicationName: app.applicationName,
            iconUrl: app.iconUrl,
            minWidth: app.minWindowWidth,
            minHeight: app.minWindowHeight,
        }));
        return someData
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
                   systemApplications
               }
           }
       >
           {children}
       </WindowContext.Provider>
    )
}

