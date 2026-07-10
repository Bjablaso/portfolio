import { useReducer, useRef } from "react";
import * as React from "react";

import {
    initialWindowStructure,
    windowReducer,
} from "../Reducer/WindowReducer.ts";

import { WindowContext } from "./WindowContext.ts";

import type {
    ChromePage,
    SystemApplication,
    WindowState,
} from "../Interfaces/WindowIteface.ts";

interface WindowControlProps {
    children: React.ReactNode;
}

export const WindowControlContextProvider: React.FC<
    WindowControlProps
> = ({ children }) => {
    const [windowState, dispatch] = useReducer(
        windowReducer,
        initialWindowStructure
    );

    const windowRef = useRef<HTMLDivElement | null>(null);
    const parentRef = useRef<HTMLDivElement | null>(null);

    /**
     * Counts only the windows belonging to the selected application.
     */
    function canCreateWindow(appName: string): boolean {
        const app = windowState.runningApplication.find(
            currentApp => currentApp.applicationName === appName
        );

        if (!app) {
            return false;
        }

        const numberOfOpenWindows = Array.from(
            windowState.openAppWindow.values()
        ).filter(window => {
            return (
                window.app === appName &&
                !window.isClosed
            );
        }).length;

        return numberOfOpenWindows < app.maxWindow;
    }

    /**
     * The final Map entry represents the foreground window.
     */
    function getActiveContext() {
        const openWindows = Array.from(
            windowState.openAppWindow.values()
        ).filter(window => !window.isClosed);

        const currentWindow: WindowState | null =
            openWindows.at(-1) ?? null;

        const activeApp = currentWindow
            ? windowState.runningApplication.find(
            app =>
                app.applicationName === currentWindow.app
        ) ?? null
            : windowState.runningApplication.find(
            app => app.applicationName === "Preview"
        ) ?? null;

        const currentTab =
            currentWindow?.windowTab.find(
                tab => tab.isCurrentTab
            ) ?? null;

        const tabArrayLength =
            currentWindow?.windowTab.length ?? 0;

        return {
            activeApp,
            currentWindow,
            currentTab,
            tabArrayLength,
        };
    }

    function openApplication(
        appName: string,
        width: number,
        height: number,
        chromePage: ChromePage = null
    ): void {
        if (!canCreateWindow(appName)) {
            return;
        }

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

    function closeWindow(windowID: string): void {
        dispatch({
            type: "EXIT",
            payload: {
                windowID,
            },
        });
    }

    function moveWindowToFront(windowID: string): void {
        dispatch({
            type: "SWITCH_WINDOW",
            payload: {
                windowID,
            },
        });
    }

    function openNewTab(
        windowID: string,
        tabTitle: string
    ): void {
        dispatch({
            type: "CREATE_TAB",
            payload: {
                title: tabTitle,
                windowID,
            },
        });
    }

    function deleteTab(
        windowID: string,
        tabHash: number
    ): void {
        dispatch({
            type: "DELETE_TAB",
            payload: {
                windowID,
                tabHash,
            },
        });
    }

    function switchTab(
        windowID: string,
        tabHash: number
    ): void {
        dispatch({
            type: "SWITCH_TAB",
            payload: {
                windowID,
                tabHash,
            },
        });
    }

    function systemApplications(): SystemApplication[] {
        return windowState.runningApplication.map(app => ({
            applicationName: app.applicationName,
            iconUrl: app.iconUrl ?? "",
            //minWidth: app.minWindowWidth,
            //minHeight: app.minWindowHeight,
        }));
    }

    return (
        <WindowContext.Provider
            value={{
                windowState,
                dispatch,
                windowRef,
                parentRef,
                openApplication,
                closeWindow,
                moveWindowToFront,
                canCreateWindow,
                systemApplications,
                openNewTab,
                deleteTab,
                switchTab,
                getActiveContext,
            }}
        >
            {children}
        </WindowContext.Provider>
    );
};