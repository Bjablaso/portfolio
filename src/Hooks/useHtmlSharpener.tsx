import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const useHtmlSharpener = () => {
    const { gl } = useThree();
    const frameCount = useRef(0);

    useFrame(() => {
        frameCount.current += 1;

        // After camera settles, snap all Html elements to integer pixels
        if (frameCount.current > 2) {
            const htmlElements = gl.domElement.parentElement?.querySelectorAll('.screen_x');
            htmlElements?.forEach((el) => {
                const htmlEl = el as HTMLElement;
                const transform = htmlEl.style.transform;
                if (transform) {
                    // Round all matrix values to 3 decimal places to prevent subpixel blur
                    htmlEl.style.transform = transform.replace(
                        /[-+]?\d*\.?\d+/g,
                        (num) => String(Math.round(parseFloat(num) * 1000) / 1000)
                    );
                }
            });
            frameCount.current = 0;
        }
    });
};