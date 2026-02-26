
import * as THREE from "three"
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js"
import { sin } from "three/tsl"
import { PMREMGenerator } from "three/webgpu"

const canvas = document.querySelector("#webgl")

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000)
camera.position.set(0, 0, 70)
camera.lookAt(0, 5, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0xf2f2f2)

initLight()

let mixer;

//Model

let model;
let model2;
let model3;
let model4;

function initModel(){
  const loader = new GLTFLoader();
  loader.load("/nike.glb", gltf => {
    model = gltf.scene;
    model.position.set(0, 5, 0)
    model.scale.set(5, 5, 5)
    model.rotation.x = 0.2;
    scene.add(model)
  })
}

initModel()

//END MODEL


// const controls = new OrbitControls(camera, renderer.domElement)
// controls.target.set(0, 0, 0)
// controls.update();

//Helper para lidar com os objetos em cena
// const axesHelper = new THREE.AxesHelper(30)
// const gridHelper = new THREE.GridHelper(50, 10)
// scene.add(axesHelper, gridHelper)

const geometryPlane = new THREE.PlaneGeometry(1000, 1000)
const materialPlane = new THREE.MeshStandardMaterial({
  color: 0x444444,
  roughness: 0.8,
  metalness: 0.0
})

// const ground = new THREE.Mesh(geometryPlane, materialPlane)
// ground.rotation.x = -Math.PI / 2
// ground.position.y = -5
// ground.receiveShadow = true;
// scene.add(ground)

const sphereGeometry = new THREE.SphereGeometry(5)

const geometry = new THREE.BoxGeometry(10, 10, 10)
const material = new THREE.MeshStandardMaterial({
  color: 0x2196f3,
  roughness: 0.3,
  metalness: 0.2
})

const cube = new THREE.Mesh(geometry, material)
cube.position.y += 5
cube.castShadow = true
cube.receiveShadow = true
//scene.add(cube)

function initPhongMeshs(){
  for (let index = 0; index < 5; index++) {
    const shinnes = index * 5

    const material = new THREE.MeshPhongMaterial({
      color: 0x45f974,
      shininess: shinnes,
      specular: 0xffffff
    })

    const mesh = new THREE.Mesh(sphereGeometry, material)
    mesh.receiveShadow = true
    mesh.castShadow = true
    mesh.position.set(index * 10 - 20, 5, -32)
    scene.add(mesh)
    
  }
}

function initMetallnesMeshs(){
  for (let index = 0; index < 5; index++) {
    const metalness = index / 4;

    const material = new THREE.MeshStandardMaterial({
      color: 0x94aa19,
      roughness: 0.0,
      metalness: metalness
    })

    const mesh = new THREE.Mesh(sphereGeometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.position.set(index * 10 - 20, 5, 32)
    scene.add(mesh)
    
  }
}

function initRoughnessMeshs(){
  for (let index = 0; index < 5; index++) {
  const roughness = index / 4;

  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    roughness: roughness,
    metalness: 0.0
  })

  const mesh = new THREE.Mesh(sphereGeometry, material)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.position.set(index * 10 - 20, 5, 0)
  scene.add(mesh)
  
  }
}


const speed = 1
const radius = 95

const clock = new THREE.Clock();

function animate(){
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  const elapsed = clock.getElapsedTime();
  mixer?.update(delta)
  if (model) {
    model.position.x = radius * Math.cos(elapsed * speed);
    model.position.z = radius * Math.sin(elapsed * speed);
    model.rotation.y += 0.0005;
  }
  //controls.update()
  renderer.render(scene, camera)
}

animate()




function initLight(){
  
  const sunLight = new THREE.DirectionalLight(0xffffff, 2.0)
  sunLight.position.set(0, 5, 70)
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024
  sunLight.shadow.mapSize.height = 1024
  const d = 50; 
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  scene.add(sunLight)

  const cameraLight = new THREE.AmbientLight(0xffffff, 1.2)
  cameraLight.position.set(0, 0, 70)
  scene.add(cameraLight)
}