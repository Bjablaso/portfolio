import {Bounds, Html, useGLTF} from "@react-three/drei";
import {useEffect, useRef, useMemo, memo} from "react";
import {DeskTop} from "../ui/DeskTop.tsx";
import * as React from "react";
import {Object3D} from "three";
import * as THREE from "three";
import {modelClickStore} from "../../Store/useModelClick.tsx";
import {useThree} from "@react-three/fiber";

interface ModelProps {
    onMonitorClick?: (monitor: THREE.Object3D, focus: boolean) => void;
}


const MonitorScreen = memo(({ rotation, position }: {
    rotation: THREE.Euler,
    position: [number, number, number]
}) => {
    return (
        <Html
            transform
            position={position}
            rotation={rotation}
            distanceFactor={5}
            zIndexRange={[100, 0]}
        >
            <div
                onPointerDown={(e) => e.stopPropagation()}
                style={{
                    width: '488px',
                    height: '286px',
                    overflow: 'hidden',
                    pointerEvents: 'auto',
                }}
            >
                <DeskTop/>
            </div>
        </Html>
    );
});

export const Model: React.FC<ModelProps> = ({ onMonitorClick }) => {


    const {nodes} = useGLTF("https://bjablasowebportfoliobucket.s3.us-west-1.amazonaws.com/3DModals/workstation.glb")
    const refModel = useRef<THREE.Group | null>(null)
    const monitorRef = useRef<Object3D>(null);
    const monitorrRef = useRef<Object3D>(null);
    const { scene } = useThree();

    // ✅ Freeze rotation and position so they never create new references
    const screenRotation = useMemo(() => nodes['screen'].rotation, []);
    const screenPosition: [number, number, number] = useMemo(() => [-0.10, -0.30, -2.5], []);


    useEffect(() => {
        if (!monitorrRef.current) return;
        const helper = new THREE.BoxHelper(monitorrRef.current, 0xff0000);
        scene.add(helper);
        return () => {
            scene.remove(helper);
            helper.geometry.dispose();
            (helper.material as THREE.Material).dispose();
        };
    }, []);

    const handleMonitorGroupClick = React.useCallback((e: any) => {
        e.stopPropagation();
        if (monitorRef.current) {
            const monitorBox = new THREE.Box3().setFromObject(monitorRef.current);
            const monitorCenter = monitorBox.getCenter(new THREE.Vector3());
            modelClickStore.set({
                monitorPosition: monitorCenter,
                monitorObject: monitorRef.current,
            });
            if (onMonitorClick) onMonitorClick(monitorRef.current, true);
        }
    }, [onMonitorClick]);

    return (
        <Bounds fit={false} clip observe={false} margin={1.8}>
            <group position={[160, 0, 100]} scale={10} ref={refModel}>
                <group ref={monitorrRef} onClick={handleMonitorGroupClick}>

                    <group>
                        <group>
                            <primitive object={nodes.monitor} ref={monitorRef}/>

                            <primitive object={nodes.screen}>
                                {/* ✅ Memoized — won't re-render on parent updates */}
                                <MonitorScreen
                                    rotation={screenRotation}
                                    position={screenPosition}
                                />
                            </primitive>
                        </group>
                    </group>

                    <primitive object={nodes.computer_table} castShadow/>
                    <primitive object={nodes['chair']} castShadow/>
                    <primitive object={nodes['desktop']}/>
                    <primitive object={nodes['keyboard']}/>
                    <primitive object={nodes['mouse']}/>
                    <primitive object={nodes['mesh_trashbin']}/>
                    <primitive object={nodes['mesh_organizer']}/>
                    <primitive object={nodes['jlb_speaker']}/>
                    <primitive object={nodes['bookstack']}/>
                    <primitive object={nodes['BlackBallPen_pencil']}/>

                    <group position={[0, 10, -3.5]}>
                        <primitive object={nodes['whiteboard']} castShadow/>
                    </group>

                    <mesh>
                        <boxGeometry args={[1, 1, 1]}/>
                        <meshBasicMaterial color="red" wireframe/>
                    </mesh>
                </group>
            </group>
        </Bounds>
    );
};

// useGLTF.preload("/workstation.glb");
useGLTF.preload(
    "https://bjablasowebportfoliobucket.s3.us-west-1.amazonaws.com/3DModals/workstation.glb"
);


