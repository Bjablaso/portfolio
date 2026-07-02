import {X, Minus, Expand, Plus} from "lucide-react";
import type {ApplicationInfo, ComputerApplication, WindowAction} from "../Interfaces/WindowIteface.ts";
import {FaWifi, FaApple} from "react-icons/fa";
import {IoBatteryFull, IoSearch} from "react-icons/io5";


export const initialWindowStructure: ApplicationInfo=  {
    icon: FaApple,
    runningApplication:[
        {
            applicationName: "Preview",
            type: "text",
            isActive: true,
            isManu: true,
            isBackground: true,
            zIndex: 0, // ← always base
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
                    ]
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
                    ]
                },
                {
                    itemName: "View",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 120,
                    dopItemList: []
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
                    ]
                },
                {
                    itemName: "Help",
                    type: "text",
                    isActive: false,
                    isSubManu: true,
                    dropManuPosition: 195,
                    dopItemList: [
                        {description: "Preview Help"},
                    ]
                },
            ],
            windowState: null,
            manuIcon: [
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
                }
            ],
            iconUrl: "",
            minWindowWidth: 0,
            minWindowHeight: 0
        },
        {
            applicationName: "Chrome",
            type: "text",
            isActive: false,
            isManu: true,
            isBackground: false,
            zIndex: 1, // ← starts above Preview
            applicationManu: [
                {
                    itemName: "Chrome",
                    type: "text",
                    isActive: false,
                    isSubManu: false,
                    dropManuPosition: 60,
                    // dopItemList: [
                    //     { description: "New Window" },
                    //     { description: "New Tab" },
                    //     { description: "Close Window" },
                    //     { description: "Close Tab" },
                    //     { description: "Print..." },
                    // ],
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
            windowState: {
                windowControl: [
                    {
                        id: 1,
                        description: "exit",
                        icon: X,
                        color: "#ff5f57" // macOS red
                    },
                    {
                        id: 2,
                        description: "minimize",
                        icon: Minus,
                        color: "#febc2e" // macOS yellow
                    },
                    {
                        id: 0,
                        description: "expand",
                        icon: Expand,
                        color: "#28c840" // macOS green
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
                zIndex: 10
            },
            manuIcon: [
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
                }
            ],
            iconUrl: "/assets/edge-svgrepo-com.svg",
            minWindowWidth: 280,
            minWindowHeight: 180
        },
        {
            applicationName: "Finder",
            type: "text",
            isActive: false,
            isManu: true,
            isBackground: true,
            zIndex: 2,
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
            windowState: {
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
                        id: 3,
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
                runningWindows: [],
                maxTab: 5,
                maxWindow: 1,
                zIndex: 10,
            },
            manuIcon: [
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
            iconUrl: "/assets/finder-svgrepo-com.svg",
            minWindowWidth: 180,
            minWindowHeight: 100
        }
    ]

}

function randomX() {
    return Math.floor(Math.random() * 71) + 30; // 0–70 + 30 = 30–100
}
function  randomY(){
    return Math.floor(Math.random()*11);
}


function buildStack(
    apps: ComputerApplication[],
    foregroundAppName: string
): ComputerApplication[] {
    const maxZ = Math.max(...apps.map(app => app.zIndex));

    return apps.map(app => {
        const isForeground = app.applicationName === foregroundAppName;

        return {
            ...app,
            isActive: isForeground || app.isActive,
            isBackground: !isForeground,
            zIndex: isForeground ? maxZ + 1 : app.zIndex
        };
    });
}

function findForegroundApp(apps: ComputerApplication[]) {
    return apps
        .filter(app => app.isActive)
        .sort((a, b) => b.zIndex - a.zIndex)[0];
}


export function windowReducer(
    state: ApplicationInfo,
    action: WindowAction
): ApplicationInfo {

    switch (action.type) {

        case "CREATE_WINDOW": {
            const targetIndex = state.runningApplication.findIndex(
                app => app.applicationName === action.payload.app
            );

            if (targetIndex === -1) return state;

            const targetApp = state.runningApplication[targetIndex];
            const ws = targetApp.windowState;

            if (!ws) return state;

            const currentWindows = ws.runningWindows;

            if (currentWindows.length >= ws.maxWindow) return state;

            // const newWindow = {
            //     hash: Date.now() + Math.floor(Math.random() * 100000),
            //     app: action.payload.app,
            //     title: action.payload.app,
            //     isRunning: true,
            //     isClosed: false,
            //     initialSizeX: randomX(),
            //     initialSizeY: randomY(),
            //     windowTab: [
            //         {
            //             hash: Date.now() + Math.floor(Math.random() * 100000),
            //             isRunning: true,
            //             isCurrentTab: true,
            //             title: "Initial"
            //         }
            //     ],
            //     current: true,
            //     windowHeight: action.payload.windowHeight,
            //     windowWidth: action.payload.windowWidth
            // };
            const newWindow = {
                hash: Date.now() + Math.floor(Math.random() * 100000),
                app: action.payload.app,
                title: action.payload.app,
                isRunning: true,
                isClosed: false,
                initialSizeX: randomX(),
                initialSizeY: randomY(),
                windowTab: [
                    {
                        hash: Date.now() + Math.floor(Math.random() * 100000),
                        isRunning: true,
                        isCurrentTab: true,
                        title: "New Tab",
                    },
                ],
                current: true,
                windowHeight: action.payload.windowHeight,
                windowWidth: action.payload.windowWidth,
                chromePage:
                    action.payload.app === "Chrome"
                        ? action.payload.chromePage ?? "google"
                        : null,
            };

            const updatedApps = state.runningApplication.map(app => {
                if (app.applicationName !== action.payload.app) return app;

                return {
                    ...app,
                    isActive: true,
                    windowState: {
                        ...ws,
                        runningWindows: [
                            ...currentWindows.map(win => ({
                                ...win,
                                current: false
                            })),
                            newWindow
                        ]
                    }
                };
            });

            return {
                ...state,
                runningApplication: buildStack(updatedApps, action.payload.app)
            };
        }

        case "EXIT": {
            const targetApp = state.runningApplication.find(app =>
                app.windowState?.runningWindows.some(
                    win => win.hash === action.payload.hash
                )
            );

            if (!targetApp || !targetApp.windowState) return state;

            const remainingWindows =
                targetApp.windowState.runningWindows.filter(
                    win => win.hash !== action.payload.hash
                );

            const updatedApps = state.runningApplication.map(app => {
                if (app.applicationName !== targetApp.applicationName) {
                    return app;
                }

                return {
                    ...app,
                    isActive: remainingWindows.length > 0,
                    isBackground: true,
                    windowState: {
                        ...targetApp.windowState!,
                        runningWindows: remainingWindows
                    }
                };
            });

            const nextApp = findForegroundApp(updatedApps);

            if (!nextApp) {
                return {
                    ...state,
                    runningApplication: buildStack(updatedApps, "Preview")
                };
            }

            return {
                ...state,
                runningApplication: buildStack(
                    updatedApps,
                    nextApp.applicationName
                )
            };
        }

        case "CREATE_TAB": {
            const targetApp = state.runningApplication.find(app =>
                app.windowState?.runningWindows.some(
                    win => win.hash === action.payload.windowHash
                )
            );

            if (!targetApp || !targetApp.windowState) return state;

            const ws = targetApp.windowState;

            const targetWindow = ws.runningWindows.find(
                win => win.hash === action.payload.windowHash
            );

            if (!targetWindow || targetWindow.windowTab.length >= ws.maxTab) {
                return state;
            }

            const newTab = {
                hash: Date.now() + Math.floor(Math.random() * 100000),
                title: action.payload.title,
                isCurrentTab: true,
                isRunning: true
            };

            const updatedApps = state.runningApplication.map(app => {
                if (app.applicationName !== targetApp.applicationName) {
                    return app;
                }

                return {
                    ...app,
                    windowState: {
                        ...ws,
                        runningWindows: ws.runningWindows.map(win => {
                            if (win.hash !== action.payload.windowHash) {
                                return win;
                            }

                            return {
                                ...win,
                                windowTab: [
                                    ...win.windowTab.map(tab => ({
                                        ...tab,
                                        isCurrentTab: false
                                    })),
                                    newTab
                                ]
                            };
                        })
                    }
                };
            });

            return {
                ...state,
                runningApplication: updatedApps
            };
        }

        case "DELETE_TAB": {
            const targetApp = state.runningApplication.find(app =>
                app.windowState?.runningWindows.some(
                    win => win.hash === action.payload.windowHash
                )
            );

            if (!targetApp || !targetApp.windowState) return state;

            const ws = targetApp.windowState;

            const updatedApps = state.runningApplication.map(app => {
                if (app.applicationName !== targetApp.applicationName) {
                    return app;
                }

                return {
                    ...app,
                    windowState: {
                        ...ws,
                        runningWindows: ws.runningWindows.map(win => {
                            if (win.hash !== action.payload.windowHash) {
                                return win;
                            }

                            const tabIndex = win.windowTab.findIndex(
                                tab => tab.hash === action.payload.tabHash
                            );

                            const updatedTabs = win.windowTab.filter(
                                tab => tab.hash !== action.payload.tabHash
                            );

                            const wasActive =
                                win.windowTab[tabIndex]?.isCurrentTab;

                            if (wasActive && updatedTabs.length > 0) {
                                const newActiveIndex = Math.max(0, tabIndex - 1);

                                updatedTabs[newActiveIndex] = {
                                    ...updatedTabs[newActiveIndex],
                                    isCurrentTab: true
                                };
                            }

                            return {
                                ...win,
                                windowTab: updatedTabs
                            };
                        })
                    }
                };
            });

            return {
                ...state,
                runningApplication: updatedApps
            };
        }

        case "SWITCH_TAB": {
            const targetApp = state.runningApplication.find(app =>
                app.windowState?.runningWindows.some(
                    win => win.hash === action.payload.windowHash
                )
            );

            if (!targetApp || !targetApp.windowState) return state;

            const ws = targetApp.windowState;

            const updatedApps = state.runningApplication.map(app => {
                if (app.applicationName !== targetApp.applicationName) {
                    return app;
                }

                return {
                    ...app,
                    windowState: {
                        ...ws,
                        runningWindows: ws.runningWindows.map(win => {
                            if (win.hash !== action.payload.windowHash) {
                                return win;
                            }

                            return {
                                ...win,
                                windowTab: win.windowTab.map(tab => ({
                                    ...tab,
                                    isCurrentTab:
                                        tab.hash === action.payload.tabHash
                                }))
                            };
                        })
                    }
                };
            });

            return {
                ...state,
                runningApplication: updatedApps
            };
        }

        case "SWITCH_WINDOW": {
            const targetApp = state.runningApplication.find(app =>
                app.windowState?.runningWindows.some(
                    win => win.hash === action.payload.windowHash
                )
            );

            if (!targetApp) return state;

            return {
                ...state,
                runningApplication: buildStack(
                    state.runningApplication,
                    targetApp.applicationName
                )
            };
        }

        case "BRING_TO_FRONT": {
            return {
                ...state,
                runningApplication: buildStack(
                    state.runningApplication,
                    action.payload.app
                )
            };
        }

        default:
            return state;
    }
}

