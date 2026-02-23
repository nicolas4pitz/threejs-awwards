
import * as THREE from "three"
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js"
import { PMREMGenerator } from "three/webgpu"

const canvas = document.querySelector("#webgl")

const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x000000, 0.002)

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000)
camera.position.set(100, 100, 100)
camera.lookAt(0, 0, 0);

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
renderer.setClearColor(0x262626)

initLight()

let mixer;

//Model

const loader = new GLTFLoader();
loader.load("/Soldier.glb", gltf => {
  const model = gltf.scene;

  model.position.set(0, 0, 0)
  model.scale.set(20, 20, 20)
  
  
  scene.add(model)

  const animations = gltf.animations;

  mixer = new THREE.AnimationMixer(model)
  const walkAnimation = animations.find(animation => animation.name === "Walk")
  if(walkAnimation){
    const walkAction = mixer.clipAction(walkAnimation)
    walkAction.play()
  }

})

//END MODEL


const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)
controls.update();

//Helper para lidar com os objetos em cena
const axesHelper = new THREE.AxesHelper(30)
const gridHelper = new THREE.GridHelper(50, 10)
scene.add(axesHelper, gridHelper)

const geometryPlane = new THREE.PlaneGeometry(1000, 1000)
const materialPlane = new THREE.MeshStandardMaterial({
  color: 0x444444,
  roughness: 0.8,
  metalness: 0.0
})
const ground = new THREE.Mesh(geometryPlane, materialPlane)
ground.rotation.x = -Math.PI / 2
ground.position.y = -5
ground.receiveShadow = true;
scene.add(ground)

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

const clock = new THREE.Clock();

function animate(){
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  mixer?.update(delta)
  controls.update()
  renderer.render(scene, camera)
}

animate()




function initLight(){
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.5)
  sunLight.position.set(10, 10, 10)
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024
  sunLight.shadow.mapSize.height = 1024
  const d = 50; 
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  scene.add(sunLight)
}