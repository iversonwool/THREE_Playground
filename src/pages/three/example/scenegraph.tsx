import React from 'react';
import styles from './index.less';
import * as THREE from 'three';
import GUI from 'lil-gui'
import { resizeRenderToDisplaySize } from './utils/renderer';
import AxisGrigHelper from './utils/lil_gui'



function Scenegraph() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rafRef = React.useRef<number>();

  function init() {
    const objects: THREE.Object3D[] = [];

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current as HTMLCanvasElement,
      antialias: true,
    });
    const gui = new GUI()

    function makeAxisGrid(node: THREE.Object3D, label: string, unit?: number) {
      const helper = new AxisGrigHelper(node, unit)
      gui.add(helper, 'visible').name(label)
    }

    const scene = new THREE.Scene();
    // 将整个场景绕z旋转20度 x轴旋转40度
    scene.rotation.set(THREE.MathUtils.degToRad(45), 0 , THREE.MathUtils.degToRad(20));

    // 空的场景图
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    const segments = 60;
    const widthSegments = segments;
    const heightSegments = segments;
    const sphereGeometry = new THREE.SphereGeometry(1, widthSegments, heightSegments);
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);

    objects.push(earthMesh);

    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    earthOrbit.add(earthMesh);
    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
    });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5);
    objects.push(moonMesh);

    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    moonOrbit.add(moonMesh);
    earthOrbit.add(moonOrbit);

    {
      // 点光源
      // 在场景中心
      const light = new THREE.PointLight(0xffffff, 500);
      scene.add(light);
    }

    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
    // camera.position.set(0, 50, 0);
    camera.position.set(0, 0, 50);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);

    makeAxisGrid(solarSystem, 'solarSystem', 26)
    makeAxisGrid(sunMesh, 'sunMesh')
    makeAxisGrid(earthOrbit, 'earthOrbit')
    makeAxisGrid(earthMesh, 'earthMesh')
    makeAxisGrid(moonOrbit, 'moonOrbit')
    makeAxisGrid(moonMesh, 'moonMesh')
    

    function animate(timestamp: DOMHighResTimeStamp) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      const seconds = timestamp / 1000;
      objects.forEach((mesh) => {

        // const axes = new THREE.AxesHelper();
        // (axes.material as THREE.Material).depthTest = false
        // axes.renderOrder = 1
        // mesh.add(axes)

        mesh.rotation.y = seconds;
      });
      // sunMesh.rotation.x = seconds
      // sunMesh.rotation.z = seconds
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

    // 启动动画
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

export default Scenegraph;
