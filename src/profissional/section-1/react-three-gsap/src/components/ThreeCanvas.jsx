import { useEffect, useRef } from "react";
import { initThree } from "../three/setupScene";
import { initWorld } from "../three/setupScene";

export default function ThreeCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const { scene, camera, renderer } = initThree(canvasRef.current);
    const { box } = initWorld(scene);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
}
