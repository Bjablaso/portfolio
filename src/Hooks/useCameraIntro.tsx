// useCameraIntro.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as React from "react";
import { cameraTransitionStore } from "../Store/cameraTransitionStore";
import { modelClickStore } from "../Store/useModelClick";

interface UseCameraIntroOptions {
    startX?: number;
    endX?: number;
    height?: number;
    distance?: number;
    duration?: number;
    enabled?: boolean;
}

export const useCameraIntro = (
    controlsRef: React.RefObject<OrbitControlsImpl | null>,
    options: UseCameraIntroOptions = {}
) => {
    const {
        enabled  = true,
        startX   = -1300,
        endX     = 1800,
        height   = 500,
        distance = 1400,
        duration = 35000,
    } = options;

    const animationRef   = useRef<number | null>(null);
    const startTimeRef   = useRef<number | null>(null);
    const interruptedRef = useRef(false); // ✅ RESTORED

    const blendingRef  = useRef(false);
    const blendT       = useRef(0);
    const blendFrom    = useRef(new THREE.Vector3());
    const BLEND_SPEED  = 0.03;

    useEffect(() => {
        if (!enabled) {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            return;
        }

        // ✅ reset everything so loop starts fresh on re-entry
        interruptedRef.current = false;
        startTimeRef.current   = null;

        // ✅ blend in from wherever camera currently is
        blendFrom.current.copy(cameraTransitionStore.position);
        blendingRef.current = true;
        blendT.current      = 0;

        // ✅ RESTORED: monitor click interrupts the loop
        //    when user switches mode, loop stops — restarts clean on re-enable
        const stopAnimation = () => {
            if (interruptedRef.current) return;
            interruptedRef.current = true;
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };

        const unsubscribe = modelClickStore.subscribe(stopAnimation);

        const startAngle = Math.atan2(distance, startX);
        const endAngle   = Math.atan2(distance, endX);

        const animate = (timestamp: number) => {
            if (interruptedRef.current) return; // ✅ RESTORED: bail if interrupted

            const controls = controlsRef.current;
            if (!controls) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            if (!startTimeRef.current) startTimeRef.current = timestamp;

            const elapsed = timestamp - startTimeRef.current;

            // ✅ ping-pong: cycle flips direction every duration ms
            const cycle   = Math.floor(elapsed / duration);
            const raw     = (elapsed % duration) / duration;
            const eased   = raw < 0.5
                ? 2 * raw * raw
                : -1 + (4 - 2 * raw) * raw;

            // ✅ odd cycles reverse — seamless left→right→left loop
            const t     = cycle % 2 === 0 ? eased : 1 - eased;
            const angle = startAngle + (endAngle - startAngle) * t;

            const sweepX   = Math.cos(angle) * distance;
            const sweepZ   = Math.sin(angle) * distance;
            const sweepPos = new THREE.Vector3(sweepX, height, sweepZ);

            // ✅ blend from off-path into sweep on re-entry
            if (blendingRef.current) {
                blendT.current += BLEND_SPEED;
                const bt     = Math.min(blendT.current, 1);
                const beased = bt < 0.5
                    ? 2 * bt * bt
                    : -1 + (4 - 2 * bt) * bt;

                controls.object.position.lerpVectors(blendFrom.current, sweepPos, beased);

                if (bt >= 1) blendingRef.current = false;
            } else {
                controls.object.position.copy(sweepPos);
            }

            controls.object.lookAt(0, height, 0);
            controls.update();

            // ✅ always loop — only stops if interrupted or enabled flips false
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            unsubscribe();
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };

    }, [enabled]);
};


