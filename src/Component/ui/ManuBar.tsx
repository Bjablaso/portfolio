import {
    IoBatteryFull,
    IoSearch,
} from "react-icons/io5";
import {FaWifi, FaApple} from "react-icons/fa";


import {useEffect, useState} from "react";
import {ApplicationSubManu} from "./ApplicationSubManu.tsx";
import type {IconType} from "react-icons";
import * as React from "react";

export interface dropManuItems{
    description: string,
    action?: () => void // make sure you pass the approprait object in here to perform the action you want
    dropManuSubManu?: SubItem[]
}
export interface SubItem {
    itemName: string;
    type: "text" | "icon";   // restrict to known values
    isActive: boolean;
    isSubManu: boolean;
    dropManuPosition?: number;
    subItemList?: string[];  // recursive nesting
    dopItemList?: dropManuItems[];      // maybe remove to add more future inheritance
}

 interface ManuItemInter {
    itemName: string;
    type: "icon" | "text";
     isDefault :  boolean,
    isActive: boolean;
    isSubManu: boolean;
    subItemList?: string[]
     subItem?: SubItem[];
}

interface ManuBarIcon{
    itemName: string;
    type: "icon" | "text";
    isActive: boolean;
    icon?: IconType | React.ComponentType<any>;
    isSubManu: boolean;
    subManu?: SubItem[]
    application?: ManuItemInter[]
}

const manuItem: ManuBarIcon[] = [
    {
        itemName: "AppleIcon",
        type: "icon",
        isActive: false,
        icon: FaApple,
        isSubManu: true,
        subManu: [
            {
                itemName: "About this Mac",
                type: "icon",
                isActive: false,
                isSubManu: false,
            }
        ],
        application: [
            {
                itemName: "Preview",
                type: "text",
                isDefault: true,
                isActive: true,
                isSubManu: true,
                subItem: [

                    {
                        itemName: "File",
                        type: "text",
                        isActive: false,
                        isSubManu: true,
                        dropManuPosition: 60,
                        dopItemList: [
                            { description: "New Window" },
                            { description: "Open..." },
                            { description: "Close Window" },
                            { description: "Save" },
                        ]
                    },
                    {
                        itemName: "Edit",
                        type: "text",
                        isActive: false,
                        isSubManu: true,
                        dropManuPosition: 90,
                        dopItemList: [
                            { description: "Undo" },
                            { description: "Redo" },
                            { description: "Cut" },
                            { description: "Copy" },
                            { description: "Paste" },
                            { description: "Select All" },
                        ]
                    },
                    {
                        itemName: "View",
                        type: "text",
                        isActive: false,
                        isSubManu: true,
                        dropManuPosition: 120,
                        dopItemList: []
                    },
                    {
                        itemName: "Window",
                        type: "text",
                        isActive: false,
                        isSubManu: true,
                        dropManuPosition: 150,
                        dopItemList: [
                            { description: "Minimize" },
                            { description: "Zoom" },
                            { description: "Bring All to Front" },
                        ]
                    },
                    {
                        itemName: "Help",
                        type: "text",
                        isActive: false,
                        isSubManu: true,
                        dropManuPosition: 195,
                        dopItemList: [
                            { description: "Preview Help" },
                        ]
                    },
                ]
            }
        ],
        // someitem: function FindApplicationMenuItem(runningApplication: { subManu: never }) {
        //     return runningApplication.subManu;
        // }
    },
    {
        itemName: "Battery",
        type: "icon",
        isActive: false,
        icon: IoBatteryFull,
        isSubManu: false
    },
    {
        itemName: "Wifi",
        type: "icon",
        isActive: false,
        icon: FaWifi,
        isSubManu: false
    },
    {
        itemName: "Search",
        type: "icon",
        isActive: false,
        icon: IoSearch,
        isSubManu: false
    }
];




export const ManuBar = () => {
    const [currentTime, setCurrentTime] = useState<string>('')
    const [currentDate, setCurrentDate] = useState<string>('')
    const icon = manuItem.filter((e)=> e.itemName !== "AppleIcon")
    //const AppleIcon = manuItem[0].icon
   // const [userclickManuButton, setActiveManuButtonClick] = useState<boolean>(false)
    //const systemApplication = manuItem[0].application
    const [isApplicationRunning] = useState<ManuItemInter>(manuItem[0].application![0])

    function newTime(date: Date): string {

        const localTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return localTime;
    }
    function newDate(date: Date): string {
        const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short", // Mon
            month: "short",   // Feb
            day: "numeric"    // 16
        });

        return formattedDate.replace(",", "")
    }


    useEffect(() => {
        const today = new Date();
        const updateTime = () =>{
            const day = newTime(today)
            setCurrentTime(day)
        }

        const updateDate = () => {
            const today = new Date();
            setCurrentDate(newDate(today));
        };

        updateDate()
        updateTime()
        const intervalDate = setInterval(updateDate, 24 * 60 * 60 * 1000);
        const intervalTime = setInterval(()=>{updateTime()},60_000)

        return () =>{
            clearInterval(intervalTime)
            clearInterval(intervalDate)

        }
    }, []);

    // now use this function to mutate the state passed up
    function onManuClick(item: SubItem): void {
        console.log("Hello from:", item.itemName);
    }





    return (
        <div className="w-full h-full flex justify-between text-inherit ">
            <div className="flex gap-1 justify-start items-center">
                <div className="flex items-center">
                    {manuItem[0].icon && React.createElement(manuItem[0].icon as React.ElementType, { className: "text-white h-2 w-2" })}

                </div>
                <div className="flex flex-row gap-1 items-center ">
                    {/*<div className="text-center font-bold ">*/}
                    {/*    {isApplicationRunning.itemName}*/}
                    {/*</div>*/}
                    {
                        isApplicationRunning &&
                        <ApplicationSubManu subItem={isApplicationRunning?.subItem ?? []}
                          onItemClick={() => onManuClick}

                        />
                    }

                </div>



            </div>
            <div className="flex gap-1 justify-end items-center ">
                {icon.map((item, index)=>{
                    return(
                            <div key={`${item.itemName}${index}`}  >
                                {item.type === "icon" && item.icon && (() => {
                                    const IconComponent = item.icon;

                                    if(item.itemName === "Search"){
                                        return <IconComponent className="text-white h-2 w-2 hover:opacity-70" />
                                    }
                                    return <IconComponent className="text-white h-2 w-2" />;
                                })()}
                            </div>
                    )
                })}
                <div className=" text-center flex flex-row text-white gap-1">
                    <div> {currentDate}</div>
                    <div> {currentTime}</div>
                </div>

            </div>
        </div>
    )
}

