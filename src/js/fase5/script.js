import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//Scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0x000000);
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

const ambient = new THREE.AmbientLight("#ff2255", 1);
ambient.position.set(-5, 2, 0);

const direcional = new THREE.DirectionalLight(0xffffff, 1);
direcional.target.position.set(2, 0, 0);
direcional.position.set(-2, 2, 0);

const helper = new THREE.DirectionalLightHelper(direcional, 1);
scene.add(helper);

const planeGeometry = new THREE.PlaneGeometry(3, 3, 32, 32);

const boxGeometry = new THREE.BoxGeometry(2, 2);

const mat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

const material = new THREE.MeshStandardMaterial({
  color: "#8fe970",
  roughness: 0.5,
  metalness: 0.2,
});

const material2 = new THREE.MeshStandardMaterial({
  color: "#f3D812",
  roughness: 0.5,
  metalness: 0.2,
});

const material3 = new THREE.MeshStandardMaterial({
  color: "#f23e90",
  roughness: 0.5,
  metalness: 0.2,
});

const materialShader = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float time;
    void main() {
      gl_FragColor = vec4(vUv.x, vUv.y, abs(sin(time)), 1.0);
    }
  `,
});

const materialFundo = new THREE.MeshBasicMaterial({
  color: 0x000000,
});

const plane = new THREE.Mesh(planeGeometry, material);
const box = new THREE.Mesh(boxGeometry, material);
const box2 = new THREE.Mesh(boxGeometry, material2);
const box3 = new THREE.Mesh(boxGeometry, material3);

const fundo = new THREE.Mesh(
  new THREE.PlaneGeometry(25, 25, 64, 64),
  materialFundo,
);

fundo.position.set(0, 0, -3);
scene.add(fundo);

plane.position.set(0, -2, -2);
box.position.set(5, -2, -2);
box2.position.set(0, 2, -2);
box3.position.set(-5, 1, -2);

scene.add(plane, box, box2, box3, direcional, ambient);

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
