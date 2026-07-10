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
        openApplication,
        canCreateWindow,
    } = useWindowContext();

    function handleApplicationOpen(
        application: SystemApplication
    ): void {
        if (!canCreateWindow(application.applicationName)) {
            return;
        }

        openApplication(
            application.applicationName,
            application.minWidth,
            application.minHeight
        );
    }

    return (
        <ul className="w-full px-0.5">
            {list.map((item) => {
                const isSelected =
                    selectedApp === item.applicationName;

                const canOpen =
                    canCreateWindow(item.applicationName);

                return (
                    <li
                        key={item.applicationName}
                        onClick={() =>
                            setSelectedApp(item.applicationName)
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

