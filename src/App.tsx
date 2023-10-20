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
    const { camera, renderer, scene } = setupBasicScene(elementTarget!);

    const controls = addOrbitControls(camera, renderer);

    const geometry = new IcosahedronGeometry(1, 10);
    const material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    addResizeListener(document.body, renderer, camera);

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      controls.update();

      renderer.render(scene, camera);
    }

    animate();
  });
  return (
    <canvas ref={elementTarget} class={css({ display: "block" })}></canvas>
  );
}

export default App;
