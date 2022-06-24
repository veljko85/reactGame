import React from "react";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import "./game.css";

import { playerMesh, PlayerObj } from "../Player";

const onSceneReady = (scene) => {
  //camera
  // let camera = new BABYLON.ArcRotateCamera(
  //   "Camera",
  //   0,
  //   0,
  //   0,
  //   new BABYLON.Vector3(0, 0, 0),
  //   scene
  // );
  // camera.setPosition(new BABYLON.Vector3(0, 0, 5)); /*0,0,13*/
  //transperent canvas
  // scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  //disable zoom
  // camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius = 16;

  var camera = new BABYLON.UniversalCamera(
    "MyCamera",
    new BABYLON.Vector3(0, 1, -30),
    scene
  );
  camera.minZ = 0.0001;
  camera.attachControl(canvas, true);
  camera.speed = 1;
  camera.angularSpeed = 1;
  camera.angle = Math.PI / 2;
  camera.direction = new BABYLON.Vector3(
    Math.cos(camera.angle),
    0,
    Math.sin(camera.angle)
  );

  // Add viewCamera that gives first person shooter view
  var viewCamera = new BABYLON.UniversalCamera(
    "viewCamera",
    new BABYLON.Vector3(0, 2, -5),
    scene
  );
  viewCamera.parent = camera;
  viewCamera.setTarget(new BABYLON.Vector3(0, -0.0001, 1));

  //Activate both cameras
  scene.activeCameras.push(camera);
  scene.activeCameras.push(viewCamera);

  // Add two viewports
  camera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
  viewCamera.viewport = new BABYLON.Viewport(0, 0, 1.0, 1.0);

  //         var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0,-3,7), scene);
  //             camera.setPosition(new BABYLON.Vector3(0, 0, 0));
  //             // camera.setPosition(new BABYLON.Vector3(-0.3, 5, -2.2));
  //             camera.attachControl(canvas, true);
  // // // camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius = 8;
  // camera.lowerRadiusLimit = 4;
  // camera.upperRadiusLimit = 8;

  scene.beforeRender = function() {
    camera.rotation.x = 0;
  };

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
  //light
  let light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 1),
    scene
  );
  light.intensity = 0.8;

  // var sphere = BABYLON.MeshBuilder.CreateSphere(
  //   "sphere",
  //   { diameter: 2, segments: 32 },
  //   scene
  // );

  playerMesh(scene, camera);
  let playerObj = new PlayerObj(1, 2);

  //Ground
  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 10, height: 20 },
    scene
  );

  console.log(playerObj);

  //END OF SCENE
};

export default () => (
  <div>
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      className="my-canvas"
    />
  </div>
);
