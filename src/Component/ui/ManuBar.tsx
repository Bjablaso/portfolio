import {useEffect, useState} from "react";
import {ApplicationSubManu} from "./ApplicationSubManu.tsx";
import {useWindowContext} from "../../Context/useWindowContext.ts";


export const ManuBar = () => {
    const { windowState } = useWindowContext();

    const [currentTime, setCurrentTime] = useState<string>('')
    const [currentDate, setCurrentDate] = useState<string>('')
   // const icon = manuItem.filter((e)=> e.itemName !== "AppleIcon")
    //const activeApp = windowState.runningApplication.find(app=> app.isActive ?? windowState.runningApplication[0])

    const activeApp =
        windowState.runningApplication
            .filter(app => app.isActive && !app.isBackground)
            .sort((a, b) => b.zIndex - a.zIndex)[0]
        ?? windowState.runningApplication[0];

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
    // function onManuClick(item: SubItem): void {
    //     console.log("Hello from:", item.itemName);
    // }

    function AppleIcon() {
        const Icon = windowState.icon

        return (
            <Icon
                className="text-white h-2 w-2"
            />
        )
    }




    return (
        <div className="w-full h-full flex justify-between text-inherit ">
            <div className="flex gap-1 justify-start items-center">
                <div className="flex items-center">
                    {/*{manuItem[0].icon && React.createElement(manuItem[0].icon as React.ElementType, { className: "text-white h-2 w-2" })}*/}
                    {AppleIcon()}

                </div>
                <div className="flex flex-row gap-1 items-center ">
                    {
                        activeApp && (
                            <ApplicationSubManu
                                subItem={activeApp.applicationManu}
                                onItemClick={(item) => console.log("clicked:", item.itemName)}
                            />
                        )
                    }
                </div>



            </div>
            <div className="flex gap-1 justify-end items-center ">

                {activeApp?.manuIcon.map((item, index) => {
                    const IconComponent = item.icon;
                    if (!IconComponent) return null;
                    return (
                        <div key={`${item.itemName}${index}`}>
                            <IconComponent className={`text-white h-2 w-2 ${item.itemName === 'Search' ? 'hover:opacity-70' : ''}`} />
                        </div>
                    );
                })}
                <div className=" text-center flex flex-row text-white gap-1">
                    <div> {currentDate}</div>
                    <div> {currentTime}</div>
                </div>

            </div>
        </div>
    )
}

