import { Bounds, Html, useGLTF } from "@react-three/drei";
import { useRef, useMemo, memo } from "react";
import { DeskTop } from "../ui/DeskTop.tsx";
import * as React from "react";
import { Object3D } from "three";
import * as THREE from "three";
import { modelClickStore } from "../../Store/useModelClick.tsx";
import { ModelURL } from "../../api/modelLoader.ts";
import {monitorInteractionActions, useMonitorInteractionStore} from "../../Store/monitorInteractionStore.ts";

interface ModelProps {
    onMonitorClick?: (monitor: THREE.Object3D, focus: boolean) => void;
    cameraMode: "intro" | "monitor" | "manual";
}

const MonitorScreen = memo(
    ({
         rotation,
         position,
         modelMonitorRef,
         isInteractive,
     }: {
        rotation: THREE.Euler;
        position: [number, number, number];
        modelMonitorRef: React.RefObject<THREE.Object3D>;
        isInteractive: boolean;
    }) => {
        const handlePointerMove = React.useCallback(
            (e: React.PointerEvent<HTMLDivElement>) => {
                if (!isInteractive) return;

                const rect = e.currentTarget.getBoundingClientRect();

                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

                monitorInteractionActions.setPointer(x, y);
            },
            [isInteractive]
        );

        const handlePointerEnter = React.useCallback(() => {
            if (!isInteractive) return;
            monitorInteractionActions.setHover(true);
        }, [isInteractive]);

        const handlePointerLeave = React.useCallback(() => {
            monitorInteractionActions.setHover(false);
        }, []);

        return (
            <Html
                transform
                sprite={false}
                position={position}
                rotation={rotation}
                distanceFactor={5.2}
                zIndexRange={[100, 0]}
                occlude={[modelMonitorRef]}
                pointerEvents={isInteractive ? "auto" : "none"}
            >
                <div
                    onPointerEnter={handlePointerEnter}
                    onPointerMove={handlePointerMove}
                    onPointerLeave={handlePointerLeave}
                    onPointerDown={(e) => {
                        if (isInteractive) e.stopPropagation();
                    }}
                    onContextMenu={(e) => {
                        if (!isInteractive) return;
                        e.preventDefault();
                    }}
                    style={{
                        width: "488px",
                        height: "286px",
                        overflow: "hidden",
                        pointerEvents: isInteractive ? "auto" : "none",
                    }}
                    className="text-[0.4rem]"
                >
                    <DeskTop />
                </div>
            </Html>
        );
    }
);

export const Model: React.FC<ModelProps> = ({ onMonitorClick, cameraMode }) => {
    const { nodes } = useGLTF(`${ModelURL}/workstation.glb`);
    const { focused } = useMonitorInteractionStore();

    const refModel = useRef<THREE.Group | null>(null);
    const monitorRef = useRef<THREE.Object3D>(new THREE.Object3D());
    const monitorGroupRef = useRef<Object3D>(null);

    const screenRotation = useMemo(() => nodes["screen"].rotation, [nodes]);
    const screenPosition: [number, number, number] = useMemo(
        () => [-0.1, -0.3, -2.5],
        []
    );
    const isInteractive = cameraMode === "monitor" && focused;
    const handleMonitorGroupClick = React.useCallback(
        (e: any) => {
            e.stopPropagation();

            if (monitorRef.current) {
                const monitorBox = new THREE.Box3().setFromObject(
                    monitorRef.current
                );

                const monitorCenter = monitorBox.getCenter(
                    new THREE.Vector3()
                );

                modelClickStore.set({
                    monitorPosition: monitorCenter,
                    monitorObject: monitorRef.current,
                });

                if (onMonitorClick) {
                    onMonitorClick(monitorRef.current, true);
                }
            }
        },
        [onMonitorClick]
    );

    return (
        <Bounds fit={false} clip observe={false} margin={1.8}>
            <group position={[160, 0, 150]} scale={15} ref={refModel}>
                <group ref={monitorGroupRef} onClick={handleMonitorGroupClick}>
                    <group>
                        <group>
                            <primitive object={nodes.monitor} ref={monitorRef} />

                            <primitive object={nodes.screen}>
                                <MonitorScreen
                                    rotation={screenRotation}
                                    position={screenPosition}
                                    modelMonitorRef={monitorRef}
                                    isInteractive={isInteractive}
                                />
                            </primitive>
                        </group>
                    </group>

                    <primitive object={nodes.computer_table} castShadow />
                    <primitive object={nodes["chair"]} castShadow />
                    <primitive object={nodes["desktop"]} />
                    <primitive object={nodes["keyboard"]} />
                    <primitive object={nodes["mouse"]} />
                    <primitive object={nodes["mesh_trashbin"]} />
                    <primitive object={nodes["mesh_organizer"]} />
                    <primitive object={nodes["jlb_speaker"]} />
                    <primitive object={nodes["bookstack"]} />
                    <primitive object={nodes["BlackBallPen_pencil"]} />

                    <group position={[0, 10, -3.5]}>
                        <primitive object={nodes["whiteboard"]} castShadow />
                    </group>
                </group>
            </group>
        </Bounds>
    );
};
