import { gsap } from "gsap/src/all.js";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function rotationMesh(mesh) {
  gsap.to(mesh.rotation, {
    x: Math.PI * 2,
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(mesh.rotation, {
    y: Math.PI * 2,
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(mesh.rotation, {
    z: Math.PI * 2,
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
}

export function scrool(mesh) {
  gsap.to(mesh.position, {
    y: 2,
    scroolTrigger: {
      trigger: "#root",
    },
  });
}

export function sucessionTimeline(mesh, mesh2, mesh3) {
  let tl1 = gsap.timeline({
    yoyo: true,
    repeat: -1,
    repeatDelay: 1,
  });

  tl1
    .to(mesh.position, { duration: 1, y: 5 })
    .to(mesh2.position, { duration: 3, y: 5 })
    .to(mesh3.position, { duration: 2, y: 5 });
}


export function narrativeTimeline(mesh, luz, camera){

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "+=300%",
      scrub: true,
      pin: true
    }
  })

  timeline.to(camera.position, {
    z: 2
  })

  gsap.to(mesh.rotation, {
    y: Math.PI * 2,
    scrollTrigger: {
      trigger: "#about",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  })

  gsap.to(mesh.scale, {
    x: 3,
    y: 2,
    z: 3,
    scrollTrigger: {
      trigger: "#contact",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  })

  gsap.to(luz, {
    intensity: 3,
    scrollTrigger: {
      trigger: "#contact",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  })

}