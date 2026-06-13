// useManualControl.tsx
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { cameraTransitionStore } from "../Store/cameraTransitionStore";

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

    // Destination — tweak these to taste
    const toPos    = useRef(new THREE.Vector3(-1000.17, 500, 1000));
    const toTarget = useRef(new THREE.Vector3(0, 0, 0));

    // Scratch vectors — allocated once, reused every frame (no GC pressure)
    const scratchPos    = useRef(new THREE.Vector3());
    const scratchTarget = useRef(new THREE.Vector3());

    useEffect(() => {
        if (!isActive) return;

        fromPos.current.copy(cameraTransitionStore.position);
        fromTarget.current.copy(cameraTransitionStore.target);

        resetT.current      = 0;
        isResetting.current = true;

        // Disable controls during the fly-in so they don't fight the animation
        if (manualRef.current) manualRef.current.enabled = false;

    }, [isActive]);

    useFrame((_, delta) => {
        if (!isResetting.current) return;
        if (!manualRef.current) return;

        // Use delta-based stepping so the speed is frame-rate independent
        resetT.current += delta * 0.6;  // 0.6 ≈ ~1.6s total; tune to taste
        const t     = Math.min(resetT.current, 1);
        const eased = t < 0.5
            ? 2 * t * t
            : -1 + (4 - 2 * t) * t;

        // ── Move camera position ──────────────────────────────────────────────
        scratchPos.current.lerpVectors(fromPos.current, toPos.current, eased);
        camera.position.copy(scratchPos.current);

        // ── Move OrbitControls TARGET (not camera.lookAt) ────────────────────
        // This is the key fix: OrbitControls derives the camera's look direction
        // from its own .target. If you call camera.lookAt() separately, the two
        // systems fight each other and distort the projection each frame.
        scratchTarget.current.lerpVectors(fromTarget.current, toTarget.current, eased);
        manualRef.current.target.copy(scratchTarget.current);

        // Let OrbitControls compute the correct orientation from position+target
        manualRef.current.update();

        // ── End of transition ─────────────────────────────────────────────────
        if (t >= 1) {
            isResetting.current = false;

            // Snap to exact destinations — no floating point drift
            camera.position.copy(toPos.current);
            manualRef.current.target.copy(toTarget.current);
            manualRef.current.update();

            // Re-enable user control
            manualRef.current.enabled = true;
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

