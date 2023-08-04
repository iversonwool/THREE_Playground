import * as THREE from 'three';

export function resizeRenderToDisplaySize(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (width === 0 || height === 0) return false;
  const needResize = width !== canvas.width || height !== canvas.height;
  if (needResize) {
    // 更新渲染器的尺寸 fix锯齿问题
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }
  return needResize;
}
