
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { OrbitControls } from "three/examples/jsm/Addons.js"

//
import camera from "./camera"

import box from "./objects"
//

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#three-canvas"),
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)



const boxGeometry = new THREE.BoxGeometry()

const materialStanWhite = new THREE.MeshStandardMaterial({
    color: "#000000"
})


const test = new THREE.Mesh(boxGeometry, materialStanWhite)

scene.add(box)

function animate(){
    requestAnimationFrame(animate)
    
}

renderer.render(scene, camera)