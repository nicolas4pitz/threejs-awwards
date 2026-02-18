import * as THREE from "three";
import { createAmbientLight, createDirectLight, mudarPosicaoLight, mudarRotationLight } from "./lights";
import { createBox, createPlane } from "./objects";
import { mudarMeshPosition } from "./actionsObjs";
import gsap from "gsap/src/all";
import { sucessionTimeline, scrool } from "../animations/transitions";
import { ScrollTrigger } from "gsap/all";

import { materialNames } from "../utils/helpers";

gsap.registerPlugin(ScrollTrigger)

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
  //Objetos
  const box = createBox({
    materialMesh: materialNames.Phong
  });
  const box2 = createBox({
    materialMesh: materialNames.Basic
  });
  const box3 = createBox({
    materialMesh: materialNames.Physical
  });

  const plane = createPlane({
    width: 5,
    height: 5,
    wSegments: 2,
    hSegments: 2,
    color: "#451f8a"
  });

  const directLight = createDirectLight();
  const ambientLight = createAmbientLight("#ffffff", 0.2);

  const helper = new THREE.DirectionalLightHelper(directLight, 1);
  //

  // Positions / Rotations
  mudarMeshPosition(box, 2, 0, 0);
  mudarMeshPosition(box3, -2, 0, 0);
  mudarMeshPosition(plane, 0, -4, -1);

  mudarPosicaoLight(directLight, -1.2, 0, 0);
  mudarPosicaoLight(ambientLight, 10, 5, 0)
  mudarRotationLight(directLight, 0, 0, 11)

  //

  // Transitions
  sucessionTimeline(box, box2, box3);
  scrool(plane)

  //

  scene.add(box, box2, box3, plane, ambientLight, directLight, helper);

  return { box };
}

