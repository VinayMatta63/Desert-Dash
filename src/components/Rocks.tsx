import * as THREE from "three";
import Rock from "./Rock";
import { useMemo } from "react";

interface RocksProps {
  chunkIndex: number;
}

const Rocks = ({ chunkIndex }: RocksProps) => {
  const numberOfRocks = Math.floor((Math.random() + 0.1) * 10);

  const rocks = useMemo(() => {
    const result = [];
    for (let i = 0; i < numberOfRocks; i++) {
      let xMin = chunkIndex - 50;
      if (chunkIndex === 0) xMin = chunkIndex - 40;
      const zMin = -30;
      const xMax = chunkIndex + 50;
      const zMax = 30;
      const xPos = Math.floor(Math.random() * (xMax - xMin + 1) + xMin);
      const zPos = Math.floor(Math.random() * (zMax - zMin + 1) + zMin);
      const scale = Math.random() * 10;

      result.push(
        <Rock
          key={`${xPos} 1 ${zPos}`}
          position={new THREE.Vector3(xPos, scale + 0.2, zPos)}
          rotation={[0, Math.random() * 10, 0]}
          scale={scale}
        />
      );
    }
    return result;
  }, []);

  return rocks;
};

export default Rocks;
