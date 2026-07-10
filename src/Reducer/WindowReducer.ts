import {X, Minus, Expand, Plus} from "lucide-react";
import type {
    ApplicationInfo, ChromePage, RunningTab, TabControl,
    WindowAction,
    WindowState
} from "../Interfaces/WindowIteface.ts";
import {FaWifi, FaApple} from "react-icons/fa";
import {IoBatteryFull, IoSearch} from "react-icons/io5";
import {moveToFront, push} from "./Stack.tsx";


// export interface ComputerApplication{
//     applicationName: string;
//     iconUrl: string ;
//     type: "text" | "icon";
//     isActive: boolean;
//     isManu: boolean;
//     applicationManu: SubItem[];
//     manuIcon: ManuBarIcon[]
//     minWindowWidth: number;
//     minWindowHeight: number;
//     chromePage?: ChromePage;
//     maxWindow: number;
//
// }

// export interface SubItem {
//     itemName: string;
//     type: "text" | "icon";   // restrict to known values
//     isActive: boolean;
//     isSubManu: boolean;
//     dropManuPosition?: number;
//     subItemList?: string[];  // recursive nesting
//     dopItemList?: dropManuItems[];      // maybe remove to add more future inheritance
// }

// windowState: {
//     windowControl: [
//         {
//             id: 1,
//             description: "exit",
//             icon: X,
//             color: "#ff5f57" // macOS red
//         },
//         {
//             id: 2,
//             description: "minimize",
//             icon: Minus,
//             color: "#febc2e" // macOS yellow
//         },
//         {
//             id: 0,
//             description: "expand",
//             icon: Expand,
//             color: "#28c840" // macOS green
//         }
//     ],
//     tabControl: {
//         iconAdd: Plus,
//         iconMinus: X,
//         active: false
//     },

