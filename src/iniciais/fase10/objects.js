import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { ScrollTrigger } from "gsap/all";

const boxGeometry = new THREE.BoxGeometry();

const materialStanWhite = new THREE.MeshStandardMaterial({
  color: "#000000",
});

const box = new THREE.Mesh(boxGeometry, materialStanWhite);

box.position.z = -2;
box.position.y = -5 / 2;
export default box;
