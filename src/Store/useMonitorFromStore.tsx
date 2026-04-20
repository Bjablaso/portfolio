import {modelClickStore} from "./useModelClick.tsx";
import {useEffect, useState} from "react";
import type {Object3D} from "three";

export function useMonitorFromStore(): Object3D | null {
    const [monitor, setMonitor] = useState(modelClickStore.data?.monitorObject ?? null);

    useEffect(() => {
        const unsubscribe = modelClickStore.subscribe(() => {
            setMonitor(modelClickStore.data?.monitorObject ?? null);
        });

        // ✅ Wrap the unsubscribe to ignore the boolean return
        return () => {
            unsubscribe();
        };
    }, []);

    return monitor;
}