export const initialWindowStructure: ApplicationInfo = {
    icon: FaApple,

    runningApplication: [
        {
            applicationName: "Preview",
            type: "text",
            isActive: true,
            isManu: true,

            applicationManu: [
                {
                    itemName: "Preview",
                    type: "text",
                    isActive: false,
                    isSubManu: false,
                    dropManuPosition: 60,
                },
                {
                    itemName: "File",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 60,
                    dopItemList: [
                        {description: "New Window"},
                        {description: "Open..."},
                        {description: "Close Window"},
                        {description: "Save"},
                    ],
                },
                {
                    itemName: "Edit",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 90,
                    dopItemList: [
                        {description: "Undo"},
                        {description: "Redo"},
                        {description: "Cut"},
                        {description: "Copy"},
                        {description: "Paste"},
                        {description: "Select All"},
                    ],
                },
                {
                    itemName: "View",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 120,
                    dopItemList: [],
                },
                {
                    itemName: "Window",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 150,
                    dopItemList: [
                        {description: "Minimize"},
                        {description: "Zoom"},
                        {description: "Bring All to Front"},
                    ],
                },
                {
                    itemName: "Help",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 195,
                    dopItemList: [
                        {description: "Preview Help"},
                    ],
                },
            ],
            maxWindow: 5,
            // minWindowWidth: 0,
            // minWindowHeight: 0
        },

        {
            applicationName: "Chrome",
            iconUrl: "/assets/edge-svgrepo-com.svg",
            type: "text",
            isActive: false,
            isManu: true,

            applicationManu: [
                {
                    itemName: "Chrome",
                    type: "text",
                    isActive: false,
                    isSubManu: false,
                    dropManuPosition: 60,
                },
                {
                    itemName: "File",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 60,
                    dopItemList: [
                        {description: "New Window"},
                        {description: "New Tab"},
                        {description: "Close Window"},
                        {description: "Close Tab"},
                        {description: "Print..."},
                    ],
                },
                {
                    itemName: "Edit",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 120,
                    dopItemList: [
                        {description: "Undo"},
                        {description: "Redo"},
                        {description: "Cut"},
                        {description: "Copy"},
                        {description: "Paste"},
                    ],
                },
                {
                    itemName: "View",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 180,
                    dopItemList: [
                        {description: "Zoom In"},
                        {description: "Zoom Out"},
                        {description: "Actual Size"},
                        {description: "Full Screen"},
                        {description: "Show Toolbar"},
                    ],
                },
                {
                    itemName: "History",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 260,
                    dopItemList: [
                        {description: "Home"},
                        {description: "Back"},
                        {description: "Forward"},
                        {description: "Recently Closed"},
                        {description: "Manage History"},
                    ],
                },
                {
                    itemName: "Tab",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 540,
                    dopItemList: [
                        {description: "New Tab"},
                        {description: "Next Tab"},
                        {description: "Previous Tab"},
                        {description: "Duplicate Tab"},
                        {description: "Close Tab"},
                    ],
                },
                {
                    itemName: "Help",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 700,
                    dopItemList: [
                        {description: "Search Help"},
                        {description: "Chrome Help"},
                        {description: "Update Chrome"},
                        {description: "Send Feedback"},
                    ],
                },
            ],
            chromePage: "google",
            maxWindow: 5,
            minWindowWidth: 340,
            minWindowHeight: 220,
        },

        {
            applicationName: "Finder",
            iconUrl: "/assets/finder-svgrepo-com.svg",
            type: "text",
            isActive: false,
            isManu: true,

            applicationManu: [
                {
                    itemName: "File",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 60,
                    dopItemList: [
                        {description: "New Finder Window"},
                        {description: "New Tab"},
                        {description: "Open"},
                        {description: "Close Window"},
                        {description: "Find"},
                    ],
                },
                {
                    itemName: "Edit",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 120,
                    dopItemList: [
                        {description: "Undo"},
                        {description: "Redo"},
                        {description: "Cut"},
                        {description: "Copy"},
                        {description: "Paste"},
                    ],
                },
                {
                    itemName: "View",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 180,
                    dopItemList: [
                        {description: "as Icons"},
                        {description: "as List"},
                        {description: "as Columns"},
                        {description: "Show Sidebar"},
                        {description: "Enter Full Screen"},
                    ],
                },
                {
                    itemName: "Go",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 240,
                    dopItemList: [
                        {description: "Recents"},
                        {description: "Documents"},
                        {description: "Desktop"},
                        {description: "Downloads"},
                        {description: "Applications"},
                    ],
                },
                {
                    itemName: "Window",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 300,
                    dopItemList: [
                        {description: "Minimize"},
                        {description: "Zoom"},
                        {description: "Cycle Through Windows"},
                        {description: "Bring All to Front"},
                        {description: "Recents"},
                    ],
                },
                {
                    itemName: "Help",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 370,
                    dopItemList: [
                        {description: "Search Help"},
                        {description: "Mac User Guide"},
                        {description: "Tips for Your Mac"},
                    ],
                },
            ],
            maxWindow: 1,
            minWindowWidth: 200,
            minWindowHeight: 160
        },
    ],

    openAppWindow: new Map<string, WindowState>(),

    manuBarIcon: [
        {
            itemName: "Battery",
            type: "icon",
            isActive: false,
            icon: IoBatteryFull,
        },
        {
            itemName: "Wifi",
            type: "icon",
            isActive: false,
            icon: FaWifi,
        },
        {
            itemName: "Search",
            type: "icon",
            isActive: false,
            icon: IoSearch,
        },
    ],
};

function randomX() {
    return Math.floor(Math.random() * 71) + 30; // 0–70 + 30 = 30–100
}
function  randomY(){
    return Math.floor(Math.random()*11);
}



function generatContentHash(length: number = 16): string{
    const chars = "abcdef0123456789";
    let hash = "";

    for (let i = 0; i < length; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }

    return hash;
}




