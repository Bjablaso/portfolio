// Store/cameraConfig.ts
//
// Single source of truth for every FOV value used across camera modes.
// Previously these were duplicated as magic numbers in both
// ModelScene.tsx (LOCKED_FOV = 100) and MonitorCameraController.tsx
// (normalFov = 80, zoomFov = 52), with no shared reference. That
// duplication is what allowed the two files to fall out of sync:
// MonitorCameraController's cleanup restored `normalFov` (80) instead
// of the app's actual default (100), and CameraResizeLock had no way
// to know it shouldn't stomp fov while monitor mode owned it.
//
// Import these constants everywhere instead of redefining them.

export const DEFAULT_FOV = 100;      // intro + manual modes
export const MONITOR_FOV = 80;       // monitor mode, not hovered
export const MONITOR_ZOOM_FOV = 52;  // monitor mode, hovered