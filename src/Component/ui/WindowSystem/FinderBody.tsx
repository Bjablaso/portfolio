// @flow

const data= ["Recents", "Applications", "Desktop"]
export const FinderBody = ({name}: {name: string }) => {
    //const bodyData = data


    return (
        <div className="w-full h-full border-2 border-amber-200 items-center">
            {
                data.map((item) => {
                    if(item === name){
                        return(
                            <div className="window-text-xl"> {item}</div>
                        )
                    }
                })
            }
        </div>
    );
};