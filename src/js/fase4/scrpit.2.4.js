import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//Scene

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerWidth,
  0.1,
  1000,
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#three-canvas"),
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const materialPreto = new THREE.MeshBasicMaterial({
  color: 0x404040,
  side: THREE.DoubleSide,
});

const planeGeometry = new THREE.PlaneGeometry(0.5);

const cube = new THREE.Mesh(planeGeometry, materialPreto);

cube.position.set(0, 0, 0);

scene.add(cube);

ScrollTrigger.refresh();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const tlOne = gsap.timeline({
  // Timeline usa para criar o scrollTrigger e guardar em uma var para poder resgatar mais tarde e modificar, ou seja, sempre que quiser modificar usando essa div como ref, basta usar chamando com o gsap.to
  scrollTrigger: {
    trigger: ".diver-one",
    start: "top",
    end: "bottom",
    scrub: true,
    markers: true,
  },
});

const tlTwo = gsap.timeline({
  scrollTrigger: {
    trigger: ".diver-Two",
    start: "top",
    end: "bottom",
    scrub: true,
    markers: true,
  },
});

const tlThree = gsap.timeline({
  scrollTrigger: {
    trigger: ".diver-three",
    start: "top",
    end: "bottom",
    scrub: true,
    markers: true,
  },
});

tlOne.to(cube.position, {
  x: 2,
});

tlTwo.to(cube.scale, {
  x: 2,
  y: 2,
  z: 2,
});

tlThree.to(cube.rotation, {
  y: 3.1,
});

animate();
