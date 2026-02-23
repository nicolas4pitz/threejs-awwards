<script>
  import { onMount } from "svelte"
  import * as THREE from "three"
  import gsap from "gsap"
  import ScrollTrigger from "gsap/ScrollTrigger"

  let canvas

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Scene
    const scene = new THREE.Scene()

    // Camera (Orthographic para fullscreen shader)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)

    // Textures
    const loader = new THREE.TextureLoader()
    const texture1 = loader.load("https://picsum.photos/1200/800?1")
    const texture2 = loader.load("https://picsum.photos/1200/800?2")

    const uniforms = {
      uTexture1: { value: texture1 },
      uTexture2: { value: texture2 },
      uProgress: { value: 0 }
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture1;
        uniform sampler2D uTexture2;
        uniform float uProgress;
        varying vec2 vUv;

        void main() {

          vec2 distortedUv = vUv + 
            vec2(0.0, sin(vUv.x * 10.0) * 0.1 * uProgress);

          vec4 tex1 = texture2D(uTexture1, distortedUv);
          vec4 tex2 = texture2D(uTexture2, distortedUv);

          gl_FragColor = mix(tex1, tex2, uProgress);
        }
      `
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Scroll
    gsap.to(uniforms.uProgress, {
      value: 1,
      scrollTrigger: {
        trigger: ".about",
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    })

    // Resize
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
    })
  })
</script>

<style>
  body {
    margin: 0;
  }

  canvas {
    position: fixed;
    inset: 0;
    z-index: -1;
  }

  section {
    height: 100vh;
  }
</style>

<canvas bind:this={canvas}></canvas>

<section class="hero"></section>
<section class="about"></section>