
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { SceneOptimizer } from "three/examples/jsm/utils/SceneOptimizer.js"


gsap.registerPlugin(ScrollTrigger)

const transSition1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".diver-one",
        start: "top",
        end: "bottom",
        scrub: true,
        markers: true
    }
})

const transSition2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".diver-two",
        start: "top top",
        end: "bottom",
        scrub: true,
        markers: true
    }
})

// const manterNaTela = gsap.timeline({
//     scrollTrigger: {
        
//     }
// })


const scrollDoMouse = gsap.timeline({
    scrollTrigger: {
        trigger: ".body",
    }
})

const rodar = gsap.timeline({
    
})

const rodarX = gsap.timeline({

})


export default {transSition1, transSition2, rodar, rodarX, scrollDoMouse}