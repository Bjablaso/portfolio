import {createContext, useReducer, useRef} from "react";
import * as React from "react";
import {initalWindoStructure, windowReducer} from "../Reducer/WindowReducer.ts";
import type {WindowContextType} from "../Interfaces/WindowIteface.ts";



interface WindowControlProps {
    children: React.ReactNode;
}


 const WindowContext = createContext<WindowContextType | null>(null);
export const WindowControlConext:React.FC<WindowControlProps> = ({children}) => {
    const [windowState, dispatch]= useReducer( windowReducer, initalWindoStructure)
    const windowRef = useRef<HTMLDivElement | null>(null);

    // move into a reducer
    // const [onExit, setOnExit] = React.useState(false);
    // const [onMinimize, setOnMinimize] = React.useState(false);
    // const [onMaximize, setOnMaximize] = React.useState(false);



    return(
       <WindowContext.Provider
           value={
             [ windowState,
            dispatch,
             windowRef
             ]
           }
       >
           {children}

       </WindowContext.Provider>

    )
}
