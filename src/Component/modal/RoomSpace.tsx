import {ContactShadows} from "@react-three/drei";

export const Flooring = () => {
    return (
        <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0,-91,400]}>
            <planeGeometry args={[2820, 2500, 1, 1]}  />
            {/*<meshStandardMaterial color="white" opacity={0.3} />*/}
           <shadowMaterial opacity={.3} />
        </mesh>
    );
};

export const BackWall = ()=>{
    return (
        <mesh receiveShadow position={[0,400,-739]} >
            <planeGeometry args={[2800, 1500, 1, 1]}/>
            {/*<meshStandardMaterial color="white"  opacity={0.3} />*/}
            {/*<ContactShadows*/}
            {/*    position={[0, -1, 0]}*/}
            {/*    opacity={0.1}*/}
            {/*    scale={2}*/}
            {/*    blur={2.5}*/}
            {/*/>*/}
            <ContactShadows
                position={[0,300, -639]} // bottom corner where left wall meets back wall
                opacity={0.5}
                scale={500}   // adjust spread
                blur={2.5}    // soften edges
                far={800}     // how far shadows extend
            />
            <shadowMaterial opacity={.3} />
        </mesh>
    )
}

export const LeftWall = ()=>{
    return (
        <mesh receiveShadow  rotation-y={[-Math.PI/2]} position={[-1400,400,400]} >
            <planeGeometry args={[2500, 1500, 1, 1]}/>
            {/*<meshStandardMaterial color="white"  opacity={0.3} />*/}


            <shadowMaterial opacity={.3} />
        </mesh>
    )
}


export const RightWall = ()=>{
    return (
        <mesh receiveShadow  rotation-y={[-Math.PI/2]} position={[1400,400,400]} >
            <planeGeometry args={[2500, 1500, 1, 1]}/>
            {/*<meshStandardMaterial color="white"  opacity={0.3} />*/}
            <shadowMaterial opacity={.3} />
        </mesh>
    )
}