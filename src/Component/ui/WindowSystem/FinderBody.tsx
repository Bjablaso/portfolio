import { useState } from "react";
import { useWindowContext } from "../../../Context/useWindowContext.ts";
import type { SystemApplication } from "../../../Interfaces/WindowIteface.ts";
import { IconRenderer } from "../../../assest/Icons/IconRenderer.tsx";

interface ListViewProps {
    list: SystemApplication[];
}

const ListView = ({ list }: ListViewProps) => {
    const [selectedApp, setSelectedApp] =
        useState<string | null>(null);

    const {
        getActiveContext,
        openApplication,
        canCreateWindow,
    } = useWindowContext();

    function handleApplicationOpen(
        application: SystemApplication
    ): void {
        const {
            activeApp,
        } = getActiveContext();

        if (!canCreateWindow(application.applicationName)) {
            return;
        }
        if (!activeApp) {
            return;
        }

        // openApplication(
        //     activeApp.applicationName,
        //     activeApp.minWindowWidth || 340,
        //     activeApp.minWindowHeight || 220,
        //     activeApp.chromePage ?? null
        // );
        openApplication(
            activeApp.applicationName,
            activeApp.minWindowWidth || 100,
            activeApp.minWindowHeight || 100,
        );

    }

    return (
        <ul className="w-full px-0.5">
            {list.map(item => {
                const isSelected =
                    selectedApp === item.applicationName;

                const canOpen =
                    canCreateWindow(item.applicationName);

                return (
                    <li
                        key={item.applicationName}
                        onClick={() =>
                            setSelectedApp(
                                item.applicationName
                            )
                        }
                        onDoubleClick={() =>
                            handleApplicationOpen(item)
                        }
                        className={`
                            flex
                            items-center
                            w-full
                            p-0.5
                            rounded-sm
                            select-none
                            ${
                            canOpen
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-50"
                        }
                            ${
                            isSelected
                                ? "bg-blue-500"
                                : "even:bg-window-innerbody"
                        }
                        `}
                    >
                        <div className="flex w-4 justify-center items-center">
                            <IconRenderer
                                url={item.iconUrl}
                                iconSize="size-icon-sm"
                            />
                        </div>

                        <div
                            className="
                                flex-1
                                flex
                                items-center
                                window-text-sm
                                window-text-w
                                truncate
                            "
                        >
                            {item.applicationName}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

interface FinderBodyProps {
    name: string;
}

export const FinderBody = ({
                               name,
                           }: FinderBodyProps) => {
    const {
        systemApplications,
    } = useWindowContext();

    const systemApplicationList =
        systemApplications();

    function renderFinderBody(): React.ReactNode {
        switch (name) {
            case "Applications":
                return (
                    <ListView
                        list={systemApplicationList}
                    />
                );

            case "":
                return (
                    <div className="flex w-full h-full items-center justify-center text-white/50 text-xs">
                        Select a Finder location
                    </div>
                );

            default:
                return (
                    <div className="flex w-full h-full items-center justify-center text-white/50 text-xs">
                        {name} is not available
                    </div>
                );
        }
    }

    return (
        <div className="flex flex-col w-full h-full bg-[#111111] overflow-hidden">
            <div
                className="
                    basis-[15%]
                    shrink-0
                    w-full
                    border-b
                    border-white/10
                "
            />

            <div className="flex-1 w-full min-h-0 overflow-auto">
                {renderFinderBody()}
            </div>
        </div>
    );
};
// // @flow
//
// import {useWindowContext} from "../../../Context/useWindowContext.ts";
// import type { SystemApplication} from "../../../Interfaces/WindowIteface.ts";
// import {IconRenderer} from "../../../assest/Icons/IconRenderer.tsx";
// import {useState} from "react";
//
//
//
// // const ListView = ({ list }: { list: SystemApplication[] }) => {
// //     return (
// //         <ul className="w-full px-0.5">
// //             {list.map((item) => (
// //                 <li
// //                     key={item.applicationName}
// //                     className="
// //                         flex items-center
// //                         w-full
// //                          p-0.5
// //                         even:bg-window-innerbody
// //                         even:rounded-sm
// //                     "
// //                 >
// //                     <div className="flex w-4 justify-center items-center">
// //                         <IconRenderer
// //                             url={item.iconUrl}
// //                             iconSize="size-icon-sm"
// //                         />
// //                     </div>
// //
// //                     <div className="flex-1 flex items-center window-text-sm window-text-w">
// //                         {item.applicationName}
// //                     </div>
// //                 </li>
// //             ))}
// //         </ul>
// //     );
// // };
//
// const ListView = ({ list }: { list: SystemApplication[] }) => {
//     const [selectedApp, setSelectedApp] = useState<string | null>(null);
//     const {openApplication} = useWindowContext()
//
//    // openApplication("Chrome", 280, 180)
//     return (
//         <ul className="w-full px-0.5">
//             {list.map((item) => {
//                 const isSelected = selectedApp === item.applicationName;
//
//                 return (
//                     <li
//                         key={item.applicationName}
//                         onClick={() => setSelectedApp(item.applicationName)}
//                         className={`
//                             flex items-center
//                             w-full
//                             p-0.5
//                             cursor-pointer
//                             rounded-sm
//                             ${
//                             isSelected
//                                 ? "bg-blue-500"
//                                 : "even:bg-window-innerbody"
//                         }
//                         `}
//                         onDoubleClick={()=> openApplication(item.applicationName, item.minWidth, item.minHeight)}
//                     >
//                         <div className="flex w-4 justify-center items-center">
//                             <IconRenderer
//                                 url={item.iconUrl}
//                                 iconSize="size-icon-sm"
//                             />
//                         </div>
//
//                         <div className="flex-1 flex items-center window-text-sm window-text-w">
//                             {item.applicationName}
//                         </div>
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// };
// export const FinderBody = ({name}: {name: string }) => {
//     const {systemApplications} = useWindowContext();
//     const mySystemApplication = systemApplications();
//
//     const renderFinderBody = ({nameX}: {nameX: string}) =>{
//         switch (nameX) {
//             case 'Applications':
//                 return <ListView list={mySystemApplication}/>
//             default:
//                 return <div> Not found</div>
//         }
//     }
//
//     return (
//         <div className="flex flex-col w-full h-full  items-center bg-[#111111]">
//             <div className="basis-[15%] border-2 border-amber-200 w-full h-full">
//
//             </div>
//             {renderFinderBody({ nameX: name })}
//
//         </div>
//     );
// };