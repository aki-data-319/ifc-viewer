import * as THREE from 'three';

/**
 * シーン用ヘルパー（グリッド・軸）を生成して返す関数
 * @returns {THREE.Object3D[]}
 */
export function createHelpers() {
  const gridHelper = new THREE.GridHelper(10, 10);
  const axesHelper = new THREE.AxesHelper(10);
  return [gridHelper, axesHelper];
}