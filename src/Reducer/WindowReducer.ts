import {X, Minus, Expand, Plus} from "lucide-react";
import type { WindowAction, WindowState} from "../Interfaces/WindowIteface.ts";

export const initalWindoStructure: WindowState=  {
    windowControl: [
        {
            id: 1,
            description: "exit",
            icon: X,
            color: "red",
        },
        {
            id: 2,
            description: "minimize",
            icon: Minus,
            color: "yellow",
        },
        {
            id: 3,
            description: "expand",
            icon: Expand,
            color: "green",
        }
    ],
    tabControl: {
        iconAdd: Plus,
        iconMinus: X,
       active: false
    },
    runningWindows: [],
    maxTab: 5,
    maxWindow: 5,

}

function randomX() {
    return Math.floor(Math.random() * 71) + 30; // 0–70 + 30 = 30–100
}
function  randomY(){
    return Math.floor(Math.random()*11);
}



export function windowReducer(
    state: WindowState,
    action: WindowAction
): WindowState {
    switch (action.type) {

        case "EXIT": {
            if (state.runningWindows.length === 0) return state;

            const remaining = state.runningWindows.filter(
                win => win.hash !== action.payload.hash
            );

            // If we closed the current window, promote the last remaining one
            const wasCurrentClosed = state.runningWindows.find(
                win => win.hash === action.payload.hash
            )?.current;

            const updated = wasCurrentClosed && remaining.length > 0
                ? remaining.map((win, i) =>
                    i === remaining.length - 1 ? { ...win, current: true } : win
                )
                : remaining;

            return { ...state, runningWindows: updated };
        }
        //
        // case "MINIMIZE": {
        //     return {
        //         ...state,
        //         // windowControl: state.windowControl.map(control =>
        //         //     control.description === "minimize"
        //         //         ? { ...control, active: true }
        //         //         : { ...control, active: false }
        //         // )
        //     };
        // }
        //
        // case "EXPAND": {
        //     return {
        //         // ...state,
        //         // windowControl: state.windowControl.map(control =>
        //         //     control.description === "expand"
        //         //         ? { ...control, active: true }
        //         //         : { ...control, active: false }
        //         // )
        //     };
        // }

        case "CREATE_WINDOW": {
            const newWindow = {
                hash: Date.now() + Math.floor(Math.random() * 100000),
                app: "EDGE",
                title: "Microsoft Edge",
                isRunning: true,
                isClosed: false,
                initialSizeX: randomX(),
                initialSizeY: randomY(),
                windowTab: [{
                    hash: Date.now() + Math.floor(Math.random() * 100000),
                    isRunning: true,
                    isCurrentTab: true,
                    title: "Initial"
                 }
                ],
                current: true
            };

            const updated = state.runningWindows.map(win =>{
                return{
                    ...win,
                    current: false
                }
            })
            return {
                ...state,
                runningWindows: [
                    ...updated,
                    newWindow
                ]
            };
        }

        case "CREATE_TAB": {
            const targetWindow = state.runningWindows.find(
                win => win.hash === action.payload.windowHash
            );

            // Guard: don't exceed maxTab
            if (!targetWindow || targetWindow.windowTab.length >= state.maxTab) {
                return state;
            }

            const newTab = {
                hash: Date.now() + Math.floor(Math.random() * 100000),
                title: action.payload.title,
                isCurrentTab: true,
                isRunning: true,
            };

            return {
                ...state,
                runningWindows: state.runningWindows.map(win => {
                    if (win.hash !== action.payload.windowHash) return win; // ✅ other windows untouched

                    return {
                        ...win,
                        windowTab: [
                            ...win.windowTab.map(tab => ({ ...tab, isCurrentTab: false })),
                            newTab
                        ]
                    };
                })
            };
        }

        case "DELETE_TAB": {
            return {
                ...state,
                runningWindows: state.runningWindows.map(win => {
                    if (win.hash !== action.payload.windowHash) return win;

                    const tabIndex = win.windowTab.findIndex(
                        tab => tab.hash === action.payload.tabHash
                    );

                    const updatedTabs = win.windowTab.filter(
                        tab => tab.hash !== action.payload.tabHash
                    );

                    // If the closed tab was active, promote the nearest tab
                    const wasActive = win.windowTab[tabIndex]?.isCurrentTab;
                    if (wasActive && updatedTabs.length > 0) {
                        const newActiveIndex = Math.max(0, tabIndex - 1);
                        updatedTabs[newActiveIndex] = {
                            ...updatedTabs[newActiveIndex],
                            isCurrentTab: true
                        };
                    }

                    return { ...win, windowTab: updatedTabs };
                })
            };
        }

        case "SWITCH_TAB": {
            return {
                ...state,
                runningWindows: state.runningWindows.map(win => {
                    if (win.hash !== action.payload.windowHash) return win;
                    return {
                        ...win,
                        windowTab: win.windowTab.map(tab => ({
                            ...tab,
                            isCurrentTab: tab.hash === action.payload.tabHash
                        }))
                    };
                })
            };
        }



        default:
            return state;
    }
}