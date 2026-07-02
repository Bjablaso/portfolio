import { useThree, useFrame, invalidate } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { cameraTransitionStore } from "../Store/cameraTransitionStore";
import { useMonitorInteractionStore } from "../Store/monitorInteractionStore";
import { DEFAULT_FOV, MONITOR_FOV, MONITOR_ZOOM_FOV } from "../Store/cameraConfig";

type CameraMode = "intro" | "monitor" | "manual";

interface Props {
    monitor: THREE.Object3D | null;
    cameraMode: CameraMode;
    orbitRef: React.RefObject<OrbitControlsImpl | null>;
}

export function MonitorCameraController({
                                            monitor,
                                            cameraMode,
                                            orbitRef,
                                        }: Props) {
    const { camera } = useThree();
    const monitorPointer = useMonitorInteractionStore();

    const center = useRef(new THREE.Vector3());
    const lockedPosition = useRef(new THREE.Vector3());
    const transitioning = useRef(false);
    const transitionFrom = useRef(new THREE.Vector3());
    const transitionT = useRef(0);
    const settled = useRef(false);

    const currentDistance = useRef(380);
    const targetDistance = useRef(380);

    // FOV is also eased in/out alongside distance, rather than being
    // snapped instantly on entry — this removes the "pop" that made
    // switching into monitor mode look like a sudden stretch.
    const currentFov = useRef(DEFAULT_FOV);

    const normalFov = useRef(MONITOR_FOV);
    const zoomFov = useRef(MONITOR_ZOOM_FOV);

    const DISTANCE = 700;
    const HOVER_DISTANCE = 320;

    const TRANSITION_SPEED = 0.04;

    const isActive = cameraMode === "monitor";

    useEffect(() => {
        if (!isActive || !monitor) return;

        const box = new THREE.Box3().setFromObject(monitor);
        box.getCenter(center.current);

        lockedPosition.current.set(
            center.current.x,
            center.current.y,
            center.current.z + DISTANCE
        );

        transitionFrom.current.copy(cameraTransitionStore.position);
        transitionT.current = 0;
        transitioning.current = true;
        settled.current = false;

        currentDistance.current = DISTANCE;
        targetDistance.current = DISTANCE;

        // Start the fov ease from whatever fov the camera is
        // currently at (DEFAULT_FOV in normal circumstances) toward
        // MONITOR_FOV, instead of snapping immediately.
        if (camera instanceof THREE.PerspectiveCamera) {
            currentFov.current = camera.fov;
        }

        if (orbitRef.current) {
            orbitRef.current.enabled = false;
        }

        return () => {
            if (orbitRef.current) {
                orbitRef.current.enabled = true;
            }

            transitioning.current = false;
            settled.current = false;

            // FIX: restore the app's actual default FOV (the same
            // constant CameraResizeLock uses for intro/manual modes),
            // not this controller's own MONITOR_FOV. Restoring
            // normalFov.current here left intro/manual mode stuck at
            // FOV 80 after any visit to monitor mode.
            if (camera instanceof THREE.PerspectiveCamera) {
                camera.fov = DEFAULT_FOV;
                camera.updateProjectionMatrix();
            }
        };
    }, [isActive, monitor, camera, orbitRef]);

    useFrame(() => {
        if (!isActive) return;

        if (transitioning.current) {
            transitionT.current += TRANSITION_SPEED;

            const t = Math.min(transitionT.current, 1);

            const eased =
                t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            camera.position.lerpVectors(
                transitionFrom.current,
                lockedPosition.current,
                eased
            );

            camera.lookAt(center.current);
            camera.updateMatrixWorld();

            if (camera instanceof THREE.PerspectiveCamera) {
                camera.fov = THREE.MathUtils.lerp(
                    currentFov.current,
                    normalFov.current,
                    eased
                );
                camera.updateProjectionMatrix();
            }

            if (t >= 1) {
                camera.position.copy(lockedPosition.current);
                camera.lookAt(center.current);
                camera.updateMatrixWorld();

                if (camera instanceof THREE.PerspectiveCamera) {
                    camera.fov = normalFov.current;
                    camera.updateProjectionMatrix();
                }

                transitioning.current = false;
                settled.current = true;

                invalidate();
                setTimeout(() => invalidate(), 50);
                setTimeout(() => invalidate(), 150);
                setTimeout(() => invalidate(), 300);
            }

            return;
        }

        if (!settled.current) return;

        targetDistance.current = monitorPointer.isHovered
            ? HOVER_DISTANCE
            : DISTANCE;

        currentDistance.current +=
            (targetDistance.current - currentDistance.current) * 0.06;

        camera.position.set(
            center.current.x,
            center.current.y,
            center.current.z + currentDistance.current
        );

        camera.lookAt(center.current);

        if (camera instanceof THREE.PerspectiveCamera) {
            const desiredFov = monitorPointer.isHovered
                ? zoomFov.current
                : normalFov.current;

            camera.fov += (desiredFov - camera.fov) * 0.05;
            camera.updateProjectionMatrix();
        }

        camera.updateMatrixWorld();
    });

    return null;
}
