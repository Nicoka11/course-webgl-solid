import { PerspectiveCamera, Renderer, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function resize(
  parent: HTMLElement,
  renderer: Renderer,
  camera: PerspectiveCamera
) {
  const w = parent.offsetWidth;
  const h = parent.offsetHeight;

  renderer.setSize(w, h);

  camera.aspect = w / h;

  camera.updateProjectionMatrix();
}

export function addResizeListener(
  parent: HTMLElement,
  renderer: Renderer,
  camera: PerspectiveCamera
) {
  window.addEventListener("resize", () => {
    resize(parent, renderer, camera);
  });
}

export function addOrbitControls(
  camera: PerspectiveCamera,
  renderer: Renderer
) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  return controls;
}

export const setupBasicScene = (target: HTMLElement) => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer({ antialias: true, canvas: target });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return { scene, camera, renderer };
};
