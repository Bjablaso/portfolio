// useWindowContext.ts
import { useContext } from "react";
import { WindowContext } from "./WindowContext";

export function useWindowContext() {
    const context = useContext(WindowContext);

    if (!context) {
        throw new Error("useWindowContext must be used inside WindowControlContextProvider");
    }

    return context;
}