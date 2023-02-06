import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
import { GLTFLoader } from "GLTFLoader";
import { USDZLoader } from "USDZLoader";

const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  imageTargetSrc: "../assets/targets.mind",
});

const { renderer, scene, camera } = mindarThree;

const anchor = mindarThree.addAnchor(0);

const arlight = new THREE.AmbientLight();
anchor.group.add(arlight);

const dirliht = new THREE.DirectionalLight();
anchor.group.add(dirliht);
dirliht.position.set(2, 2, 2);

// const geometry = new THREE.PlaneGeometry(1, 0.55);
// const material = new THREE.MeshBasicMaterial( {color: 0x00ffff, transparent: true, opacity: 0.5} );
// const plane = new THREE.Mesh( geometry, material );
// anchor.group.add(plane);

      const loader1 = new GLTFLoader();

let model1;
loader1.load("../assets/box.glb", function (gltf) {
  model1 = gltf.scene;
  anchor.group.add(model1);
  model1.position.set(-0.5, 0.2, -0.5);
  model1.scale.set(0.4, 0.4, 0.4);
  model1.rotation.x = 0.5 * Math.PI;
});

// const loader2 = new GLTFLoader();

// let model2;
// loader2.load("../assets/Footman.glb", function (gltf) {
//   model2 = gltf.scene;
//   anchor.group.add(model2);
//   model2.position.set(0, 0, 0);
//   model2.scale.set(0.4, 0.4, 0.4);
//   model2.rotation.x = 0.5 * Math.PI;
// });

// const loader3 = new USDZLoader();

// let model3;
// loader3.load("../assets/scene.usdz", function (gltf) {
//   model3 = gltf.scene;
//   anchor.group.add(model3);
// //   model3.position.set(0, 0, 0);
// //   model3.scale.set(0.4, 0.4, 0.4);
// //   model3.rotation.x = 0.5 * Math.PI;
// });

const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
  start();
});

stopButton.addEventListener("click", () => {
  mindarThree.stop();
  mindarThree.renderer.setAnimationLoop(null);
});
