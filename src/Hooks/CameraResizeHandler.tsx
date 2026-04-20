import {invalidate, useThree} from '@react-three/fiber';
import {useEffect} from "react";
import * as THREE from "three";

export const CameraResizeHandler = () => {
    const { camera, size } = useThree();

    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            camera.aspect = size.width / size.height;
            camera.updateProjectionMatrix();
            invalidate();
        }
    }, [size.width, size.height]);

    return null;
};