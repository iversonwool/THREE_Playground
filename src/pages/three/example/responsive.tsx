import React from 'react';
import styles from './index.less';
import * as THREE from 'three';
import { resizeRenderToDisplaySize } from './utils/renderer';

function ResponsiveDemo() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rafRef = React.useRef<number>();

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

  React.useEffect(function () {
    init();
  }, []);

  React.useEffect(function () {
    return function () {
      console.log('clear animation frame');
      cancelAnimationFrame(rafRef.current as number);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasContainer}></canvas>;
}

export default ResponsiveDemo;
