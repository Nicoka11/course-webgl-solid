import { onMount } from "solid-js";
import { IcosahedronGeometry, Mesh, ShaderMaterial } from "three";
import { css } from "../styled-system/css";
import {
  addOrbitControls,
  addResizeListener,
  setupBasicScene,
} from "./utils/three.utils";
import vertex from "./shaders/basic.vert";
import fragment from "./shaders/basic.frag";

function App() {
  let elementTarget: HTMLCanvasElement | undefined = undefined;

  onMount(() => {
    let time: number = 0;
    const { camera, renderer, scene } = setupBasicScene(elementTarget!);

    const controls = addOrbitControls(camera, renderer);

    const geometry = new IcosahedronGeometry(1, 10);
    const material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        u_time: { value: time },
      },
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    addResizeListener(document.body, renderer, camera);

    function animate() {
      requestAnimationFrame(animate);

      controls.update();

      time += 0.02;
      material.uniforms.u_time.value = time;

      renderer.render(scene, camera);
    }

    animate();
  });
  return (
    <canvas ref={elementTarget} class={css({ display: "block" })}></canvas>
  );
}

export default App;
