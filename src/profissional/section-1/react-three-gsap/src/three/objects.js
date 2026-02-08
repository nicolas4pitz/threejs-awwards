import * as THREE from "three";

export function createBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "#f89504",
  });

  const box = new THREE.Mesh(geometry, material);
  return box;
}
