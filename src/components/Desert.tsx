import { useFrame } from "@react-three/fiber";
import DesertChunk from "./DesertChunk";
import * as THREE from "three";
import { useState } from "react";

const Desert = () => {
  const [chunks, setChunks] = useState([
    {
      index: 0,
      chunk: (
        <DesertChunk
          key={0}
          chunkIndex={0}
          position={new THREE.Vector3(0, 0, 0)}
        />
      ),
    },
    {
      index: 100,
      chunk: (
        <DesertChunk
          key={100}
          chunkIndex={100}
          position={new THREE.Vector3(100, 0, 0)}
        />
      ),
    },
    {
      index: 200,
      chunk: (
        <DesertChunk
          key={200}
          chunkIndex={200}
          position={new THREE.Vector3(200, 0, 0)}
        />
      ),
    },
  ]);

  useFrame(({ camera }) => {
    if (
      chunks[0].index / 2 < camera.position.x / 2 &&
      (Math.floor(camera.position.x) + 7) % 50 === 0
    ) {
      setChunks([
        ...chunks.slice(1),
        {
          index: chunks[2].index + 100,
          chunk: (
            <DesertChunk
              key={chunks[2].index + 100}
              chunkIndex={chunks[2].index + 100}
              position={new THREE.Vector3(chunks[2].index + 100, 0, 0)}
            />
          ),
        },
      ]);
    }
  });

  return chunks.map((chunk) => chunk.chunk);
};

export default Desert;
