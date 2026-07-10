import type {ComputerApplication, WindowState} from "../Interfaces/WindowIteface.ts";

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


export function getForegroundWindow(
    windowMap: Map<string, WindowState>
): WindowState | null {
    const windows = Array.from(windowMap.values());

    return windows.at(-1) ?? null;
}

/**
 * Marks only the final window in the Map as active.
 *
 * The Map order represents the window stack:
 * first = background
 * last = foreground
 */
export function updateActiveWindow(
    windowMap: Map<string, WindowState>
): Map<string, WindowState> {
    const foregroundWindow = getForegroundWindow(windowMap);

    const updatedWindowMap =
        new Map<string, WindowState>();

    windowMap.forEach((window, windowID) => {
        updatedWindowMap.set(windowID, {
            ...window,
            isActive:
                windowID === foregroundWindow?.id,
        });
    });

    return updatedWindowMap;
}

/**
 * Updates the menu-bar application based on the foreground window.
 *
 * Preview becomes active when no windows remain open.
 */
export function updateActiveApplication(
    applications: ComputerApplication[],
    foregroundWindow: WindowState | null
): ComputerApplication[] {
    const activeApplicationName =
        foregroundWindow?.app ?? "Preview";

    return applications.map(application => ({
        ...application,
        isActive:
            application.applicationName ===
            activeApplicationName,
    }));
}

/**
 * Removes a window and recalculates the foreground window.
 */
export function removeWindowFromStack(
    windowMap: Map<string, WindowState>,
    windowID: string
): Map<string, WindowState> {
    if (!windowMap.has(windowID)) {
        return windowMap;
    }

    const updatedWindowMap =
        new Map(windowMap);

    updatedWindowMap.delete(windowID);

    return updateActiveWindow(
        updatedWindowMap
    );
}