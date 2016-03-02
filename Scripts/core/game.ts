/// <reference path="_reference.ts"/>

// MAIN GAME FILE
// Jake Parnell
// Comp392 - MidTerm
// Last Modified by: Jake Parnell
// Date Last Modified Mar 2nd 2016

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;

    var pointLight: PointLight;
    var ambientLight: AmbientLight;
    
    //Ground
    var ground: Mesh;
    var groundGeometry: PlaneGeometry;
    var groundMaterial: LambertMaterial;

    var cube1: Mesh;
    var cube2: Mesh;
    var cube3: Mesh;
    var cube4: Mesh;
    var cube5: Mesh;

    var cubeGeometry: CubeGeometry;
    var cubeMaterial1: LambertMaterial;
    var cubeMaterial2: LambertMaterial;
    var cubeMaterial3: LambertMaterial;
    var cubeMaterial4: LambertMaterial;
    var cubeMaterial5: LambertMaterial;

    var axes: AxisHelper;

    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        
        setupRenderer(); // setup the default renderer
	
        setupCamera(); // setup the camera


        /* ENTER CODE HERE */
        //Code
        
        // add an axis helper to the scene
        axes = new AxisHelper(10);
        scene.add(axes);
        console.log("Added Axis Helper to scene...");
        
        //Add PointLight to Scene
        pointLight = new PointLight(0xffffff);
        pointLight.position.set(-4, 6, -4);
        scene.add(pointLight);
        pointLight.castShadow = true;
        pointLight.intensity = 2;
        pointLight.distance = 200;
        pointLight.shadowCameraNear = 1;
        pointLight.shadowMapHeight = 2048;
        pointLight.shadowMapWidth = 2048;
        console.log("Added pointLight to scene");
        
        
        //Add Ground to Scene
        groundGeometry = new PlaneGeometry(16, 16);
        groundMaterial = new LambertMaterial({ color: 0xf4a460 });
        ground = new Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -0.5 * Math.PI;
        ground.receiveShadow = true;
        scene.add(ground);
        console.log("Added ground object to scene");
        
        
        //Add Base Cube
        cubeGeometry = new CubeGeometry(4, 2, 4);
        cubeMaterial1 = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube1 = new Mesh(cubeGeometry, cubeMaterial1);
        cube1.position.setY(1);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        scene.add(cube1);
        console.log("Added base object to scene");
        
        //Cube #2
        cubeGeometry = new CubeGeometry(3, 2, 3);
        cubeMaterial2 = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube2 = new Mesh(cubeGeometry, cubeMaterial2);
        cube2.position.setY(3);
        cube2.receiveShadow = true;
        cube2.castShadow = true;
        scene.add(cube2);
        console.log("Added 2nd object to scene");
        
        //Cube #3
        cubeGeometry = new CubeGeometry(2, 2, 2);
        cubeMaterial3 = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube3 = new Mesh(cubeGeometry, cubeMaterial3);
        cube3.position.setY(5);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        scene.add(cube3);
        console.log("Added 2nd object to scene");
        
        //Cube #4
        cubeGeometry = new CubeGeometry(1, 1, 1);
        cubeMaterial4 = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube4 = new Mesh(cubeGeometry, cubeMaterial4);
        cube4.position.setY(6.5);
        cube4.receiveShadow = true;
        cube4.castShadow = true;
        scene.add(cube4);
        console.log("Added 2nd object to scene");
        
        //Cube #5
        cubeGeometry = new CubeGeometry(0.5, 0.5, 0.5);
        cubeMaterial5 = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube5 = new Mesh(cubeGeometry, cubeMaterial5);
        cube5.position.setY(7.3);
        cube5.receiveShadow = true;
        cube5.castShadow = true;
        scene.add(cube5);
        console.log("Added 2nd object to scene");
        
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0x090909);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        
 
        // add controls
        gui = new GUI();
        control = new Control(0.01, 0.01, 0.01, 0.01, 0.01);
        addControl(control);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	

    }

    function addControl(controlObject: Control): void {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject, 'rotation1', -0.5, 0.5);
        gui.add(controlObject, 'rotation2', -0.5, 0.5);
        gui.add(controlObject, 'rotation3', -0.5, 0.5);
        gui.add(controlObject, 'rotation4', -0.5, 0.5);
        gui.add(controlObject, 'rotation5', -0.5, 0.5);
    }

    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    // Setup main game loop
    function gameLoop(): void {
        stats.update();

        cube1.rotation.y += control.rotation1;
        cube2.rotation.y += control.rotation2;
        cube3.rotation.y += control.rotation3;
        cube4.rotation.y += control.rotation4;
        cube5.rotation.y += control.rotation5;

        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 15.3;
        camera.position.y = 18.5;
        camera.position.z = -28.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

