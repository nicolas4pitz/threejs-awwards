import * as THREE from "three";
import { createBox } from "./objects";
import { mudarMeshPosition } from "./objects";
import gsap from "gsap/src/all";
import { rotationMesh } from "../animations/transitions";

export function initThree(canvas) {
  const scene = new THREE.Scene();
  scene.background = "#808080";
  scene.fog = new THREE.Fog("#bb4433", 2, 15);

  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  return { scene, camera, renderer };
}

export function initWorld(scene) {
  const box = createBox();
  mudarMeshPosition(box, 0, 0, 0);
  rotationMesh(box);

  scene.add(box);

  return { box };
}