export function windowReducer(
    state: ApplicationInfo,
    action: WindowAction
): ApplicationInfo {

    switch (action.type) {

        case "CREATE_WINDOW": {
            const targetApplication = state.runningApplication.find(
                app => app.applicationName === action.payload.app
            );

            if (!targetApplication) {
                return state;
            }

            const numberOfOpenWindows = Array.from(
                state.openAppWindow.values()
            ).filter(
                window => window.app === action.payload.app
            ).length;

            if (numberOfOpenWindows >= targetApplication.maxWindow) {
                return state;
            }

            const newWindow: WindowState = {
                id: generatContentHash(),
                app: action.payload.app,
                title: action.payload.app,
                isActive: true,
                isClosed: false,

                windowHeight: action.payload.windowHeight,
                windowWidth: action.payload.windowWidth,

                chromePage:
                    action.payload.app === "Chrome"
                        ? action.payload.chromePage ?? "google"
                        : null,

                windowTab: [
                    {
                        hash: Date.now() + Math.floor(Math.random() * 100000),
                        isRunning: true,
                        isCurrentTab: true,
                        title: "New Tab",
                    },
                ],

                maxTab: 5,

                windowControl: [
                    {
                        id: 1,
                        description: "exit",
                        icon: X,
                        color: "#ff5f57",
                    },
                    {
                        id: 2,
                        description: "minimize",
                        icon: Minus,
                        color: "#febc2e",
                    },
                    {
                        id: 0,
                        description: "expand",
                        icon: Expand,
                        color: "#28c840",
                    },
                ],

                tabControl: {
                    iconAdd: Plus,
                    iconMinus: X,
                    active: false,
                },
                initalPositonX: randomX(),
                initalPositonY: randomY(),
            };

            const updatedWindowStack = push(
                state.openAppWindow,
                newWindow
            );

            const updatedApplications = state.runningApplication.map(app => ({
                ...app,
                isActive: app.applicationName === action.payload.app,
            }));

            return {
                ...state,
                runningApplication: updatedApplications,
                openAppWindow: updatedWindowStack,
            };
        }
        // case "EXIT": {
        //     const targetApp = state.runningApplication.find(app =>
        //         app.windowState?.runningWindows.some(
        //             win => win.hash === action.payload.hash
        //         )
        //     );
        //
        //     if (!targetApp || !targetApp.windowState) return state;
        //
        //     const remainingWindows =
        //         targetApp.windowState.runningWindows.filter(
        //             win => win.hash !== action.payload.hash
        //         );
        //
        //     const updatedApps = state.runningApplication.map(app => {
        //         if (app.applicationName !== targetApp.applicationName) {
        //             return app;
        //         }
        //
        //         return {
        //             ...app,
        //             isActive: remainingWindows.length > 0,
        //             isBackground: true,
        //             windowState: {
        //                 ...targetApp.windowState!,
        //                 runningWindows: remainingWindows
        //             }
        //         };
        //     });
        //
        //     const nextApp = findForegroundApp(updatedApps);
        //
        //     if (!nextApp) {
        //         return {
        //             ...state,
        //             runningApplication: buildStack(updatedApps, "Preview")
        //         };
        //     }
        //
        //     return {
        //         ...state,
        //         runningApplication: buildStack(
        //             updatedApps,
        //             nextApp.applicationName
        //         )
        //     };
        // }
        //
        // case "CREATE_TAB": {
        //     const targetApp = state.runningApplication.find(app =>
        //         app.windowState?.runningWindows.some(
        //             win => win.hash === action.payload.windowHash
        //         )
        //     );
        //
        //     if (!targetApp || !targetApp.windowState) return state;
        //
        //     const ws = targetApp.windowState;
        //
        //     const targetWindow = ws.runningWindows.find(
        //         win => win.hash === action.payload.windowHash
        //     );
        //
        //     if (!targetWindow || targetWindow.windowTab.length >= ws.maxTab) {
        //         return state;
        //     }
        //
        //     const newTab = {
        //         hash: Date.now() + Math.floor(Math.random() * 100000),
        //         title: action.payload.title,
        //         isCurrentTab: true,
        //         isRunning: true
        //     };
        //
        //     const updatedApps = state.runningApplication.map(app => {
        //         if (app.applicationName !== targetApp.applicationName) {
        //             return app;
        //         }
        //
        //         return {
        //             ...app,
        //             windowState: {
        //                 ...ws,
        //                 runningWindows: ws.runningWindows.map(win => {
        //                     if (win.hash !== action.payload.windowHash) {
        //                         return win;
        //                     }
        //
        //                     return {
        //                         ...win,
        //                         windowTab: [
        //                             ...win.windowTab.map(tab => ({
        //                                 ...tab,
        //                                 isCurrentTab: false
        //                             })),
        //                             newTab
        //                         ]
        //                     };
        //                 })
        //             }
        //         };
        //     });
        //
        //     return {
        //         ...state,
        //         runningApplication: updatedApps
        //     };
        // }

        // case "DELETE_TAB": {
        //     const targetApp = state.runningApplication.find(app =>
        //         app.windowState?.runningWindows.some(
        //             win => win.hash === action.payload.windowHash
        //         )
        //     );
        //
        //     if (!targetApp || !targetApp.windowState) return state;
        //
        //     const ws = targetApp.windowState;
        //
        //     const updatedApps = state.runningApplication.map(app => {
        //         if (app.applicationName !== targetApp.applicationName) {
        //             return app;
        //         }
        //
        //         return {
        //             ...app,
        //             windowState: {
        //                 ...ws,
        //                 runningWindows: ws.runningWindows.map(win => {
        //                     if (win.hash !== action.payload.windowHash) {
        //                         return win;
        //                     }
        //
        //                     const tabIndex = win.windowTab.findIndex(
        //                         tab => tab.hash === action.payload.tabHash
        //                     );
        //
        //                     const updatedTabs = win.windowTab.filter(
        //                         tab => tab.hash !== action.payload.tabHash
        //                     );
        //
        //                     const wasActive =
        //                         win.windowTab[tabIndex]?.isCurrentTab;
        //
        //                     if (wasActive && updatedTabs.length > 0) {
        //                         const newActiveIndex = Math.max(0, tabIndex - 1);
        //
        //                         updatedTabs[newActiveIndex] = {
        //                             ...updatedTabs[newActiveIndex],
        //                             isCurrentTab: true
        //                         };
        //                     }
        //
        //                     return {
        //                         ...win,
        //                         windowTab: updatedTabs
        //                     };
        //                 })
        //             }
        //         };
        //     });
        //
        //     return {
        //         ...state,
        //         runningApplication: updatedApps
        //     };
        // }

        case "SWITCH_TAB": {
            // const targetApp = state.runningApplication.find(app =>
            //     app.windowState?.runningWindows.some(
            //         win => win.hash === action.payload.windowHash
            //     )
            // );
            //
            // if (!targetApp || !targetApp.windowState) return state;
            //
            // const ws = targetApp.windowState;
            //
            // const updatedApps = state.runningApplication.map(app => {
            //     if (app.applicationName !== targetApp.applicationName) {
            //         return app;
            //     }

            //     return {
            //         ...app,
            //         windowState: {
            //             ...ws,
            //             runningWindows: ws.runningWindows.map(win => {
            //                 if (win.hash !== action.payload.windowHash) {
            //                     return win;
            //                 }
            //
            //                 return {
            //                     ...win,
            //                     windowTab: win.windowTab.map(tab => ({
            //                         ...tab,
            //                         isCurrentTab:
            //                             tab.hash === action.payload.tabHash
            //                     }))
            //                 };
            //             })
            //         }
            //     };
            // });

            return {
                // ...state,
                // runningApplication: updatedApps
            };
        }

        case "SWITCH_WINDOW": {
            const updatedWindowMap = moveToFront(
                state.openAppWindow,
                action.payload.windowID
            );

            if (updatedWindowMap === state.openAppWindow) {
                return state;
            }

            return {
                ...state,
                openAppWindow: updatedWindowMap,
            };
        }

        // case "BRING_TO_FRONT": {
        //     return {
        //         ...state,
        //         runningApplication: buildStack(
        //             state.runningApplication,
        //             action.payload.app
        //         )
        //     };
        // }

        default:
            return state;
    }
}

