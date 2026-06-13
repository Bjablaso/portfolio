
import * as React from "react";
import {useWindowContext} from "../../Context/useWindowContext.ts";


export const Edge: React.FC = () => {
    const{windowState, dispatch}  = useWindowContext()
    return (
        <div className="flex items-center justify-center object-contain
        rounded-md hover:opacity-40
        "
             onClick={() => {
                 if(windowState.runningWindows.length >= windowState.maxWindow){
                     return;
                 }else {
                     dispatch({
                         type: "CREATE_WINDOW",
                     })
                 }

             }
             }
        >
            <img   className="
                       h-4
                       h-4
                "
                   src="/assets/edge-svgrepo-com.svg"
                   alt="Edge Icon"/>

        </div>
    );
};