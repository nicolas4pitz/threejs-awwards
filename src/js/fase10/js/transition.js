import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SceneOptimizer } from "three/examples/jsm/utils/SceneOptimizer.js";
import { ScrollSmoother } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.2,
  effects: true,
});

const transSition1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".diver-one",
    start: "top",
    end: "bottom",
    scrub: true,
    markers: true,
  },
});

const transSition2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".diver-two",
    start: "top top",
    end: "bottom",
    scrub: true,
    markers: true,
  },
});

// const manterNaTela = gsap.timeline({
//     scrollTrigger: {

//     }
// })

const scrollDoMouse = gsap.timeline({
  scrollTrigger: {
    trigger: ".body",
    scrub: true,
  },
});

const rodar = gsap.timeline({});

const rodarX = gsap.timeline({});

export default { transSition1, transSition2, rodar, rodarX, scrollDoMouse };
