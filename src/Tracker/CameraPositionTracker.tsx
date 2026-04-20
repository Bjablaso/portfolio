// Tracker/CameraPositionTracker.tsx
// ✅ Runs every frame inside Canvas — keeps cameraTransitionStore in sync
import { useThree, useFrame } from "@react-three/fiber";
import { cameraTransitionStore } from "../Store/cameraTransitionStore";
import * as THREE from "three";

export function CameraPositionTracker() {
    const { camera } = useThree();
    const target = new THREE.Vector3();

    useFrame(() => {
        // derive lookAt target from camera direction
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        target.copy(camera.position).addScaledVector(dir, 500);

        cameraTransitionStore.save(camera.position, target);
    });

    return null;
}