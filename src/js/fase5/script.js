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

const ambient = new THREE.AmbientLight(0xffffff, 1);
ambient.position.set(2, 2, -200)
const direcional = new THREE.DirectionalLight(0xffffff, 1);
direcional.target.position.set(0, 0, 0);
direcional.position.set(0, 0, 0);

const helper = new THREE.DirectionalLightHelper(direcional, 1);
scene.add(helper);

const planeGeometry = new THREE.PlaneGeometry(3, 3, 32, 32);

const boxGeometry = new THREE.BoxGeometry(2, 2);

const mat = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide,
})

const material = new THREE.MeshStandardMaterial({
  color: '#8fe970',
  roughness: 0.5,
  metalness: 0.2,
});

const materialFundo = new THREE.MeshBasicMaterial({
  color: 0x000000,
});

const plane = new THREE.Mesh(planeGeometry, material);
const box = new THREE.Mesh(boxGeometry, material);


const fundo = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 64, 64),
  materialFundo,
);

fundo.position.set(500, 500, 500)


plane.position.set(0, 0, -2);
box.position.set(5, 0, -2)

scene.add(plane, direcional, ambient);

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
