import type { WindowState } from "../Interfaces/WindowIteface.ts";

export function push(
    currentWindowMap: Map<string, WindowState>,
    state: WindowState
): Map<string, WindowState> {
    const newMap = new Map(currentWindowMap);

    // Prevent the same window ID from appearing twice.
    newMap.delete(state.id);

    // The last inserted window represents the foreground window.
    newMap.set(state.id, state);

    return newMap;
}

export function moveToFront(
    currentWindowMap: Map<string, WindowState>,
    targetID: string
): Map<string, WindowState> {
    const targetWindow = currentWindowMap.get(targetID);

    if (!targetWindow) {
        return currentWindowMap;
    }

    const windowIDs = Array.from(
        currentWindowMap.keys()
    );

    const foregroundWindowID =
        windowIDs.at(-1);

    if (foregroundWindowID === targetID) {
        return currentWindowMap;
    }

    const newWindowMap =
        new Map(currentWindowMap);

    newWindowMap.delete(targetID);
    newWindowMap.set(targetID, targetWindow);

    return newWindowMap;
}