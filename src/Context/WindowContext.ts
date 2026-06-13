import {createContext} from "react";
import type {WindowContextType} from "../Interfaces/WindowIteface.ts";

export const WindowContext = createContext<WindowContextType | null>(null);