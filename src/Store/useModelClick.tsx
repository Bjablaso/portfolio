// useModelClick.ts
// import { useRef } from "react";
import * as THREE from "three";

interface ModelClickData {
    monitorPosition: THREE.Vector3 | null;
    monitorObject: THREE.Object3D | null;
}

// ✅ Shared store — any hook can read this
export const modelClickStore = {
    data: null as ModelClickData | null,
    listeners: new Set<() => void>(),

    set(data: ModelClickData) {
        this.data = data;
        this.listeners.forEach(fn => fn());
    },

    subscribe(fn: () => void) {
        this.listeners.add(fn);
        return () => this.listeners.delete(fn);
    }
};