import React from 'react';
import styles from './index.less';
import * as THREE from 'three';

function ResponsiveDemo() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rafRef = React.useRef<number>();

  function resizeRenderToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return false;
    const needResize = width !== canvas.width || height !== canvas.height;
    if (needResize) {
      // 更新渲染器的尺寸 fix锯齿问题
      console.log('renderer resize', canvas.clientWidth, canvas.clientHeight);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    return needResize;
  }

  function init() {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current as HTMLCanvasElement,
      antialias: true,
    });

    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0f0f });
    const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(0, 0, 0)
    // mesh.rotation.x = 4;
    // mesh.rotation.y = 4;
    scene.add(mesh);

    {
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    const camera = new THREE.PerspectiveCamera(60, 2, 1, 100);
    camera.position.set(0, 0, 2);
    // renderer.render(scene, camera)

    function animate(timestamp: DOMHighResTimeStamp) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      // console.log(timestamp)
      const seconds = timestamp / 1000;
      mesh.rotation.x = seconds;
      mesh.rotation.y = seconds;
      // mesh.rotation.z = seconds
      if (resizeRenderToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        // 更新相机的aspect fix变形问题
        console.log('update projection matrix', canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }

    animate(2000);
  }

  function pause() {
    cancelAnimationFrame(rafRef.current as number);
  }

  React.useEffect(function () {
    init();
  }, []);

  React.useEffect(function () {
    return function () {
      console.log('clear animation frame');
      cancelAnimationFrame(rafRef.current as number);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvasContainer}></canvas>
      <button type="button" onClick={pause}>
        pause
      </button>
    </>
  );
}

export default ResponsiveDemo;
