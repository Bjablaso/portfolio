import * as React from "react";

export  interface ApplicationRunning {
    application: React.ComponentType<any>;
    isRunning: boolean;

}
export  interface ApplicationProps {
    desktopApplication:  ApplicationRunning[], // Application react component array,
}