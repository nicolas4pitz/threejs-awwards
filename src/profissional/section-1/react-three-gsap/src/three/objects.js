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

export function createPlane(width = 1, height = 1, wSegments = 1, hSegments = 1, material = "#f89504"){
  const geometry = new THREE.PlaneGeometry(width, height, wSegments, hSegments);
  const materialMesh = new THREE.MeshStandardMaterial({
    color: material
  })

  const plane = new THREE.Mesh(geometry, materialMesh)
  return plane
}

export function mudarMeshPosition(mesh, x = 0, y = 0, z = 0) {
  mesh.position.set(x, y, z);
}
