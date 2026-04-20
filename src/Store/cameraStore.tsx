import { useState, useEffect } from 'react';

export type CameraMode = 'intro' | 'monitor' | 'manual';

// Global store (pub/sub)
const cameraStore = {
    mode: 'intro' as CameraMode,
    listeners: new Set<() => void>(),

    set(mode: CameraMode) {
        this.mode = mode;
        this.listeners.forEach(fn => fn());
    },

    subscribe(fn: () => void) {
        this.listeners.add(fn);
        return () => {
            this.listeners.delete(fn);
        };
    },
};

// React hook that subscribes to the store
export const useCameraStore = () => {
    const [mode, setMode] = useState<CameraMode>(cameraStore.mode);

    useEffect(() => {
        // subscribe returns a cleanup function → valid for useEffect
        const unsubscribe = cameraStore.subscribe(() => {
            setMode(cameraStore.mode);
        });

        return unsubscribe;
    }, []);

    return {
        cameraMode: mode,
        setCamera: (mode: CameraMode) => cameraStore.set(mode),
    };
};
