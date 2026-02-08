import * as THREE from "three";
import { createBox } from "./objects";
import { mudarMeshPosition } from "./objects";
import gsap from "gsap/src/all";
import { rotationMesh } from "../animations/transitions";
import { sucessionTimeline } from "../animations/transitions";

// Todas as mudancas do treejs fazer por aqui

export function initThree(canvas) {
  // Inicia o THREE JS
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
  // Inicia o mundo dentro da scene em especifica
  const box = createBox();
  const box2 = createBox();
  const box3 = createBox();

  mudarMeshPosition(box, 2, 0, 0);
  mudarMeshPosition(box3, -2, 0, 0);
  //rotationMesh(box);
  sucessionTimeline(box, box2, box3);

  scene.add(box, box2, box3);

  return { box };
}
