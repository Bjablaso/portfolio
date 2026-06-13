import { useThree, useFrame, invalidate } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { cameraTransitionStore } from "../Store/cameraTransitionStore";

type CameraMode = 'intro' | 'monitor' | 'manual';

interface Props {
    monitor: THREE.Object3D | null;
    cameraMode: CameraMode;
    orbitRef: React.RefObject<OrbitControlsImpl | null>;
}

export function MonitorCameraController({ monitor, cameraMode, orbitRef }: Props) {
    const { camera } = useThree();

    const center           = useRef(new THREE.Vector3());
    const lockedPosition   = useRef(new THREE.Vector3());
    const transitioning    = useRef(false);
    const transitionFrom   = useRef(new THREE.Vector3());
    const transitionT      = useRef(0);
    const settled          = useRef(false);

    const targetAzimuth    = useRef(0);
    const targetPolar      = useRef(0);
    const currentAzimuth   = useRef(0);
    const currentPolar     = useRef(0);

    const DISTANCE         = 380;
    const TRANSITION_SPEED = 0.04;
    const SMOOTHING        = 0.03;   // slow = feels like head turning
    const MAX_AZIMUTH      = 0.06;   // very subtle horizontal
    const MAX_POLAR        = 0.04;   // very subtle vertical

    const isActive = cameraMode === 'monitor';

    useEffect(() => {
        if (!isActive || !monitor) return;

        const box = new THREE.Box3().setFromObject(monitor);
        box.getCenter(center.current);

        // Store the exact locked destination
        lockedPosition.current.set(
            center.current.x,
            center.current.y,
            center.current.z + DISTANCE
        );

        transitionFrom.current.copy(cameraTransitionStore.position);
        transitionT.current    = 0;
        transitioning.current  = true;
        settled.current        = false;

        // Reset angles
        targetAzimuth.current  = 0;
        targetPolar.current    = 0;
        currentAzimuth.current = 0;
        currentPolar.current   = 0;

        if (orbitRef.current) orbitRef.current.enabled = false;

        const handleMouseMove = (e: MouseEvent) => {
            if (!settled.current) return;
            const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            targetAzimuth.current = nx * MAX_AZIMUTH;
            targetPolar.current   = ny * MAX_POLAR;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (orbitRef.current) orbitRef.current.enabled = true;
            transitioning.current = false;
            settled.current       = false;
        };

    }, [isActive, monitor]);

    useFrame(() => {
        if (!isActive) return;

        // ── Transition in ──
        if (transitioning.current) {
            transitionT.current += TRANSITION_SPEED;
            const t     = Math.min(transitionT.current, 1);
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            camera.position.lerpVectors(
                transitionFrom.current,
                lockedPosition.current,
                eased
            );
            camera.lookAt(center.current);
            camera.updateMatrixWorld();

            if (t >= 1) {
                // Hard snap to exact integer-friendly position
                camera.position.copy(lockedPosition.current);
                camera.lookAt(center.current);
                camera.updateMatrixWorld();
                transitioning.current = false;
                settled.current       = true;

                // Flush HTML matrix after settling
                invalidate();
                setTimeout(() => invalidate(), 50);
                setTimeout(() => invalidate(), 150);
                setTimeout(() => invalidate(), 300);
            }
            return;
        }

        if (!settled.current) return;

        // ── Settled: head-turn orbit around monitor ──
        // Smooth angles toward mouse target
        currentAzimuth.current += (targetAzimuth.current - currentAzimuth.current) * SMOOTHING;
        currentPolar.current   += (targetPolar.current   - currentPolar.current)   * SMOOTHING;

        // Orbit on sphere — monitor always in center of view
        const x = center.current.x + Math.sin(currentAzimuth.current) * DISTANCE;
        const y = center.current.y + Math.sin(currentPolar.current)    * DISTANCE;
        const z = center.current.z + Math.cos(currentAzimuth.current)  * DISTANCE;

        camera.position.set(x, y, z);
        camera.lookAt(center.current);
        camera.updateMatrixWorld();
    });

    return null;
}