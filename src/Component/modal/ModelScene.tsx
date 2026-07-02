// ModelScene.tsx
import { Canvas, invalidate, useThree } from "@react-three/fiber";
import * as React from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import '../../index.css'
import { BackWall, Flooring, LeftWall, RightWall } from "./RoomSpace.tsx";
import { Model } from "./Model.tsx";
import * as THREE from "three";
import { useCameraIntro } from "../../Hooks/useCameraIntro.tsx"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useMonitorFromStore } from "../../Store/useMonitorFromStore.tsx";
import { MonitorCameraController } from "../../Hooks/MonitorCameraController.tsx";
import { CameraPositionTracker } from "../../Tracker/CameraPositionTracker.tsx";
import { ManualControl } from "../../Hooks/useManualControl.tsx";
import { useCameraStore, type CameraMode } from "../../Store/cameraStore.tsx";
import { DEFAULT_FOV } from "../../Store/cameraConfig.ts";

// The Canvas `camera` prop previously included a hardcoded
// `rotation: [1.361, 0, -45.2]`. -45.2 is radians, not degrees — that's
// ~26 full turns, almost certainly a stale/typo value with no real
// meaning. It happened to be harmless only because useCameraIntro
// re-points the camera via lookAt() on its very first animation frame
// whenever intro mode is enabled. If intro mode were ever off by
// default, or that hook's first frame were delayed, the camera would
// briefly render facing a garbage direction.
//
// Fix: don't hardcode a rotation at all. Instead, point the camera at
// the same lookAt target every other mode already treats as the
// baseline (origin, at intro's `height`) synchronously on mount, via
// useLayoutEffect so it's resolved before the first paint — regardless
// of which mode is active or how any other effect happens to be timed.
const INITIAL_LOOKAT = new THREE.Vector3(0, 600, 0);

const CameraInitialOrientation: React.FC = () => {
    const { camera } = useThree();

    useLayoutEffect(() => {
        camera.lookAt(INITIAL_LOOKAT);
        camera.updateMatrixWorld();
        invalidate();
        // Intentionally run once on mount only — every mode's own
        // controller takes over orientation from here.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

// Lives inside Canvas — has access to useThree.
// Keeps camera aspect ratio in sync with the actual rendered size on every resize.
//
// FIX: previously this unconditionally reset camera.fov = LOCKED_FOV on
// every resize, regardless of which mode owned the camera. That fought
// MonitorCameraController's own fov control (80 normal / 52 hovered),
// producing a visible fov "snap" any time the window resized while in
// monitor mode. Aspect must ALWAYS be corrected here — that's what
// actually prevents anamorphic/stretched rendering on resize — but fov
// should only be forced back to the default when monitor mode isn't
// the one currently driving it.
const CameraResizeLock: React.FC<{ cameraMode: CameraMode }> = ({ cameraMode }) => {
    const { camera, gl, size } = useThree();

    useEffect(() => {
        if (!(camera instanceof THREE.PerspectiveCamera)) return;

        // Aspect must track the real container size unconditionally,
        // in every mode, or the render becomes stretched.
        camera.aspect = size.width / size.height;

        // Only intro/manual modes use DEFAULT_FOV. While monitor mode
        // is active, MonitorCameraController owns camera.fov every
        // frame — don't fight it here.
        if (cameraMode !== "monitor") {
            camera.fov = DEFAULT_FOV;
        }

        camera.updateProjectionMatrix();
        invalidate();
    }, [camera, size.width, size.height, cameraMode]);

    useEffect(() => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }, [gl]);

    return null;
};

export const ModelScene: React.FC = () => {
    const orbitRef = useRef<OrbitControlsImpl>(null);
    const manualRef = useRef<OrbitControlsImpl>(null);
    const { cameraMode, setCamera } = useCameraStore();
    const monitorObject = useMonitorFromStore();

    const handleMonitorClick = (_monitor: THREE.Object3D, focus: boolean) => {
        if (focus) setCamera('monitor');
    };

    useEffect(() => {
        console.log(cameraMode);
    }, [cameraMode]);

    useCameraIntro(orbitRef, {
        startX: -1300,
        endX: 1800,
        height: 600,
        distance: 1400,
        duration: 35000,
        enabled: cameraMode === 'intro',
    });

    const handleControlsEnd = React.useCallback(() => {
        invalidate();
        setTimeout(() => invalidate(), 50);
        setTimeout(() => invalidate(), 100);
        setTimeout(() => invalidate(), 200);
    }, []);

    useEffect(() => {
        const lock = setInterval(() => invalidate(), 1000);
        return () => clearInterval(lock);
    }, []);

    return (
        // This div must be the full screen. It inherits from App's
        // "absolute inset-0" — but we restate position/size here
        // so ModelScene is self-contained regardless of parent changes.
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
            }}
        >
            <Canvas
                // No explicit width/height — Canvas reads its container via
                // ResizeObserver and always matches it exactly.
                style={{ display: 'block', width: '100%', height: '100%' }}
                camera={{
                    position: [-1300.17, 600, 500],
                    fov: DEFAULT_FOV,
                    far: 10000,
                }}
                shadows
                frameloop="always"
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: true,
                }}
            >
                <CameraInitialOrientation />
                <CameraResizeLock cameraMode={cameraMode} />
                <CameraPositionTracker />

                <ambientLight intensity={0.3} />
                <directionalLight
                    color="white"
                    intensity={0.3}
                    position={[1000, 1000, 500]}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                    shadow-camera-left={-1000}
                    shadow-camera-right={1000}
                    shadow-camera-top={1000}
                    shadow-camera-bottom={-1000}
                    shadow-camera-near={1}
                    shadow-camera-far={3000}
                />

                <Suspense fallback={null}>
                    <Model onMonitorClick={handleMonitorClick} cameraMode={cameraMode} />
                    <BackWall />
                    <LeftWall />
                    <RightWall />
                    <Flooring />
                    <Environment preset="night" background={false} />
                </Suspense>

                {cameraMode === 'intro' && (
                    <OrbitControls
                        ref={orbitRef}
                        onEnd={handleControlsEnd}
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2.6}
                    />
                )}

                <MonitorCameraController
                    monitor={monitorObject}
                    cameraMode={cameraMode}
                    orbitRef={orbitRef}
                />

                {cameraMode === 'manual' && (
                    <>
                        <ManualControl isActive={true} manualRef={manualRef} />
                        <OrbitControls
                            ref={manualRef}
                            onEnd={handleControlsEnd}
                            enableZoom={true}
                            enablePan={true}
                            enableRotate={true}
                            minPolarAngle={0}
                            maxPolarAngle={Math.PI / 2.6}
                        />
                    </>
                )}
            </Canvas>
        </div>
    );
};

