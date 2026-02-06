import * as THREE from "three";
import gsap from "gsap";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#three-canvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Object
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: "#808080" });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Light
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
const directional = new THREE.DirectionalLight(0xffffff, 0.6);
directional.position.set(2, 2, 2);
scene.add(ambient, directional);

// Transitions
function transitionOut(mesh) {
  return gsap.to(mesh.scale, {
    x: 0,
    y: 0,
    z: 0,
    duration: 1.2,
    ease: "power2.in",
  });
}

function transitionIn(mesh) {
  return gsap.fromTo(
    mesh.scale,
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1, z: 1, duration: 1.2 },
  );
}

async function loadPage(url) {
  const response = await fetch(
    `/js/fase9/pages${url === "/" ? "/home" : url}.html`,
  );
  return await response.text();
}

const app = document.querySelector("#app");

async function navigateTo(url) {
  await transitionOut(box);

  const html = await loadPage(url);
  app.innerHTML = html;

  history.pushState({}, "", url);

  bindLinks();
  transitionIn(box);
}

function bindLinks() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();
      navigateTo(link.getAttribute("href"));
    };
  });
}

window.addEventListener("popstate", async () => {
  const html = await loadPage(location.pathname);
  app.innerHTML = html;
  bindLinks();
});

document.querySelectorAll("[data-link]").forEach((link) => {
  link.addEventListener("click", async (e) => {
    e.preventDefault();

    await transitionOut(box);

    // 👉 aqui entraria a troca de página/conteúdo

    transitionIn(box);
  });
});

// Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
