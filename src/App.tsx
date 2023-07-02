import { Physics, RigidBody } from "@react-three/rapier";
import { KeyboardControls, OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import * as THREE from "three";

import Desert from "./components/Desert";
import Car from "./components/Car";
import "./App.css";

const App = () => {
  const directionalLight = useControls("Directional Light", {
    position: { x: 0, y: 5, z: 20 },
    color: "#fff0a9",
  });

  const ambientLight = useControls("Ambient Light", {
    intensity: 0.3,
    color: "#ffe1a4",
  });

  const sun = useControls("Sky", {
    distance: 450000,
    sunPosition: [
      0,
      THREE.MathUtils.degToRad(2),
      THREE.MathUtils.degToRad(0.25),
    ],
    inclination: 0,
    azimuth: 0.25,
  });
  return (
    <>
      <div className="canvas">
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "left", keys: ["ArrowLeft", "KeyA"] },
            { name: "right", keys: ["ArrowRight", "KeyD"] },
            { name: "boost", keys: ["ShiftLeft"] },
          ]}
        >
          <Canvas
            camera={{
              fov: 45,
              near: 0.1,
              far: 1000,
              position: [-47, 3, 0],
              lookAt: () => new THREE.Vector3(-50, 1.5, 0),
              rotation: [0, -Math.PI / 2, 0],
            }}
            shadows
          >
            <Perf position="top-left" />
            <ambientLight
              color={ambientLight.color}
              intensity={ambientLight.intensity}
            />
            <directionalLight
              intensity={0.9}
              color={directionalLight.color}
              position={[
                directionalLight.position.x,
                directionalLight.position.y,
                directionalLight.position.z,
              ]}
              castShadow
            />
            <OrbitControls />
            <Sky
              distance={sun.distance}
              sunPosition={sun.sunPosition}
              inclination={sun.inclination}
              azimuth={sun.azimuth}
            />
            <Physics>
              <Car scale={0.005} position={[-40, 1.5, 0]} />
              <Desert />
            </Physics>
          </Canvas>
        </KeyboardControls>
      </div>
    </>
  );
};

export default App;
