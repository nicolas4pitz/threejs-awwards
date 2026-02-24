
import * as THREE from "three"
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js"
import { PMREMGenerator } from "three/webgpu"
import { fragmentShader, vertexShader } from "./helpers"
import { color } from "three/tsl"

const canvas = document.querySelector("#webgl")

const scene = new THREE.Scene()



const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000)
camera.position.set(100, 100, 100)
camera.position.set(0, 0, 150)


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

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)
controls.update();

const axesHelper = new THREE.AxesHelper(30)
const gridHelper = new THREE.GridHelper(50, 10)
scene.add(axesHelper, gridHelper)


const boxGeometry = new THREE.BoxGeometry(2, 2, 2, 256)
const layer01 = new THREE.TextureLoader().load("avatar.mp4")

layer01.wrapS = layer01.wrapT = THREE.RepeatWrapping;

const shaderMaterial = new THREE.RawShaderMaterial({
  uniforms: {
    colorMap: {
      value: layer01
    }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
})

const box = new THREE.Mesh(boxGeometry, shaderMaterial)

box.position.set(0, 0, 25)
box.scale.set(25, 25, 25)

scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(100, 100)
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff
})


const mesh = new THREE.Mesh(planeGeometry, material)
scene.add(mesh)


function animate(){
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()