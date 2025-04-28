// src/main.js
import * as THREE from 'three';
import { createCube } from './cube';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCamera } from './camera';
import { createLights } from './lights';
import { createHelpers } from './helpers';
import { createControls } from './controls';
import { createRenderer } from './renderer';

// === 1. Canvas取得 ===
const canvas = document.getElementById('three-canvas');

// === 2. シーン作成 ===
const scene = new THREE.Scene();
// ①-1 デバッグ用に window にぶら下げる
window.scene = scene;
scene.background = new THREE.Color(0xeeeeee);

// === 3. ライト生成＆追加 ===
createLights().forEach(light => scene.add(light));

// === 4. ヘルパー生成＆追加 ===
createHelpers().forEach(helper => scene.add(helper));

// === 5. カメラ作成 ===
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
const camera = createCamera(sizes);
scene.add(camera);

// === 7. レンダラー生成 ===
const renderer = createRenderer(canvas, sizes);
window.renderer = renderer;

// === 6. コントロール生成 ===
const controls = createControls(camera, renderer.domElement);

renderer.render(scene, camera);

// === 7. リサイズ対応 ===
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// === これ以降は立方体の作成をしているだけ ===
const cube = createCube();
scene.add(cube);

// === アニメーションループ ===
function animate() {
  requestAnimationFrame(animate);
  // キューブを回転させる
  cube.rotation.x += 0.03;
  cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();