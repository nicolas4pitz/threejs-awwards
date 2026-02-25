
import * as THREE from "three"
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js"
import { PMREMGenerator } from "three/webgpu"
//import { fragmentShader, vertexShader } from "./helpers"
import { color } from "three/tsl"



class InitThree {


  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: document.querySelector(canvas)
    })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.axesHelper = new THREE.AxesHelper(30)
    this.gridHelper = new THREE.GridHelper(50, 10)
  }

  main() {
    this.init()
  }

  init() {
    this.camera.position.set(100, 100, 100)
    this.camera.position.set(0, 0, 150)

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x262626)

    this.controls.target.set(0, 0, 0)
    this.controls.update();

    this.scene.add(this.axesHelper, this.gridHelper)

    this.initLight()
    this.world()
    this.animate()
    
  }

  animate(){
    requestAnimationFrame(this.animate.bind(this))
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  world(){
    const planeGeo = new THREE.PlaneGeometry(1000, 1000)
    
    const boxGeometry = new THREE.BoxGeometry(100, 100)
    const material = new THREE.MeshStandardMaterial({
      color: 0x45f844,
      roughness: 0.5,
      metalness: 0.1
    })
    const greyMaterial = new THREE.MeshStandardMaterial({
      color: 0x080808,
    })
    const mesh = new THREE.Mesh(boxGeometry, material)
    const plane = new THREE.Mesh(planeGeo, greyMaterial)
    plane.rotation.x = -Math.PI / 2
    plane.position.y = -5
    mesh.castShadow = true;



    this.scene.add(mesh, plane)

  }



  initLight(){
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    
  
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
    this.scene.add(sunLight, ambientLight)
  }

}






//const layer01 = new THREE.TextureLoader().load("avatar.mp4")

// const shaderMaterial = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader
// })

//const box = new THREE.Mesh(boxGeometry, shaderMaterial)

// box.position.set(0, 0, 25)
// box.scale.set(25, 25, 25)

// scene.add(box)





//const mesh = new THREE.Mesh(planeGeometry, material)
//scene.add(mesh)



const main = new InitThree("#webgl")
main.main();