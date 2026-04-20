// @flow

// ModelScene.tsx
import {Canvas, invalidate} from "@react-three/fiber";
import * as React from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import {Suspense, useEffect, useRef} from "react";
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
import {useCameraStore} from "../../Store/cameraStore.tsx";
import {useHtmlSharpener} from "../../Hooks/useHtmlSharpener.tsx";
import {CameraResizeHandler} from "../../Hooks/CameraResizeHandler.tsx";
import {CameraFovClamper} from "../../Hooks/CameraFovClamper.tsx";

export const ModelScene: React.FC= () => {
    const orbitRef = useRef<OrbitControlsImpl>(null);
    const manualRef = useRef<OrbitControlsImpl>(null);
    const { cameraMode, setCamera } = useCameraStore();
    const monitorObject = useMonitorFromStore();


    const handleMonitorClick = (_monitor: THREE.Object3D, focus: boolean) => {
        // ✅ any mode can transition to monitor by clicking the model
        if (focus) setCamera('monitor');
    };



    useCameraIntro(orbitRef, {
        startX: -1300,
        endX: 1800,
        height: 500,
        distance: 1400,
        duration: 35000,
        enabled: cameraMode === 'intro',
    });

    const handleControlsEnd = React.useCallback(() => {
        // force a few extra frames after controls stop
        invalidate();
        setTimeout(() => invalidate(), 50);
        setTimeout(() => invalidate(), 100);
        setTimeout(() => invalidate(), 200);
    }, []);

    const HtmlSharpener = () => {
        useHtmlSharpener();
        return null;
    };

    useEffect(() => {
        // Prevent browser from dropping frame rate when tab loses focus
        const lock = setInterval(() => invalidate(), 1000);
        return () => clearInterval(lock);
    }, []);

    useEffect(() => {
        const handleResize = () => invalidate();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <Canvas
            style={{ width: '100%', height: '100vh' }}
            camera={{
                position: [-1300.17, 500, 500],
                rotation: [1.361, 0, -45.2],
                fov: 70,
                far: 10000
            }}
            shadows
            frameloop="always"
            dpr={window.devicePixelRatio}   // ← lock to exact device DPR, never drops
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",  // ← prevents GPU throttling
                preserveDrawingBuffer: true,           // ← prevents buffer loss on idle
            }}
        >
            {/*<CameraFovClamper />*/}
            {/*<CameraResizeHandler />*/}
            <CameraPositionTracker />
            <HtmlSharpener />
            <ambientLight intensity={.3} />
            <directionalLight
                color="white"
                intensity={.3}
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
                <Model onMonitorClick={handleMonitorClick} />
                <BackWall />
                <LeftWall />
                <RightWall />
                <Flooring />
                <Environment preset="night" background={false} />
            </Suspense>

            {/* ✅ CHANGED: only mounts in intro mode */}
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

            {/* ✅ CHANGED: was `isActive={isMonitorActive && !isManualControl}` — now uses cameraMode */}
            <MonitorCameraController
                monitor={monitorObject}
                cameraMode={cameraMode}
                orbitRef={orbitRef}
            />

            {/* ✅ CHANGED: was `cameraMode === 'intro'` — now correctly `cameraMode === 'manual'` */}
            {cameraMode === 'manual' && (
                <>
                    <ManualControl
                        isActive={true}
                        manualRef={manualRef}
                    />
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
    );
};
