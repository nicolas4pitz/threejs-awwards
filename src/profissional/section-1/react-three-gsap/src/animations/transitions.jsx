import { gsap } from "gsap/src/all.js";

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
