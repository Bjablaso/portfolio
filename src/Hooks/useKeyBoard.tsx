import {useEffect, useRef} from "react";


/**
 * File consist of Custom Hook that will be put in a store
 * or context so we can export and use it on the fly
 */
export const useKeyBoard = () => {
    const keyMap = useRef<string>('')

    useEffect(() => {
        const currentKeyPress = (e: KeyboardEvent) => {
            if (!/^[WASD-wasd]+$/.test(e.key)) return
            keyMap.current = e.key
        }
        document.addEventListener('keypress', currentKeyPress)
        return () => {
            document.removeEventListener('keypress', currentKeyPress)
        }

    }, []);

    return keyMap;
}

