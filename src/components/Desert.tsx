import React from "react";
import DesertChunk from "./DesertChunk";
import * as THREE from "three";

const chunks = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(100, 0, 0),
  new THREE.Vector3(200, 0, 0),
];

const Desert = () => {
  return chunks.map((chunk, index) => (
    <DesertChunk key={index} position={chunk} />
  ));
};

export default Desert;
