import * as THREE from "three";

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
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Ocupacao do renderizador na tela.
document.body.appendChild(renderer.domElement); // Coloca o renderizador no body. (Renderizador aparenta ser um Canva OBJ)

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
}); // Material Basic

const materialStandart = new THREE.MeshStandardMaterial({
  color: 0x10e9e0,
  roughness: 0.5,
}); // Material Standart

const cube = new THREE.Mesh(boxGeometry, greenMaterial); // Cria o corpo do cubo com a geometria e o material
const plane = new THREE.Mesh(planeGeometry, materialBasic);
const circle = new THREE.Mesh(circleGeometry, materialStandart);

plane.position.set(1, 1, 1);
circle.position.set(1, -1, 1);

scene.add(cube, plane, circle, light); // Adiciona o cubo a cena, mas nao renderiza

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  plane.rotation.y += 0.02;
  circle.rotation.y += 0.03;
  renderer.render(scene, camera);
}

function animateCube() {
  requestAnimationFrame(animateCube);

  renderer.render(scene, camera);
}

animate();
animateCube();
