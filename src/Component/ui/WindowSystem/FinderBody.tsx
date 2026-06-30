// @flow

import {useWindowContext} from "../../../Context/useWindowContext.ts";
import type { SystemApplication} from "../../../Interfaces/WindowIteface.ts";
import {IconRenderer} from "../../../assest/Icons/IconRenderer.tsx";
import {useState} from "react";



// const ListView = ({ list }: { list: SystemApplication[] }) => {
//     return (
//         <ul className="w-full px-0.5">
//             {list.map((item) => (
//                 <li
//                     key={item.applicationName}
//                     className="
//                         flex items-center
//                         w-full
//                          p-0.5
//                         even:bg-window-innerbody
//                         even:rounded-sm
//                     "
//                 >
//                     <div className="flex w-4 justify-center items-center">
//                         <IconRenderer
//                             url={item.iconUrl}
//                             iconSize="size-icon-sm"
//                         />
//                     </div>
//
//                     <div className="flex-1 flex items-center window-text-sm window-text-w">
//                         {item.applicationName}
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     );
// };

const ListView = ({ list }: { list: SystemApplication[] }) => {
    const [selectedApp, setSelectedApp] = useState<string | null>(null);
    const {openApplication} = useWindowContext()

   // openApplication("Chrome", 280, 180)
    return (
        <ul className="w-full px-0.5">
            {list.map((item) => {
                const isSelected = selectedApp === item.applicationName;

                return (
                    <li
                        key={item.applicationName}
                        onClick={() => setSelectedApp(item.applicationName)}
                        className={`
                            flex items-center
                            w-full
                            p-0.5
                            cursor-pointer
                            rounded-sm
                            ${
                            isSelected
                                ? "bg-blue-500"
                                : "even:bg-window-innerbody"
                        }
                        `}
                        onDoubleClick={()=> openApplication(item.applicationName, item.minWidth, item.minHeight)}
                    >
                        <div className="flex w-4 justify-center items-center">
                            <IconRenderer
                                url={item.iconUrl}
                                iconSize="size-icon-sm"
                            />
                        </div>

                        <div className="flex-1 flex items-center window-text-sm window-text-w">
                            {item.applicationName}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
export const FinderBody = ({name}: {name: string }) => {
    const {systemApplications} = useWindowContext();
    const mySystemApplication = systemApplications();

    const renderFinderBody = ({nameX}: {nameX: string}) =>{
        switch (nameX) {
            case 'Applications':
                return <ListView list={mySystemApplication}/>
            default:
                return <div> Not found</div>
        }
    }

    return (
        <div className="flex flex-col w-full h-full  items-center bg-[#111111]">
            <div className="basis-[15%] border-2 border-amber-200 w-full h-full">

            </div>
            {renderFinderBody({ nameX: name })}

        </div>
    );
};