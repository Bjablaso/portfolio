

import * as React from "react";
import {LayoutGrid} from 'lucide-react'
//import {GradientSvgIcon} from "./GradientSvgIcon.tsx";

export const BlockGradient: React.FC = () => {
    return (
        <div className="inline-flex items-center justify-center border border-green-500 ">
            <LayoutGrid size={35}/>
        </div>
        // <GradientSvgIcon>

        // </GradientSvgIcon>
    );
};