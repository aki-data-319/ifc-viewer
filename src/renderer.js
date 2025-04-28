import * as THREE from 'three';

/**
 * WebGLRendererを生成して返す関数
 * @param {HTMLCanvasElement} canvas
 * @param {Object} sizes - { width, height }
 * @returns {THREE.WebGLRenderer}
 */
export function createRenderer(canvas, sizes) {
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  return renderer;
}