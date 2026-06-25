// ModelScene.tsx
import { Canvas, invalidate, useThree } from "@react-three/fiber";
import * as React from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
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
import { useCameraStore } from "../../Store/cameraStore.tsx";

const LOCKED_FOV = 70;

// Lives inside Canvas — has access to useThree.
// Keeps camera aspect ratio in sync with the actual rendered size on every resize.
const CameraResizeLock: React.FC = () => {
    const { camera, gl, size } = useThree();

    useEffect(() => {
        if (!(camera instanceof THREE.PerspectiveCamera)) return;
        camera.fov = LOCKED_FOV;
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
        invalidate();
    }, [camera, size.width, size.height]);

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
        height: 500,
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
                    position: [-1300.17, 500, 500],
                    rotation: [1.361, 0, -45.2],
                    fov: LOCKED_FOV,
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
                <CameraResizeLock />
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
