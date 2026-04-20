// useManualControl.tsx
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { cameraTransitionStore } from "../Store/cameraTransitionStore"; // ✅ ADDED

interface ManualControlProps {
    isActive: boolean;
    manualRef: React.RefObject<OrbitControlsImpl | null>;
}

export function ManualControl({ isActive, manualRef }: ManualControlProps) {
    const { camera } = useThree();
    const isResetting = useRef(false);
    const resetT      = useRef(0);
    const fromPos     = useRef(new THREE.Vector3());
    const fromTarget  = useRef(new THREE.Vector3());
    const toPos       = new THREE.Vector3(-1000.17, 500, 1000);
    const toTarget    = new THREE.Vector3(0, 0, 0);

    useEffect(() => {
        if (!isActive) return;

        // ✅ CHANGED: read from cameraTransitionStore instead of camera.position directly
        //    guarantees we get the position from the END of the last frame
        //    not a mid-frame value that could be stale or already mutated
        //    by another controller this frame
        fromPos.current.copy(cameraTransitionStore.position);
        fromTarget.current.copy(cameraTransitionStore.target);

        resetT.current      = 0;
        isResetting.current = true;

        if (manualRef.current) manualRef.current.enabled = false;

    }, [isActive]);

    useFrame(() => {
        if (!isResetting.current) return;

        resetT.current += 0.018;
        const t     = Math.min(resetT.current, 1);
        const eased = t < 0.5
            ? 2 * t * t
            : -1 + (4 - 2 * t) * t;

        camera.position.lerpVectors(fromPos.current, toPos, eased);

        const currentTarget = new THREE.Vector3();
        currentTarget.lerpVectors(fromTarget.current, toTarget, eased);
        camera.lookAt(currentTarget);
        camera.updateMatrixWorld();

        if (t >= 1) {
            isResetting.current = false;
            if (manualRef.current) {
                manualRef.current.target.copy(toTarget);
                manualRef.current.enabled = true;
                manualRef.current.update();
            }
        }
    });

    return null;
}

// export function ManualControl({ isActive, manualRef }: ManualControlProps) {
//     const { camera } = useThree();
//     const isResetting = useRef(false);
//     const resetT      = useRef(0);
//     const fromPos     = useRef(new THREE.Vector3());
//
//     // ✅ Starting position — matches Canvas camera prop exactly
//     const startPos = new THREE.Vector3(-1300.17, 500, 500);
//
//     useEffect(() => {
//         if (!isActive) return;
//
//         // ✅ When manual control turns on — snapshot current pos and lerp to start
//         fromPos.current.copy(camera.position);
//         resetT.current      = 0;
//         isResetting.current = true;
//
//         // ✅ Enable orbital control after reset
//         if (manualRef.current) manualRef.current.enabled = true;
//
//     }, [isActive]);
//
//     useFrame(() => {
//         if (!isResetting.current) return;
//
//         resetT.current += 0.02;
//         const t      = Math.min(resetT.current, 1);
//         const eased  = t < 0.5
//             ? 2 * t * t
//             : -1 + (4 - 2 * t) * t;
//
//         // ✅ Lerp camera back to starting position
//         camera.position.lerpVectors(fromPos.current, startPos, eased);
//         camera.lookAt(0, 500, 0);
//         camera.updateMatrixWorld();
//
//         // ✅ Once at start position hand full control to OrbitControls
//         if (t >= 1) {
//             isResetting.current = false;
//             if (manualRef.current) {
//                 manualRef.current.target.set(0, 500, 0);
//                 manualRef.current.update(); // ✅ sync OrbitControls to new camera pos
//             }
//         }
//     });
//
//     return null;
// }


// import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
// import {useRef} from "react";
//
//
// export function useManualControl() {
//     //const { camera } = useThree();
//
//     const manualRef = useRef<OrbitControlsImpl>(null);
//     return manualRef;
// }

