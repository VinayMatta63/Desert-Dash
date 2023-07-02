import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { cloneElement, useMemo } from "react";

export default function Rock(props: any) {
  const gltf = useGLTF("src/assets/models/desert_rocks/scene.gltf");
  const scene = useMemo(() => {
    return gltf.scene.clone();
  }, [gltf]);

  return (
    <RigidBody type="fixed" colliders="cuboid">
      {cloneElement(<primitive object={scene} {...props} />)}
    </RigidBody>
  );
}

useGLTF.preload("src/assets/models/desert_rocks/scene.gltf");
