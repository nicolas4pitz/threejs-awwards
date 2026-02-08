import * as THREE from "three";

//Cria os objetos, nao necessariamente relacionada a uma scene especifica

export function createBox() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: "#f89504",
  });

  const box = new THREE.Mesh(geometry, material);
  return box;
}

export function mudarMeshPosition(mesh, x = 0, y = 0, z = 0) {
  mesh.position.set(x, y, z);
}
