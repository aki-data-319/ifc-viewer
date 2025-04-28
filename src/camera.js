import * as THREE from 'three';

/**
 * カメラを生成して返す関数
 * @param {Object} sizes - { width, height }
 * @returns {THREE.PerspectiveCamera}
 */
export function createCamera(sizes) {
  // カメラを斜め上から原点を見る位置に配置
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
  camera.position.set(10, 10, 20);
  camera.lookAt(0, 0, 0);
  return camera;
} 