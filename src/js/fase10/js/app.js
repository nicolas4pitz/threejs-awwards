
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { OrbitControls } from "three/examples/jsm/Addons.js"


//
import camera from "./camera"

import box from "./objects"
import transition from "./transition"
//

const scene = new THREE.Scene()
scene.background = "#808080"
scene.fog = new THREE.Fog("#f55f1f", 6, 8);

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


// window.addEventListener("scroll", () => {
//   const scrollY = window.scrollY; 
//   box.position.y = scrollY * 0.005;
// });

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

transition.transSition1.to(box.scale, {
    x: 2,
})

transition.transSition2.to(box.scale, {
    y: 2,
})

transition.rodar.to(box.rotation, {
    y: Math.PI * 2,
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
})

transition.rodarX.to(box.rotation, {
    x: Math.PI * 2,
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
})

ScrollTrigger.create({
    trigger: ".diver-two",
    start: "center center",
    pin: true,
    end: "+=300"
})


transition.scrollDoMouse.to(box.position, {
    y: box.position.y += 1
})

animate()