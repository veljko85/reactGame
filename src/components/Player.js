import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

//PLAYER MESH LOAD
let playerMesh = (scene, camera) => {
  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    // "https://raw.githubusercontent.com/veljko85/GucciSylvieBag/gh-pages/meshes/",
    // "torba7.glb",
    `${process.env.PUBLIC_URL}/assets/meshes/`,
    "viperman.glb",
    scene
  ).then((result) => {
    let viperman = result.meshes[0];
    viperman.parent = camera;
    // viperman.parent = fakeMesh;
    viperman.position.y = -1.8;
    scene.animationGroups
      .find((a) => a.name === "finish")
      .setWeightForAllAnimatables(0);
    elipsoidMesh(scene);
    // for (let i = 0; i < result.meshes.length; i++) {
    //     result.meshes[i].isVisible = false
    // }
  });
};
//CREATE ELIPSOID AROUND MESH
let elipsoidMesh = (scene) => {
  let fakeMeshEllipse = new BABYLON.MeshBuilder.CreateBox(
    "fakeMeshEllipse",
    { width: 0.2, height: 0.2, depth: 0.2 },
    scene
  );
  fakeMeshEllipse.position = new BABYLON.Vector3(0, -0.8, 0);
  // fakeMeshEllipse.parent = fakeMesh;
  fakeMeshEllipse.isVisible = false;

  let a = 0.5;
  let b = 1;
  let points = [];
  for (let theta = -Math.PI / 2; theta < Math.PI / 2; theta += Math.PI / 36) {
    points.push(
      new BABYLON.Vector3(0, b * Math.sin(theta), a * Math.cos(theta))
    );
  }

  let ellipse = [];
  ellipse[0] = BABYLON.MeshBuilder.CreateLines("e", { points: points }, scene);
  ellipse[0].parent = fakeMeshEllipse;
  ellipse[0].rotation.y = (5 * Math.PI) / 16;
  ellipse[0].checkCollisions = true;
  for (let i = 1; i < 35; i++) {
    ellipse[i] = ellipse[0].clone("el" + i);
    ellipse[i].parent = fakeMeshEllipse;
    ellipse[i].rotation.y = (5 * Math.PI) / 16 + (i * Math.PI) / 16;
    ellipse[i].checkCollisions = true;
  }
  ellipse.forEach((elm) => {
    elm.isVisible = false;
  });
};

//PLAYER OBJECT
function PlayerObj(speed, lifes) {
  this.speed = speed;
  this.lifes = lifes;
  // console.log(this);
}

export { playerMesh, PlayerObj };
