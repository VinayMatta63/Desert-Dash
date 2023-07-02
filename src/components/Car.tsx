import { useEffect, useRef, useState } from "react";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Car(props: any) {
  let mixer: THREE.AnimationMixer | null = null;
  const car = useRef<RapierRigidBody | null>(null);
  const { scene, animations } = useGLTF("src/assets/models/car/car.gltf");

  const lookAtVec = new THREE.Vector3();
  const cameraVector = new THREE.Vector3();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  useEffect(() => {
    mixer = new THREE.AnimationMixer(scene);
    const action = mixer.clipAction(animations[0]);

    action.play();
  }, []);

  useFrame(({ camera, clock }) => {
    const boostActivePeriod = 0;
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta * 50);

    const { forward, backward, left, right, boost } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };

    const impulseStrength = delta * 2500;
    const boostedStrength = delta * 3500;
    const sidewayStrength = delta * 2000;
    const carPos = car?.current?.translation()!;

    if (forward) {
      impulse.x += boost ? boostedStrength : impulseStrength;
    }
    if (left) {
      impulse.z -= sidewayStrength;
    }
    if (right) {
      impulse.z += sidewayStrength;
    }
    // if (backward) {
    //   impulse.x -= boost ? boostedStrength : impulseStrength;
    // }

    cameraVector.copy(carPos);
    cameraVector.y += 2.25;
    cameraVector.x -= 7;
    smoothedCameraPosition.lerp(cameraVector, 0.1);

    lookAtVec.copy(cameraVector);
    smoothedCameraTarget.lerp(lookAtVec, 0.1);

    camera.position.copy(cameraVector);
    camera.lookAt(lookAtVec);

    car.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      ref={car}
      colliders={false}
      gravityScale={2}
      position={props.position}
    >
      <CuboidCollider
        position={[0, 0.5, 0]}
        args={[1.25, 0.75, 0.5]}
        friction={0.3}
        restitution={0}
        mass={10}
      />
      <primitive object={scene} scale={props.scale} />
    </RigidBody>
  );
}

useGLTF.preload("src/assets/models/car/car.gltf");
