import * as THREE from "three";
import { createAmbientLight, createDirectLight, mudarDirecaoDirectLight, mudarPosicaoDirectLight } from "./lights";
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

  const light = createDirectLight();
  const ambientLight = createAmbientLight("#ffffff", 0.2);

  const helper = new THREE.DirectionalLightHelper(light, 1);
  
  mudarMeshPosition(box, 2, 0, 0);
  mudarMeshPosition(box3, -2, 0, 0);
  mudarMeshPosition(plane, 0, -4, -1);
  //rotationMesh(box);
  sucessionTimeline(box, box2, box3);

  mudarDirecaoDirectLight(light, 0, 2, 0);
  mudarPosicaoDirectLight(light, 0, 0, 0);
  mudarPosicaoDirectLight(ambientLight, 0, 10, 0)

  scene.add(box, box2, box3, plane, ambientLight, light, helper);

  return { box };
}
