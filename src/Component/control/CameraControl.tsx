import {CameraControls} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {useEffect} from "react";
import {useKeyBoard} from "../../Hooks/useKeyBoard.tsx";
import * as React from "react";


type CamaraControlProps ={
    isActive: boolean,
}


export const ManualControls:React.FC<CamaraControlProps> = () => {
    const {camera} = useThree()
    
    useEffect(() => {


    })
    return (
        <>
            <CameraControls
                camera={camera}

            />
        </>
    )

}

/**
 * Intial control of the scene is handle by project AutoControl
 * Camera will start from   position: [-900.17, 600, 800]
 * and we want to move the camera along the x-axis to position 900.17
 * @constructor
 */

export const AutoControls:React.FC<CamaraControlProps> = ({isActive}) => {
    const currentKey = useKeyBoard() // hook are function that like alongside component and can take in or return a value
    //const {camera} = useThree()
   // const fixedZ = camera.position.z
    useFrame((state, delta)=>{ // cause unecessary re-render
        const motionSpeedX = 50 * delta;

        if(!isActive){

            console.log('is Auto control active',isActive)
            console.log('You press' , currentKey)
            console.log('current camera is active ', isActive)
            console.log('Camera is position at',state.camera.position)
            return null
        }


        if (state.camera.position.x < 1200) {
            state.camera.position.x += motionSpeedX
            state.camera.position.z += delta
            // state.camera.lookAt(0,0,0)
            console.log('camara at ',state.camera.position.x, 'on x-axis')
            // console.log('camara at ',state.camera.position.z, 'on z-axis')
            return
        }


        // state.camera.position.x -= motionSpeedX



    })

    return isActive ? null : (
        <ManualControls isActive={isActive}/>
    )

}