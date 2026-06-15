import {useReducer, useRef} from "react";
import * as React from "react";
import {initalWindoStructure, windowReducer} from "../Reducer/WindowReducer.ts";
import { WindowContext } from "./WindowContext.ts";

interface WindowControlProps {
    children: React.ReactNode;
}

export const WindowControlContextProvider:React.FC<WindowControlProps> = ({children}) => {
    const [windowState, dispatch]= useReducer( windowReducer, initalWindoStructure)
    const windowRef = useRef<HTMLDivElement | null>(null);
    const parentRef = useRef<HTMLDivElement | null>(null);
    //const manuBarDirection = "col" | "row";
  //  const [currentWindowHash, setWindowIdentifierHash ]= useState<number | null>(null)

    // const  windowID = (value: number)=> {
    //     setWindowIdentifierHash(value)
    // }
    //


    return(
       <WindowContext.Provider
           value={
               {
                   windowState,
                   dispatch,
                   windowRef,
                   parentRef,
               }
           }
       >
           {children}
       </WindowContext.Provider>
    )
}

