// src/cube.js
import * as THREE from 'three';

/**
 * キューブを生成して返す関数
 * @returns {THREE.Mesh}
 */
export function createCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x30ffff });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0); // 原点に配置
  return cube;
}