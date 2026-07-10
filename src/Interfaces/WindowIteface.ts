import type {LucideIcon} from "lucide-react";
import type {IconType} from "react-icons";
import * as React from "react";




export interface ApplicationInfo{
    icon: IconType
    runningApplication: ComputerApplication[];
    openAppWindow: Map<string, WindowState>;
    manuBarIcon: ManuBarIcon[];
}



export interface ComputerApplication{
    applicationName: string;
    iconUrl: string ;
    type: "text" | "icon";
    isActive: boolean;
    isManu: boolean;
    applicationManu: SubItem[];
   chromePage?: ChromePage;
    maxWindow: number;
    minWindowWidth: number;
    minWindowHeight: number;
}
//////////////////

 export interface dropManuItems{
    description: string,
    action?: () => void // make sure you pass the approprait object in here to perform the action you want
    dropManuSubManu?: SubItem[]
}
export interface SubItem {
    itemName: string;
    type: "text" | "icon";   // restrict to known values
    isActive: boolean;
    isSubManu: boolean;
    dropManuPosition?: number;
    subItemList?: string[];  // recursive nesting
    dopItemList?: dropManuItems[];      // maybe remove to add more future inheritance
}

interface ManuBarIcon{
    itemName: string;
    type: "icon" | "text";
    isActive: boolean;
    icon?: IconType;
}




///////////////////////////////

// export interface WindowState {
//     windowControl: WindowControlItem[];
//     tabControl: TabControl;
//     maxTab: number;
//     maxWindow: number;
// }

export interface WindowContextType {
    windowState: ApplicationInfo;

    dispatch: React.Dispatch<WindowAction>;

    windowRef: React.RefObject<HTMLDivElement | null>;

    parentRef: React.RefObject<HTMLDivElement | null>;

    getActiveContext: () => {
        activeApp: ComputerApplication | null;
        currentWindow: WindowState | null;
        currentTab: WindowState["windowTab"][number] | null;
        tabArrayLength: number;
    };

    openApplication: (
        appName: string,
        windowWidth: number,
        windowHeight: number,
        chromePage?: ChromePage
    ) => void;

    openNewTab: (
        windowID: string,
        tabTitle: string
    ) => void;

    deleteTab: (
        windowID: string,
        tabHash: number
    ) => void;

    closeWindow: (
        windowID: string
    ) => void;

    switchTab: (
        windowID: string,
        tabHash: number
    ) => void;

    moveWindowToFront: (
        windowID: string
    ) => void;

    canCreateWindow: (
        appName: string
    ) => boolean;

   systemApplications: () => SystemApplication[];
}
export interface WindowControlItem {
    id: number;
    description: string;
    icon: LucideIcon;
    color: string;
}

export interface TabControl {
    iconAdd: LucideIcon;
    iconMinus: LucideIcon;
    active: boolean;
}
export interface RunningTab {
    hash : number;
    isCurrentTab: boolean;
    title: string;
    isRunning: boolean,
}

/////////////////////// Example Rewrite

////////////////////////////
export interface WindowState {
    id: string;
    app: string;
    title: string;
    isActive: boolean;
    isClosed: boolean,
    windowHeight: number;
    windowWidth: number;
    chromePage?: ChromePage;
    windowTab: RunningTab[];
    windowControl: WindowControlItem[];
    tabControl: TabControl;
    maxTab: number;
    initalPositonX: number;
    initalPositonY: number;
}
// add payload
// export type WindowAction =
//     | { type: "EXIT",  payload: { hash: number }  }
//     | { type: "MINIMIZE", payload: { hash: number } }
//     | { type: "EXPAND", payload: { hash: number } }
//     | { type: "CREATE_TAB", payload: { title: string, windowHash: number } }
//     |  { type: "DELETE_TAB", payload: { tabHash: number , windowHash: number } }
//     | { type: "SWITCH_TAB", payload: { windowHash: number , tabHash: number} }// tab should carry window index value
//     // | {type: "SWITCH_WINDOW", payload: { windowHash: number , zIndex: number } }
//     | { type: "CREATE_WINDOW", payload: { app: string, windowWidth: number, windowHeight: number,  chromePage?: ChromePage;} }
//     | { type: "SWITCH_WINDOW", payload: { windowHash: number, zIndex: number } }
//    // | { type: "BRING_TO_FRONT", payload: { app: string } }
//
export type WindowAction =
    | {
    type: "EXIT";
    payload: {
        windowID: string;
    };
}
    | {
    type: "MINIMIZE";
    payload: {
        windowID: string;
    };
}
    | {
    type: "EXPAND";
    payload: {
        windowID: string;
    };
}
    | {
    type: "CREATE_TAB";
    payload: {
        title: string;
        windowID: string;
    };
}
    | {
    type: "DELETE_TAB";
    payload: {
        tabHash: number;
        windowID: string;
    };
}
    | {
    type: "SWITCH_TAB";
    payload: {
        windowID: string;
        tabHash: number;
    };
}
    | {
    type: "CREATE_WINDOW";
    payload: {
        app: string;
        windowWidth: number;
        windowHeight: number;
        chromePage?: ChromePage;
    };
}
    | {
    type: "SWITCH_WINDOW";
    payload: {
        windowID: string;
    };
}
    | {
    type: "BRING_TO_FRONT";
    payload: {
        app: string;
    };
};

export interface SystemApplication {
    applicationName: string;
    iconUrl: string;
    minWidth: number;
    minHeight: number;
}

export type ChromePage = "google" | "portfolio" | null;

