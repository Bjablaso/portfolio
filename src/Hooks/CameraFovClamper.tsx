// In ModelScene.tsx
import {useThree} from '@react-three/fiber';
import {useEffect} from "react";
import * as THREE from "three";

export const CameraFovClamper = () => {
    const { camera, size } = useThree();

    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            // As height shrinks, widen fov so monitor stays in frame
            const baseFov = 70;
            const baseHeight = 900;
            camera.fov = Math.min(120, baseFov * (baseHeight / size.height));
            camera.updateProjectionMatrix();
        }
    }, [size.height]);

    return null;
};