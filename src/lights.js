import * as THREE from 'three';

/**
 * シーン用ライトを生成して返す関数
 * @returns {THREE.Light[]}
 */
export function createLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // 必要に応じて他のライトもここで追加可能
  return [ambientLight];
}