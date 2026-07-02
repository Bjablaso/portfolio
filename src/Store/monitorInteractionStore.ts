import { useEffect, useState } from "react";

export type MonitorPointerState = {
    isHovered: boolean;
    x: number; // -1 to 1
    y: number; // -1 to 1
};

const monitorInteractionStore = {
    state: {
        isHovered: false,
        x: 0,
        y: 0,
    } as MonitorPointerState,

    listeners: new Set<() => void>(),

    setHover(isHovered: boolean) {
        this.state.isHovered = isHovered;

        if (!isHovered) {
            this.state.x = 0;
            this.state.y = 0;
        }

        this.listeners.forEach((fn) => fn());
    },

    setPointer(x: number, y: number) {
        this.state.x = x;
        this.state.y = y;
        this.listeners.forEach((fn) => fn());
    },

    subscribe(fn: () => void) {
        this.listeners.add(fn);
        return () => {
            this.listeners.delete(fn);
        };
    },
};

export const monitorInteractionActions = {
    setHover: (value: boolean) => monitorInteractionStore.setHover(value),
    setPointer: (x: number, y: number) => monitorInteractionStore.setPointer(x, y),
};

export const useMonitorInteractionStore = () => {
    const [state, setState] = useState<MonitorPointerState>(
        monitorInteractionStore.state
    );

    useEffect(() => {
        const unsubscribe = monitorInteractionStore.subscribe(() => {
            setState({ ...monitorInteractionStore.state });
        });

        return unsubscribe;
    }, []);

    return state;
};