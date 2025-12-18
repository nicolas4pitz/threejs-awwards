import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// textura (imagem)
const texture = new THREE.TextureLoader().load(
  'https://threejs.org/examples/textures/uv_grid_opengl.jpg'
);

// plano
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.MeshBasicMaterial({ map: texture });
const plane = new THREE.Mesh(geometry, material);

scene.add(plane);

material.transparent = true;

// loop de animação
function animate() {
  requestAnimationFrame(animate);

  material.opacity = (Math.sin(Date.now() * 0.002) + 1) / 2;

  renderer.render(scene, camera);
}

animate();