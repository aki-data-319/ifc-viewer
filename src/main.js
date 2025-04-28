// src/main.js
import * as THREE from 'three';
import { createCube } from './cube';

// === 1. Canvas取得 ===
const canvas = document.getElementById('three-canvas');

// === 2. シーン作成 ===
const scene = new THREE.Scene();
// ①-1 デバッグ用に window にぶら下げる
window.scene = scene;

scene.background = new THREE.Color(0xeeeeee);

// === 3. カメラ作成 ===
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
// カメラを斜め上から原点を見る位置に配置
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 0, 5); // X=0, Y=0, Z=5
camera.lookAt(0, 0, 0); // 必ず原点を向かせる
scene.add(camera);

// === 4. レンダラー作成 ===
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
// ②-1 デバッグ用に window にぶら下げる
window.renderer = renderer;

renderer.render(scene, camera);

// === 5. リサイズ対応 ===
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
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();