// import {Bounds, Html, useGLTF} from "@react-three/drei";
// import {useEffect, useRef} from "react";
// import {DeskTop} from "../ui/DeskTop.tsx";
// import * as React from "react";
// import {Object3D} from "three";
// // import { modelClickStore } from "../../Hooks/useModelClick.ts";
// import * as THREE from "three";
// import {modelClickStore} from "../../Store/useModelClick.tsx";
// import {useThree} from "@react-three/fiber";
//
// interface ModelProps {
//     onMonitorClick?: (monitor: THREE.Object3D, focus : boolean) => void;
// }
//
// export const Model: React.FC<ModelProps> = ({ onMonitorClick }) => {
//
//
//     const {nodes} = useGLTF('/workstation.glb')
//     const refModel = useRef<THREE.Group | null>(null)
//    // const refModel: RefObject<Group | null> = useRef<Group | null>(null);
//     const monitorRef = useRef<Object3D>(null);
//     const monitorrRef = useRef<Object3D>(null);
//     const { scene } = useThree();
//
//     useEffect(() => {
//         if (!monitorrRef.current) return;
//
//         const helper = new THREE.BoxHelper(monitorrRef.current, 0xff0000); // red
//         scene.add(helper);
//
//         return () => {
//             scene.remove(helper);
//             helper.geometry.dispose();
//             (helper.material as THREE.Material).dispose();
//         };
//     }, []);
//
//
//
//
//     return (
//         <Bounds fit={false} clip observe={false} margin={1.8}
//
//         >
//             <group
//                 position={[160, 0, 100]}
//                 scale={10}
//                 ref={refModel}
//             >
//                 <group
//                     ref={monitorrRef}
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         if (monitorRef.current) {
//                             const monitorBox = new THREE.Box3().setFromObject(monitorRef.current);
//                             const monitorCenter = monitorBox.getCenter(new THREE.Vector3());
//                             modelClickStore.set({
//                                 monitorPosition: monitorCenter,
//                                 monitorObject: monitorRef.current,
//                             });
//                             // ✅ This is what actually flips isMonitorActive in ModelScene
//                             if (onMonitorClick) onMonitorClick(monitorRef.current, true);
//                         }
//                     }}
//                 >
//
//                     {/* monitor */}
//                     <group>
//                         <group>
//                             <primitive object={nodes.monitor} ref={monitorRef}
//
//                             />
//
//
//                             <primitive object={nodes.screen}>
//                                 <Html
//                                     className="screen_x"
//                                     transform
//                                     //occlude={true}
//                                     position={[-0.10, -.30, -2.5]}
//                                     rotation={nodes['screen'].rotation}
//                                     distanceFactor={7}
//                                     zIndexRange={[0, 0]}
//                                     // Add these:
//                                     prepend
//                                    // portal={document.body}
//                                     onClick={(e: PointerEvent) => {
//                                         e.stopPropagation();
//                                         if (monitorRef.current && onMonitorClick) {
//                                             // ✅ Store position for later use
//                                             const box = new THREE.Box3().setFromObject(monitorRef.current);
//                                             const center = box.getCenter(new THREE.Vector3());
//
//                                             modelClickStore.set({
//                                                 monitorPosition: center,
//                                                 monitorObject: monitorRef.current,
//                                             });
//
//                                             onMonitorClick(monitorRef.current, true);
//                                         }
//                                     }}
//                                 >
//                                     <div className="wrapper"
//                                          onPointerDown={(e) => e.stopPropagation()}
//                                     >
//                                         <div className="inner"
//                                         >
//                                             <DeskTop/>
//
//                                         </div>
//
//                                     </div>
//                                 </Html>
//                             </primitive>
//
//                         </group>
//                     </group>
//
//                     <primitive object={nodes.computer_table} castShadow/>
//                     <primitive object={nodes['chair']} castShadow/>
//                     <primitive object={nodes['desktop']}/>
//                     <primitive object={nodes['keyboard']}/>
//                     <primitive object={nodes['mouse']}/>
//
//
//                     <primitive object={nodes['mesh_trashbin']}/>
//                     <primitive object={nodes['mesh_organizer']}/>
//                     <primitive object={nodes['jlb_speaker']}/>
//                     <primitive object={nodes['bookstack']}/>
//                     <primitive object={nodes['BlackBallPen_pencil']}/>
//
//                     <group position={[0,10,-3.5]}>
//                         <primitive object={nodes['whiteboard']} castShadow/>
//                     </group>
//
//                     <mesh>
//                         <boxGeometry args={[1, 1, 1]} />
//                         <meshBasicMaterial color="red" wireframe />
//                     </mesh>
//                 </group>
//             </group>
//         </Bounds>
//
//     );
// };
//
// useGLTF.preload("/workstation.glb");