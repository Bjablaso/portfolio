import {
    Monitor,
    Folder,
    Box,
    Sparkles,
    LayoutGrid

} from 'lucide-react'

import {GradientSvgIcon} from "./GradientSvgIcon.tsx";
import type {ReactElement} from "react";

interface IconProps {
    children: ReactElement;
}



export  const LoadingPageIconContainer: React.FC<IconProps> = ({children}) => {
    return(
        <GradientSvgIcon>
            {children}
        </GradientSvgIcon>
    )
}