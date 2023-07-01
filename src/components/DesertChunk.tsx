import * as THREE from "three";
import { useControls } from "leva";
import Perlin from "../utils/Perlin";
import { useMemo } from "react";
import { RigidBody } from "@react-three/rapier";

interface DesertChunkProps {
  position: THREE.Vector3;
}

const DesertChunk = ({ position }: DesertChunkProps) => {
  const { color } = useControls("Ground", {
    color: "#ffd28e",
  });
  const pn = new Perlin("rnd" + new Date().getTime());

  const geometry = useMemo(() => {
    // Plane args
    const width = 100;
    const height = 100;
    const widthSegments = 60;
    const heightSegments = 60;

    const vertices = [];
    const faces = [];
    for (let y = 0; y <= heightSegments; y++) {
      for (let x = 0; x <= widthSegments; x++) {
        const u = x / widthSegments;
        const v = y / heightSegments;
        const xPos = u * width - width / 2;
        const yPos = v * height - height / 2;
        let zPos = pn.noise(xPos / 10, yPos / 10, 0);
        if (xPos === 50 || yPos === 50 || xPos === -50 || yPos === -50)
          zPos = 0;
        vertices.push(xPos, yPos, zPos);
        if (x < widthSegments && y < heightSegments) {
          const a = x + y * (widthSegments + 1);
          const b = x + (y + 1) * (widthSegments + 1);
          const c = x + 1 + y * (widthSegments + 1);
          const d = x + 1 + (y + 1) * (widthSegments + 1);
          faces.push(a, b, d);
          faces.push(a, d, c);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(faces);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <RigidBody
      colliders="trimesh"
      type="fixed"
      friction={0.25}
      restitution={0.01}
    >
      <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <bufferGeometry attach="geometry" {...geometry} />
        <meshLambertMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </RigidBody>
  );
};

export default DesertChunk;
