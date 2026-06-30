// @flow
// import * as React from 'react';
//
// type Props = {
//
// };
import * as React from "react";

interface IconRendererProps {
    url: string
    iconSize?: string
}
export const IconRenderer: React.FC<IconRendererProps> = ({
                                                           iconSize,
                                                           url
                                                          } ) => {
    return (
        <div
            className="flex items-center
            justify-center object-contain
            rounded-sm hover:opacity-40
            cursor-pointer"
        >
            <img
                className={`${iconSize}`}
                src={url}
                alt="Chrome Icon"
            />
        </div>
    );
};