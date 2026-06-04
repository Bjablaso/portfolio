import {Cube} from '../Icons/Cube.tsx'
import {MonitorG} from "../Icons/MonitorG.tsx";
import {Block} from "../Icons/Block.tsx";
import {FolderG} from "../Icons/FolderG.tsx";
import {Sparkle} from "../Icons/Sparkle.tsx";



export const loadingDataInstruction = {
    loadingScreen: {
        title: "Preparing Your Workspace",
        subtitle: "Loading the 3D desktop environment and setting up interactive apps.",
        sectionTitle: "WHAT WE'RE DOING",
        steps: [
            {
                id: 1,
                title: "Loading 3D Model",
                description: "Importing the desktop and environment.",
                status: "completed",
                icon: <Cube/>,
            },
            {
                id: 2,
                title: "Setting Up Screen",
                description: "Configuring the display and view settings.",
                status: "active",
                icon: <MonitorG/>,
            },
            {
                id: 3,
                title: "Installing Apps",
                description: "Loading interactive applications.",
                status: "pending",
                icon: <Block/>,
            },
            {
                id: 4,
                title: "Loading Projects",
                description: "Fetching project data and resources.",
                status: "pending",
                icon: <FolderG/>,
            },
            {
                id: 5,
                title: "Almost Ready",
                description: "Finalizing everything for the best experience.",
                status: "pending",
                icon: <Sparkle/>,
            },
        ],
        footerMessage: "Thanks for your patience. Great things are loading.",
    },
};
