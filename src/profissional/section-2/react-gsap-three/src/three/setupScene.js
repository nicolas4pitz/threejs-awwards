import * as THREE from "three";
import { createDirectLight, mudarPosicaoLight } from "./lights";
import { createBox } from "./objects";
import gsap from "gsap/src/all";
import { ScrollTrigger } from "gsap/all";

import { materialNames } from "../utils/helpers";
import { narrativeTimeline } from "../animations/transitions";

gsap.registerPlugin(ScrollTrigger)

// Todas as mudancas do treejs fazer por aqui

export function initThree(canvas) {
  // Inicia o THREE JS
  const scene = new THREE.Scene();
  scene.background = "#808080";
  scene.fog = new THREE.Fog("#bb4433", 2, 15);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);


  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  return { scene, camera, renderer };
}

export function initWorld({scene, camera, renderer} = {}) {
  
  // Inicia o mundo dentro da scene em especifica
  //Objetos
  const box = createBox({
    materialMesh: materialNames.Phong
  });

  const directLight = createDirectLight();

  const helper = new THREE.DirectionalLightHelper(directLight, 1);
  //

  // Positions / Rotations

  mudarPosicaoLight(directLight, 2, 2, 5);

  //

  // Transitions

  narrativeTimeline(box, directLight, camera)
  //

  scene.add(box, directLight, helper);
}