// // useCameraIntro.tsx
// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
// import * as React from "react";
// import { modelClickStore } from "../Store/useModelClick";
// import { cameraTransitionStore } from "../Store/cameraTransitionStore";
//
// interface UseCameraIntroOptions {
//     startX?: number;
//     endX?: number;
//     height?: number;
//     distance?: number;
//     duration?: number;
//     enabled?: boolean;
// }
//
// export const useCameraIntro = (
//     controlsRef: React.RefObject<OrbitControlsImpl | null>,
//     options: UseCameraIntroOptions = {}
// ) => {
//     const {
//         enabled = true,
//         startX = -1300,
//         endX = 1800,
//         height = 500,
//         distance = 1400,
//         duration = 35000,
//     } = options;
//
//     const animationRef   = useRef<number | null>(null);
//     const startTimeRef   = useRef<number | null>(null);
//     const interruptedRef = useRef(false);
//
//     // ✅ ADDED: track whether we need to blend from an off-path position
//     const blendingRef  = useRef(false);
//     const blendT       = useRef(0);
//     const blendFrom    = useRef(new THREE.Vector3());
//     const BLEND_SPEED  = 0.03; // lower = slower blend into sweep
//
//     useEffect(() => {
//         if (!enabled) {
//             if (animationRef.current !== null) {
//                 cancelAnimationFrame(animationRef.current);
//                 animationRef.current = null;
//             }
//             return;
//         }
//
//         interruptedRef.current = false;
//         startTimeRef.current   = null;
//
//         // ✅ ADDED: snapshot where camera is right now (could be monitor or manual position)
//         //    so we can blend smoothly into the sweep start position
//         blendFrom.current.copy(cameraTransitionStore.position);
//         blendingRef.current = true;
//         blendT.current      = 0;
//
//         const stopAnimation = () => {
//             if (interruptedRef.current) return;
//             interruptedRef.current = true;
//             if (animationRef.current !== null) {
//                 cancelAnimationFrame(animationRef.current);
//                 animationRef.current = null;
//             }
//         };
//
//         const unsubscribe = modelClickStore.subscribe(stopAnimation);
//
//         const animate = (timestamp: number) => {
//             if (interruptedRef.current) return;
//
//             const controls = controlsRef.current;
//             if (!controls) {
//                 animationRef.current = requestAnimationFrame(animate);
//                 return;
//             }
//
//             if (!startTimeRef.current) startTimeRef.current = timestamp;
//
//             const elapsed = timestamp - startTimeRef.current;
//             const t       = Math.min(elapsed / duration, 1);
//             const eased   = t < 0.5
//                 ? 2 * t * t
//                 : -1 + (4 - 2 * t) * t;
//
//             const radius     = distance;
//             const startAngle = Math.atan2(distance, startX);
//             const endAngle   = Math.atan2(distance, endX);
//             const angle      = startAngle + (endAngle - startAngle) * eased;
//
//             const sweepX = Math.cos(angle) * radius;
//             const sweepZ = Math.sin(angle) * radius;
//             const sweepPos = new THREE.Vector3(sweepX, height, sweepZ);
//
//             // ✅ ADDED: if we just re-entered intro, blend from last position
//             //    into the sweep position so there's no snap
//             if (blendingRef.current) {
//                 blendT.current += BLEND_SPEED;
//                 const bt     = Math.min(blendT.current, 1);
//                 const beased = bt < 0.5
//                     ? 2 * bt * bt
//                     : -1 + (4 - 2 * bt) * bt;
//
//                 controls.object.position.lerpVectors(blendFrom.current, sweepPos, beased);
//
//                 if (bt >= 1) blendingRef.current = false; // ✅ blend done, hand off to sweep
//             } else {
//                 controls.object.position.copy(sweepPos);
//             }
//
//             controls.object.lookAt(0, height, 0);
//             controls.update();
//
//             if (t < 1) {
//                 animationRef.current = requestAnimationFrame(animate);
//             }
//         };
//
//         animationRef.current = requestAnimationFrame(animate);
//
//         return () => {
//             unsubscribe();
//             if (animationRef.current !== null) {
//                 cancelAnimationFrame(animationRef.current);
//                 animationRef.current = null;
//             }
//         };
//     }, [enabled]);
// };
