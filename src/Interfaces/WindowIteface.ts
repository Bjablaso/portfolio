import type {LucideIcon} from "lucide-react";

export interface WindowControlItem {
    id: number;
    description: string;
    icon: LucideIcon;
    color: string;
    // action: "EXIT" | "MINIMIZE" | "EXPAND";
}
export interface TabItem {
    id: number;
    title: string;
    active: boolean;
}
export interface TabControl {
    iconAdd: LucideIcon;
    iconMinus: LucideIcon;
    active: boolean;
   // action: "CREATE";
}
export interface WindowState {
    windowControl: WindowControlItem[];
    tabControl: TabControl;
    runningWindows: RunningWindow[]
    maxTab: number;
    maxWindow: number;
}

export interface WindowContextType {
    windowState: WindowState;
    dispatch: React.Dispatch<WindowAction>;
    windowRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    // windowID: (value: number) => void;
    // currentWindowHash: number | null;

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
}
// add payload
export type WindowAction =
    | { type: "EXIT",  payload: { hash: number }  }
    | { type: "MINIMIZE", payload: { hash: number } }
    | { type: "EXPAND", payload: { hash: number } }
    | { type: "CREATE_TAB", payload: { title: string, windowHash: number } }
    |  { type: "DELETE_TAB", payload: { tabHash: number , windowHash: number } }
    | {type: "CREATE_WINDOW"}
    | { type: "SWITCH_TAB", payload: { windowHash: number , tabHash: number} }// tab should carry window index value
    | {type: "SWITCH_WINDOW", payload: { windowHash: number , zIndex: number } }


