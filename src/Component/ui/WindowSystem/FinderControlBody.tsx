import { Clock7, Dock, Landmark, type LucideIcon } from 'lucide-react';
import {useEffect, useState} from "react";

interface FinderControlData {
    icon: LucideIcon;
    name: string;
    id: number;
    active?: boolean;
}

const finderData: FinderControlData[] = [
    { id: 1, name: "Recents",      icon: Clock7,    active: true},
    { id: 2, name: "Applications", icon: Landmark,  active: false },
    { id: 3, name: "Desktop",      icon: Dock,      active: false  },
]

const FAVORITES_FROM_ID = 2; // id >= 2 goes under Favorites

const FinderRow = ({ item, onSelect }: { item: FinderControlData; onSelect: (id: number) => void }) => {
    const Icon = item.icon;
    return (
        <li
            onClick={() => onSelect(item.id)}
            className={`flex flex-row items-center window-gap-md window-px-sm window-py-sm window-rounded-md cursor-pointer
                ${item.active
                ? 'bg-[#2a5db0] text-white'
                : 'text-[#e8eaed] hover:bg-white/10'
            }`
            }>
            <Icon
                size="var(--window-icon-md)"
                className={item.active ? 'text-white' : 'text-[#e8eaed]'}
            />
            <span className="window-text-md">{item.name}</span>
        </li>
    );
};

export const FinderControlBody = ({
                                      onChange,
                                  }: {
    onChange: (name: string) => void;
}) => {
    const [data, setData] = useState<FinderControlData[]>(finderData);

    const onSelect = (id: number) => {
        setData(prev => prev.map(item => ({ ...item, active: item.id === id })));


    };

    useEffect(() => {
        const currentData = data.find(item => item.active === true);
        if (currentData) {
            onChange(currentData.name);
        }
    }, [data, onChange]);


    const topItems      = data.filter(item => item.id < FAVORITES_FROM_ID);
    const favoriteItems = data.filter(item => item.id >= FAVORITES_FROM_ID);

    return (
        <div className="w-full h-full flex flex-col window-gap-sm window-p-md rounded-sm border-1 border-gray-400">
            <ul className="flex flex-col window-gap-sm">
                {topItems.map(item => (
                    <FinderRow key={item.id} item={item} onSelect={onSelect} />
                ))}
            </ul>

            <span className="window-text-sm text-[#888] font-semibold window-py-sm">
                Favorites
            </span>

            <ul className="flex flex-col window-gap-sm">
                {favoriteItems.map(item => (
                    <FinderRow key={item.id} item={item} onSelect={onSelect} />
                ))}
            </ul>

        </div>
    );
};
