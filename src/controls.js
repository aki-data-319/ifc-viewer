import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * OrbitControlsを生成して返す関数.OrbitControlsを初期化する。カメラとcanvasを渡して。カメラを回転・ズーム・パンできるようにするツール
 * @param {THREE.Camera} camera
 * @param {HTMLCanvasElement} canvas
 * @returns {OrbitControls}
 */
export function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  return controls;
}