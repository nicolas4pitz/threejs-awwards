import * as THREE from "three";
import { createBox } from "./objects";

export function initThree(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });

  return { scene, camera, renderer };
}

export function initWorld(scene) {
  const box = createBox();
  scene.add(box);

  return { box };
}
