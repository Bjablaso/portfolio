// Tracker/CameraPositionTracker.tsx
//
// WHY THIS CHANGED:
// Previously this tracker was used as the authoritative source for
// "where the camera was" when starting a transition (Problem 6).
// useFrame writes happen BEFORE React's commit phase, so the store
// was always one frame behind useEffect reads — causing stale fromPos.
//
// FIX: This component is now purely a debug tracker.
// No controller reads from cameraTransitionStore for transition init.
// They all read camera.position directly inside their useEffect.

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import {cameraTransitionStore} from "./cameraTransitionStore.tsx";


// We need a stable target to infer OrbitControls target from camera direction.
// 500 units forward along the camera's look direction is a reasonable proxy.
const LOOK_DISTANCE = 500;

export function CameraPositionTracker() {
    const dir = useRef(new THREE.Vector3());

    useFrame(({ camera }) => {
        // Write current position
        cameraTransitionStore.position.copy(camera.position);

        // Reconstruct approximate target from camera look direction
        camera.getWorldDirection(dir.current);
        cameraTransitionStore.target
            .copy(camera.position)
            .addScaledVector(dir.current, LOOK_DISTANCE);
    });

    return null;
}
