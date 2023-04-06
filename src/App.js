import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import object1 from "../src/images/buildingex.glb";
import object2 from "../src/images/table1.glb";
import object3 from "../src/images/table2.glb";

const App = () => {
  const gltf1 = useLoader(GLTFLoader, object1);
  const gltf2 = useLoader(GLTFLoader, object2);
  const gltf3 = useLoader(GLTFLoader, object3);

  return (
    <Canvas
      style={{ width: "800px", height: "800px", position: `relative` }}
      camera={{ position: [13, 13, 13] }}
      shadows>
      <primitive
        object={gltf1.scene}
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
        children-0-castShadow
      />
      <primitive
        object={gltf2.scene}
        scale={[1, 1, 1]}
        position={[-2, 0, 0]}
        children-0-castShadow
      />
      <primitive
        object={gltf3.scene}
        scale={[1, 1, 1]}
        position={[2, 0, 0]}
        children-0-castShadow
      />

      <directionalLight intensity={1} />
      <ambientLight intensity={1.2} />
      <spotLight intensity={0.1} angle={0.1} penumbra={1} castShadow />
      <OrbitControls target={[0, 1, 0]} />
    </Canvas>
  );
};

export default App;
