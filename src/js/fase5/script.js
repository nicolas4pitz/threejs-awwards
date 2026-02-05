import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog("#0f0f0f", 5, 15);
//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;
//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#three-canvas"),
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

//OBJS
//

const ambient = new THREE.AmbientLight(0xffffff, 0.8);
const direcional = new THREE.DirectionalLight(0xffffff, 1);
direcional.target.position.set(0, 0, 0);
scene.add(direcional.target);
direcional.position.set(1, 1, 1);

const helper = new THREE.DirectionalLightHelper(direcional, 1);
scene.add(helper);

const planeGeometry = new THREE.PlaneGeometry(3, 3, 32, 32);

const materialCinza = new THREE.MeshStandardMaterial({
  color: 0x404040,
  side: THREE.DoubleSide,
  roughness: 0.5,
  metalness: 0.2,
});

const materialFundo = new THREE.MeshBasicMaterial({
  color: 0x000000,
});

const plane = new THREE.Mesh(planeGeometry, materialCinza);

const fundo = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 64, 64),
  materialFundo,
);

fundo.position.set(500, 500, 500);

scene.add(fundo);

plane.position.set(0, 0, -10);

scene.add(plane, ambient, direcional);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

// gsap.to(plane.rotation, {
//   y: 2,
//   duration: 2,
//   ease: "power2.inOut",
//   repeat: -1,
//   yoyo: true,
// });

// gsap.to(plane.rotation, {
//   x: 2,
//   duration: 2,
//   ease: "power2.inOut",
//   repeat: -1,
//   yoyo: true,
// });

// gsap.to(plane.rotation, {
//   z: 2,
//   duration: 2,
//   ease: "power2.inOut",
//   repeat: -1,
//   yoyo: true,
// });

animate();
