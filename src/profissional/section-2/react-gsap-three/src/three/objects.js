import * as THREE from "three";

import { materialMap } from "../utils/helpers";

//Cria os objetos, nao necessariamente relacionada a uma scene especifica

//Usando objetos de opções como parametro, assim é possível chamar qualquer opção subsequente sem se preocupar com a ordem
export function createBox({ width = 1, height = 1, color = "#ffffff", materialMesh = "Standard" } = {}) {
  const { geometry, material } = switchParaBox(width, height, color, materialMesh);
  return new THREE.Mesh(geometry, material);
}

export function createPlane({width = 1, height = 1, wSegments = 1, hSegments = 1, color = "#f89504", materialMesh = "Standard"} = {}){
  const { geometry, material } = switchParaPlane(width, height, wSegments, hSegments, color, materialMesh);
  return new THREE.Mesh(geometry, material);
}

function switchParaBox(width, height, color, materialMesh) {
  const geometry = new THREE.BoxGeometry(width, height);
  const MaterialClass = materialMap[materialMesh] || THREE.MeshStandardMaterial;
  const material = new MaterialClass({ color });
  return { geometry, material };
}

function switchParaPlane(width, height, wSegments, hSegments, color, materialMesh) {
  const geometry = new THREE.PlaneGeometry(width, height, wSegments, hSegments);
  const MaterialClass = materialMap[materialMesh] || THREE.MeshStandardMaterial;
  const material = new MaterialClass({ color });
  return { geometry, material };
}
