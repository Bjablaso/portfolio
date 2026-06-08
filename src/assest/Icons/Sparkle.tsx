
import * as React from "react";
import { Sparkles} from 'lucide-react'

export const Sparkle: React.FC = () => {
    return (
        <div className="inline-flex items-center justify-center ">
            <Sparkles  size={35}/>
        </div>

    );
};