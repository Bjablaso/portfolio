import type {LucideIcon} from "lucide-react";
import type {IconType} from "react-icons";
import * as React from "react";




export interface ApplicationInfo{
    icon: IconType
    runningApplication: ComputerApplication[];
}

// interface DocumentList{
//     icon?: LucideIcon | SVGElement | ImageData | null;
//     name: string;
// }

export interface ComputerApplication{
    applicationName: string;
    iconUrl: string ;
    type: "text" | "icon";
    isActive: boolean;
    // isDefault: boolean;
    isManu: boolean;
    applicationManu: SubItem[];
    windowState: WindowState | null;
    manuIcon: ManuBarIcon[]
    zIndex: number;        // ← stack position
    isBackground: boolean; // ← true when sent behind
    minWindowWidth: number;
    minWindowHeight: number;

   // chromePage?: ChromePage;
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

export interface WindowState {
    windowControl: WindowControlItem[];
    tabControl: TabControl;
    runningWindows: RunningWindow[]
    maxTab: number;
    maxWindow: number;
    zIndex: number;
}


export interface WindowContextType {
    windowState: ApplicationInfo;
    dispatch: React.Dispatch<WindowAction>;
    windowRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;

    openApplication: (
        appName: string,
        windowWidth: number,
        windowHeight: number,
        chromePage?: ChromePage
    ) => void;
    canCreateWindow: (appName: string ) => boolean;

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
    // action: "CREATE";
}
export interface RunningTab {
    hash : number;
    isCurrentTab: boolean;
    title: string;
    isRunning: boolean,
}

export interface RunningWindow {
    hash: number;
    app: string;
    title: string;
    isRunning: boolean;
    isClosed: boolean;
    initialSizeX: number;
    initialSizeY: number;
    windowTab: RunningTab[];
    current: boolean;
    windowHeight: number;
    windowWidth: number;
    chromePage?: ChromePage;
}
// add payload
export type WindowAction =
    | { type: "EXIT",  payload: { hash: number }  }
    | { type: "MINIMIZE", payload: { hash: number } }
    | { type: "EXPAND", payload: { hash: number } }
    | { type: "CREATE_TAB", payload: { title: string, windowHash: number } }
    |  { type: "DELETE_TAB", payload: { tabHash: number , windowHash: number } }
    | { type: "SWITCH_TAB", payload: { windowHash: number , tabHash: number} }// tab should carry window index value
    // | {type: "SWITCH_WINDOW", payload: { windowHash: number , zIndex: number } }
    | { type: "CREATE_WINDOW", payload: { app: string, windowWidth: number, windowHeight: number,  chromePage?: ChromePage;} }
    | { type: "SWITCH_WINDOW", payload: { windowHash: number, zIndex: number } }
    | { type: "BRING_TO_FRONT", payload: { app: string } }


export interface SystemApplication {
    applicationName: string;
    iconUrl: string;
    minWidth: number;
    minHeight: number;
}

export type ChromePage = "google" | "portfolio" | null;

