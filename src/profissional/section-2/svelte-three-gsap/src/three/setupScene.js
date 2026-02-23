import * as THREE from "three";
import { createDirectLight, mudarPosicaoLight } from "./lights";
import { createBox, createPlane } from "./objects";
import gsap from "gsap/src/all";
import { ScrollTrigger } from "gsap/all";

import { materialNames } from "../utils/helpers";
import { narrativeTimeline, uniform } from "../animations/transitions";

gsap.registerPlugin(ScrollTrigger)

// Todas as mudancas do treejs fazer por aqui

export function initThree(canvas) {
  // Inicia o THREE JS
  const scene = new THREE.Scene();
  scene.background = new THREE.Color().setRGB(0.5, 0.8, 0.1);
  scene.fog = new THREE.Fog("#bb4433", 2, 15);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);


  window.addEventListener('resize', () => {
    //camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  return { scene, camera, renderer };
}

export function initWorld({scene, camera, renderer} = {}) {
  
  // Inicia o mundo dentro da scene em especifica
  //Objetos

  const loader = new THREE.TextureLoader()
  const texture1 = loader.load("https://picsum.photos/1200/800?1")
  const texture2 = loader.load("https://picsum.photos/1200/800?2")
  
  //Obj para controlar a transição
  const uniforms = {
    uTexture1: {value: texture1},
    uTexture2: {value: texture2 },
    uProgress: {value: 0}
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      uniform float uProgress;
      varying vec2 vUv;

      void main() {
        vec2 distortedUv = vUv + vec2(0.0, sin(vUv.x * 10.0) * 0.1 uProgress);
        vec4 tex1 = texture2D(uTexture1, distortedUv);
        vec4 tex2 = texture2D(uTexture2, distortedUv);

        vec4 finalTexture = mix(tex1, tex2, uProgress);

        gl_FragColor = finalTexture;
      }
    `
  })

  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  uniform(uniforms)

  //const directLight = createDirectLight();

  //const helper = new THREE.DirectionalLightHelper(directLight, 1);
  //

  // Positions / Rotations

  //mudarPosicaoLight(directLight, 2, 2, 5);

  //

  // Transitions


  //

}

