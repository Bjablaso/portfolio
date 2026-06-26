// Store/cameraOwnerStore.ts
//
// WHY THIS EXISTS:
// React state (useCameraStore) is async — setState schedules a re-render,
// it does not instantly stop a useFrame hook from running.
// This plain-object ref is set SYNCHRONOUSLY at the moment of ownership
// transfer, so every useFrame guard reads the correct owner on the very
// next frame — no one-frame fights during transitions.

type CameraOwner = 'intro' | 'monitor' | 'manual';

export const cameraOwnerStore = {
    current: 'intro' as CameraOwner,

    // Call this BEFORE calling the React setCamera() so the frame loop
    // sees the new owner before React re-renders.
    transfer(next: CameraOwner) {
        this.current = next;
    },
};
