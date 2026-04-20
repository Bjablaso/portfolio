// Store/cameraTransitionStore.ts
// ✅ Stores last known camera position and lookAt target
// so any controller can smoothly transition FROM wherever the camera was

import * as THREE from "three";

export const cameraTransitionStore = {
    position: new THREE.Vector3(-1300.17, 500, 500), // matches Canvas initial camera
    target:   new THREE.Vector3(0, 0, 0),

    save(position: THREE.Vector3, target: THREE.Vector3) {
        this.position.copy(position);
        this.target.copy(target);
    },
};