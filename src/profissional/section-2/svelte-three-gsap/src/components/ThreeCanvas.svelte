<script>
  import { onMount } from "svelte";
  import { initThree, initWorld } from "../three/setupScene";
  let canvas;

  onMount(() => {
    const { scene, camera, renderer } = initThree(canvas);
    initWorld({ scene, camera, renderer });

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  });
</script>

<canvas bind:this={canvas} id="three-canvas"></canvas>