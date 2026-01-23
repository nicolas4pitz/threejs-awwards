import * as THREE from "three";
import { gsap } from "gsap";

//E preciso criar a cena, camera, renderizador para o THREE JS Inicial e basico
// Cena
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // campo de visao,
  window.innerWidth / window.innerHeight, // Resolucao (12/7) ou (13/9) etc
  0.1, // O quao perto o comeco do campo de visao esta
  1000, // O quao longe o nosso campo de visao vai
);

camera.position.z = 5;

// Criando o Renderizador, o que atualiza a cena constantemente. E por ele que controlamos a cena, no qual podemos renderizar cena e criar cena diferente
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#three-canvas"), // Coloca no canvas
  alpha: true, // Fundo transparente
});
renderer.setSize(window.innerWidth, window.innerHeight); // Ocupacao do renderizador na tela.

// Com isso o THREE esta pronto, agora podemos criar geometria, material, e tudo que quisermos colocar na nossa cena
// Geometria + Material
const boxGeometry = new THREE.BoxGeometry(); // Cria a geometria, mas nao o corpo em si
const planeGeometry = new THREE.RingGeometry(); // Cria a geometria, mas nao o corpo em si
const circleGeometry = new THREE.SphereGeometry(); // Cria a geometria, mas nao o corpo em si

const colorRed = new THREE.Color().set(0xff0000); // Color

const light = new THREE.AmbientLight(0xffd700); //Luz ambiente

const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Cria o material
const materialBasic = new THREE.MeshBasicMaterial({
  color: colorRed,
  side: THREE.DoubleSide,
}); // Material Basic -> Nao age com a luz

const materialStandart = new THREE.MeshStandardMaterial({
  color: 0x10e9e0,
  roughness: 0.5,
}); // Material Standart -> Metalico e reflete luz, age com a luz

const cube = new THREE.Mesh(boxGeometry, greenMaterial); // Cria o corpo do cubo com a geometria e o material
const plane = new THREE.Mesh(planeGeometry, materialBasic);
const circle = new THREE.Mesh(circleGeometry, materialStandart);

plane.position.set(1, 1, 1);
circle.position.set(1, -1, 1);
cube.position.set(-2, cube.position.y + window.scrollY, -2); // Fazendo o position.y desse jeito impede aquele flick que da quando faz o scroll pela primeira vez

scene.add(cube, plane, circle, light); // Adiciona o cubo a cena, mas nao renderiza

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const maxScroll = document.body.scrollHeight - window.innerHeight;
// FORMA DE MOVER OS OBJETOS JUNTO AO SCROLL
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY; // PEGA O VALOR DE SCROLLY PARA FAZER O CALCULO ABAIXO
  const scrollProgrees = scrollY / maxScroll;
  cube.position.y = scrollProgrees * Math.PI * 2;
  cube.rotation.y = scrollProgrees * Math.PI * 2;
  // camera.position.z = 5 - scrollProgrees * 3;  Efeito de "entrar na cena"
  plane.position.y = scrollY * 0.005;
});

// **ATENCAO** E NECESSARIO O ANIMATE PARA FUNCIONAR QUALQUER TIPO DE ANIMACAO, SEM ELE O GSAP SOZINHO NAO FUNCIONA
gsap.to(circle.position, {
  // Muda a position.y dele
  // Gsap e o padrao para animacoes
  y: Math.PI * 2,
  duration: 2,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true,
});

const button = document.querySelector("#botao");

button.addEventListener("mouseenter", () => {
  gsap.to(plane.position, {
    y: Math.PI * 2,
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
});

button.addEventListener("click", () => {
  gsap.to(cube.material.color, {
    set: Math.random() * 0xff0000,
  });
});

animate();
