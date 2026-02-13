import * as THREE from "three";
import { createAmbientLight, createDirectLight, mudarDirecaoLight, mudarPosicaoLight, mudarRotationLight } from "./lights";
import { createBox, createPlane } from "./objects";
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

  const plane = createPlane(5, 5, 2, 2, "#08b959");

  const directLight = createDirectLight();
  const ambientLight = createAmbientLight("#ffffff", 0.2);

  const helper = new THREE.DirectionalLightHelper(directLight, 1);
  
  mudarMeshPosition(box, 2, 0, 0);
  mudarMeshPosition(box3, -2, 0, 0);
  mudarMeshPosition(plane, 0, -4, -1);
  //rotationMesh(box);
  sucessionTimeline(box, box2, box3);

  mudarPosicaoLight(directLight, -1.2, 0, 0);
  
  mudarPosicaoLight(ambientLight, 10, 5, 0)
  
  mudarRotationLight(directLight, 0, 0, 11)

  scene.add(box, box2, box3, plane, ambientLight, directLight, helper);

  return { box };
}
