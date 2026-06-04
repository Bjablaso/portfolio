import { useGLTF } from "@react-three/drei";

export const ModelURL: string = import.meta.env.VITE_MODEL_HOST_URL;


export default  function loadModel() {
    useGLTF.preload(ModelURL);
}