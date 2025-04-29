// src/main.js
import * as THREE from 'three';
import { createCube } from './cube';
import { createCamera } from './camera';
import { createLights } from './lights';
import { createHelpers } from './helpers';
import { createControls } from './controls';
import { createRenderer } from './renderer';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { loadIFCModel } from './ifcLoaderUtil';




// ─── グローバルエラーハンドリング ─────────────────────
window.addEventListener('error', ev => {
  console.error('🔴 Uncaught Error:', ev.error || ev.message, {
    file: ev.filename, line: ev.lineno, col: ev.colno
  });
});
window.addEventListener('unhandledrejection', ev => {
  console.error('🔴 Unhandled Promise Rejection:', ev.reason);
});

// ─── wasm エクスポートをデバッグ ──────────────────────
async function debugWasmExports() {
  try {
    const resp = await fetch('wasm/web-ifc.wasm');
    const buf  = await resp.arrayBuffer();
    const mod  = await WebAssembly.compile(buf);
    const infos = WebAssembly.Module.exports(mod);
    // name と kind の両方を出力
    console.log(
      '🔍 wasm export names+kind:',
      infos.map(e => `${e.name} (${e.kind})`)
    );
  } catch (e) {
    console.error('⚠️ wasm export debug failed:', e);
  }
}
debugWasmExports();



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

// === 6. レンダラー生成 ===
const renderer = createRenderer(canvas, sizes);
window.renderer = renderer;

// === 7. コントロール生成 ===
const controls = createControls(camera, renderer.domElement);

renderer.render(scene, camera);

// === 8. リサイズ対応 ===
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// === 9. IFCLoaderの初期化 ===
const ifcLoader = new IFCLoader();
// WASMパスを設定（相対パスで問題ないはず）
ifcLoader.ifcManager.setWasmPath('wasm/');

console.log('▶ IfcLoader initialized, wasmPath =', 'wasm/');

// === 10. IFCファイルの読み込み ===
async function initIFC() {
  try {
    console.log('🔍 IFCファイル読み込み開始...');
    const model = await loadIFCModel(ifcLoader, 'ifc/test.ifc', scene);
    console.log('✅ IFCモデルの読み込みに成功しました', model);
  } catch (e) {
    console.error('🔴 IFCモデルの読み込みに失敗しました');
    console.error('エラー詳細:', e);
    
    // エラーの種類を判別
    if (e.toString().includes('ba is not a function')) {
      console.error('💡 WASMエクスポート関数の不一致が発生しています。');
      console.error('   WASMファイルとJSファイルのバージョンが一致していない可能性があります。');
    }
  }
}
initIFC();

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

